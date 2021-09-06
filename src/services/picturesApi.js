const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22334944-1a4c27752b28577a34c92f730';

export default function fetchPicture (query, page) {
    return fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        return Promise.reject(new Error(`There are no pictures with ${query}`));
    });
}