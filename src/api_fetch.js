const URL = "https://pixabay.com/api/";
const API_KEY = "36709993-04630922d7f8549c2d7c20dc8";
import axios from 'axios';

// function getPictures(query,page=1) {
//   return fetch(
//     `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   ).then(res => res.json());
   
// }


function getPictures(query, page = 1) {
  return axios.get(
    `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  )
    .then(({ data }) => {
      // console.log(data)
      return data.hits;
    })
}

 //getPictures('cat').then(res => console.log(res.totalHits ));
export default { getPictures };

