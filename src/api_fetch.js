const URL = "https://pixabay.com/api/";
const API_KEY = "36709993-04630922d7f8549c2d7c20dc8";
import axios from 'axios';

export default class getPicturesService {
  constructor() {
    this.page = 1;
    this.query = "";
  }


  async getPictures() {

    const  data =await axios.get(
          `${URL}?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        );
    console.log(data)
    return data;
   
  }

}

// function getPictures(query,page=1) {
//   return fetch(
//     `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   ).then(res => res.json());
   
// }


 

// export default { getPictures };


//   return axios
//     .get(
//     `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   )
//     .then(({ data }) => {
//         console.log(data)
      
//       return data;
//     })