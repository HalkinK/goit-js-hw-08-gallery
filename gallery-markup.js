import gallery from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const gallaryMarkup = createGalleryMarkup(gallery);

const modalWindow = document.querySelector('.js-lightbox');
const closeModalButton = document.querySelector('[data-action="close-lightbox"]');
const modalImage = document.querySelector('.lightbox__image');

galleryList.insertAdjacentHTML('beforeend', gallaryMarkup);

galleryList.addEventListener('click', onGalleryListClick);
closeModalButton.addEventListener('click', onCloseModalBtn);

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>
   `;
  })
    .join('');
}

function onGalleryListClick(e) {  
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();

  // console.log(e.target.dataset.source);

  modalWindow.classList.add('is-open');

  modalImage.src = e.target.dataset.source;
  modalImage.alt = e.target.alt;

  
}

function onCloseModalBtn(e) {
  modalWindow.classList.remove('is-open');
  modalImage.src = '';
}

