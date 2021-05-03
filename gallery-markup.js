import gallery from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const gallaryMarkup = createGalleryMarkup(gallery);

const modalWindow = document.querySelector('.js-lightbox');
const closeModalButton = document.querySelector('[data-action="close-lightbox"]');
const modalImage = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');


galleryList.insertAdjacentHTML('beforeend', gallaryMarkup);

galleryList.addEventListener('click', onGalleryListClick);
closeModalButton.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onOverlayClick);

// window.addEventListener('keydown', onLeftArrowPress);
// window.addEventListener('keydown', onRightArrowPress);

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
  window.addEventListener('keydown', onEscKeyPress);
  modalWindow.classList.add('is-open');

  modalImage.src = e.target.dataset.source;
  modalImage.alt = e.target.alt;  
}

function onCloseModal(e) {
  window.removeEventListener('keydown', onEscKeyPress);
  modalWindow.classList.remove('is-open');
  modalImage.removeAttribute('src');
  modalImage.removeAttribute('alt');
}

function onOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }  
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
// ------------------------------------------------------
// function onLeftArrowPress(e) {
//   if (e.code === 'ArrowLeft') {
//     console.log(e);
//   }
// }

// function onRightArrowPress(e) {
//   if (e.code === 'ArrowRight') {
//     const a = gallery.map(item => item.preview);


//     console.log(a);
//   }
// }
