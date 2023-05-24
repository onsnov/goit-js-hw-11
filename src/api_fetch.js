const URL = "https://pixabay.com/api/";
const API_KEY = "36709993-04630922d7f8549c2d7c20dc8";

function getPictures(query) {
  return fetch(`${URL}?key=${API_KEY}&q=${query}`);
}
getPictures("cat");

    

// export default { getPictures };

