function fetchImages(value, page) {
  const KEY = "24190163-4fef3af5a8c9fb39e43dd5d2d";
  const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("Oops, something went wrong"));
  });
}

const api = { fetchImages };
export default api;
