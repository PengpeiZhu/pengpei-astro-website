"use client";

import { useEffect, useRef, useState } from "react";
import photos from "../lib/photography.json";
import { getPhotoRotation, groupGalleryPhotos } from "../lib/photo-rotation";
import { translator } from "../lib/site-labels";
import { formatDate, type Locale } from "../lib/locales";
import { assetPath } from "../lib/site-path";

type Photo = (typeof photos)[number];

function PhotoCard({ photo, onOpen, locale }: { photo: Photo; onOpen: () => void; locale: Locale }) {
  const t = translator(locale);
  return (
    <figure className="photo-card">
      <button type="button" onClick={onOpen} aria-label={`${t("Enlarge")} ${t(photo.caption)}`}>
        <img
          src={assetPath(photo.src)}
          alt={t(photo.alt)}
          width={photo.width}
          height={photo.height}
          loading="lazy"
        />
        <span className="photo-expand" aria-hidden="true">⤢</span>
      </button>
      <figcaption>
        {t(photo.caption)}
        {photo.date && <time dateTime={photo.date}>{formatDate(locale, photo.date, photo.displayDate, { month: "long", year: "numeric" })}</time>}
      </figcaption>
    </figure>
  );
}

export function Astrophotos({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const [period, setPeriod] = useState(0);
  const [page, setPage] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const { featured, more } = groupGalleryPhotos(photos, period);
  const expandedPhoto = photos[expandedIndex];
  const currentPage = more[page];

  useEffect(() => {
    let timer: number | undefined;

    function syncRotation() {
      window.clearTimeout(timer);
      const { period, delay } = getPhotoRotation(Date.now());
      setPeriod(period);
      timer = window.setTimeout(syncRotation, delay);
    }

    syncRotation();
    document.addEventListener("visibilitychange", syncRotation);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", syncRotation);
    };
  }, []);

  function openPhoto(photo: Photo) {
    setExpandedIndex(photos.indexOf(photo));
    dialog.current?.showModal();
  }

  function changeExpandedPhoto(direction: number) {
    setExpandedIndex(index => (index + direction + photos.length) % photos.length);
  }

  function changePage(direction: number) {
    setPage(index => (index + direction + more.length) % more.length);
  }

  return (
    <>
      <div className="photo-gallery">
        <div>
          <h3 className="photo-gallery-heading">{t("Featured photos")}</h3>
          <div className="photo-featured">
            {featured.map(photo => (
              <PhotoCard key={photo.src} photo={photo} locale={locale} onOpen={() => openPhoto(photo)} />
            ))}
          </div>
        </div>
        {currentPage && (
          <section className="photo-browser" aria-labelledby="photo-browser-title">
            <h3 id="photo-browser-title" className="photo-gallery-heading">{t("More photos")}</h3>
            <div className="photo-pagination" role="group" aria-label={t("Gallery pages")}>
              <button
                type="button"
                className="small-button"
                aria-label={t("Previous gallery page")}
                aria-controls="photo-browser-page"
                disabled={more.length < 2}
                onClick={() => changePage(-1)}
              >
                <span aria-hidden="true">←</span> {t("Previous")}
              </button>
              <span role="status">{page + 1} {t("of")} {more.length}</span>
              <button
                type="button"
                className="small-button"
                aria-label={t("Next gallery page")}
                aria-controls="photo-browser-page"
                disabled={more.length < 2}
                onClick={() => changePage(1)}
              >
                {t("Next")} <span aria-hidden="true">→</span>
              </button>
            </div>
            <div id="photo-browser-page">
              <PhotoCard photo={currentPage} locale={locale} onOpen={() => openPhoto(currentPage)} />
            </div>
          </section>
        )}
      </div>
      <p className="photo-credit">{t("Photographs by Pengpei Zhu")} <span lang="zh">朱芃佩</span></p>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-labelledby="photo-title"
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            changeExpandedPhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="dialog-header">
          <h2 id="photo-title">{t(expandedPhoto.caption)}</h2>
          <button type="button" autoFocus className="small-button" onClick={() => dialog.current?.close()}>
            {t("Close ×")}
          </button>
        </div>
        <img
          src={assetPath(expandedPhoto.src)}
          alt={t(expandedPhoto.alt)}
          width={expandedPhoto.width}
          height={expandedPhoto.height}
          loading="lazy"
        />
        <div className="photo-dialog-footer">
          <button type="button" className="small-button" onClick={() => changeExpandedPhoto(-1)} aria-label={t("Previous photograph")}>
            ← {t("Previous")}
          </button>
          <p role="status">
            {expandedIndex + 1} / {photos.length}
            {expandedPhoto.date && <> · <time dateTime={expandedPhoto.date}>{formatDate(locale, expandedPhoto.date, expandedPhoto.displayDate, { month: "long", year: "numeric" })}</time></>}
          </p>
          <button type="button" className="small-button" onClick={() => changeExpandedPhoto(1)} aria-label={t("Next photograph")}>
            {t("Next")} →
          </button>
        </div>
      </dialog>
    </>
  );
}
