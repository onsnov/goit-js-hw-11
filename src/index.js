import API from "./api_fetch";
import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';    
import axios from 'axios';


const refs = {
  searchForm: document.querySelector('.search-form'),
  imageWrapper: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
let searchValue = "";

refs.searchForm.addEventListener("submit", onSubmit)
refs.loadMoreBtn.addEventListener("click", onLoadMore)

function onSubmit(e)
{
    e.preventDefault();
     const form = e.currentTarget;
     const form_value = form.elements.searchQuery.value.trim();
    // console.log (form_value)
  if (form_value === "  ") {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.failure('Щось введи для пошуку');
    
  }
  else
    searchValue = form_value;
   clearPicturesList();
         API.getPictures(form_value)
           .then(({ hits,totalHits }) => {
             console.log(hits);
             if (hits.length === 0) {
               refs.loadMoreBtn.classList.add('is-hidden');
               Notify.info(
                 'Sorry, there are no images matching your search query. Please try again.'
               );
             } else {
               Notify.success(
                 `Hooray! We found ${totalHits} images.`
               );
             }
             
           refs.loadMoreBtn.classList.remove('is-hidden');
           return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
           
         }) 
                    
        .then(updatePicturesList)
         .catch(onEror);
   }

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
downloads }) {
  return `<div class="photo-card">
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
</div>`;
}

function updatePicturesList(markup) { 
    refs.imageWrapper.insertAdjacentHTML("beforeend", markup);
}

function onLoadMore() {
  page += 1;
  API.getPictures(searchValue, page)
    .then(({ hits}) => {
      if (hits.length === 0)
        return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      return hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    })
    // .then(({ hits, totalHits }) => {
    //   if (hits.length >= totalHits)
    //     Notify.info("We're sorry, but you've reached the end of search results.")
    // });
  
    .then(updatePicturesList)
    .catch(onEror);
}   

function clearPicturesList() { 
refs.imageWrapper.innerHTML=""
}

function onEror(err) { 
    console.log(err);
}

