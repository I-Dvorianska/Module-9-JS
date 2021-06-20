import galleryItems from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');
const lboxContainerEl = document.querySelector('.lightbox');
const overlayEl = document.querySelector('.lightbox__overlay');
const lboxContentEl = document.querySelector('.lightbox__content');
const lboxImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('.lightbox__button');

const imagesMarkup = createGallery(galleryItems);
galleryListEl.addEventListener('click', onImageClick);
closeModalBtn.addEventListener('click', closeModalWithClick);
overlayEl.addEventListener('click', onOverlayClick);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
      <li class="gallery__item">
          <a
            class="gallery__link"
            href=${original}
          >
          <img
              class="gallery__image"
              src=${preview}
              data-source=${original}
              alt='${description}' />
          </a>
          </li>`;
    })
    .join('');
}
galleryListEl.insertAdjacentHTML('beforeend', imagesMarkup);

function imageInfoWithModalState(src, alt) {
  lboxImage.src = src;
  lboxImage.alt = alt;
}

function onImageClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  const getOriginalUrl = e.target.dataset.source;

  lboxContainerEl.classList.add('is-open');
  imageInfoWithModalState(getOriginalUrl, e.target.getAttribute('alt'));
  window.addEventListener('keydown', onEscKeyPress);
}

function closeModalWithClick(e) {
  lboxContainerEl.classList.remove('is-open');

  imageInfoWithModalState('', '');
}

function onOverlayClick(e) {
  closeModalWithClick();
}

function onEscKeyPress(e) {
  closeModalWithClick();
}
