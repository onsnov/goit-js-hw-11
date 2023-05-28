import GetPicturesService from './api_fetch.js';
import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';



const refs = {
  searchForm: document.querySelector('.search-form'),
  imageWrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const getPicturesService = new GetPicturesService();
let page = 1;
let searchValue = '';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
   e.preventDefault();
  const form = e.currentTarget;
  const form_value = form.elements.searchQuery.value.trim();

  if (form_value ==="" ) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.failure('Щось введи для пошуку');
    return;
  } else { getPicturesService.query = form_value };
  clearPicturesList();
  refs.loadMoreBtn.classList.add('is-hidden');
  getPicturesService.getPictures(form_value)
  
    .then(data => {
      console.log(data)
      
      if (data.hits.length ===0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
       return data.hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    })
    .then(updatePicturesList)
    .catch(onEror)
  
  //     .then(data => {
  //   if (data.hits.length === 0) {
  //     refs.loadMoreBtn.classList.add('is-hidden');
  //     Notify.info(
  //       'Sorry, there are no images matching your search query. Please try again.'
  //     );
  //   } else {
  //     Notify.success(`Hooray! We found ${data.totalHits} images.`);
  //   }

  //   refs.loadMoreBtn.classList.remove('is-hidden');
  //   return data.hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
  // })

  // .then(updatePicturesList)
  // .catch(onEror);
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
   <a class='gallery__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" width=280px 
    height=200px;
 loading="lazy" /></a>
  <div class="info">
     <p class="info-item">
       <b>Likes: ${likes}</b>
     </p>
     <p class="info-item">
       <b>Views: ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments: ${comments}</b>
     </p>
     <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
   </div>
 `;
  
}

function updatePicturesList(markup) {

  refs.imageWrapper.insertAdjacentHTML('beforeend', markup);
  
   console.log(markup);
}

function onLoadMore() {
  page += 1;
  lightbox.refresh();
  getPicturesService
    .getPictures(searchValue, page)
    .then(data => {
      // console.log(per_page)
      if (data.hits.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } 
      return data.hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    })

    .then(updatePicturesList)

    .catch(onEror);
}

function clearPicturesList() {
  refs.imageWrapper.innerHTML = '';
}

function onEror(err) {
  console.log(err);
}
