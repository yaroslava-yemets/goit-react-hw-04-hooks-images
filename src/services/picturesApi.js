export default function fetchPicture (query, page) {
    return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=22334944-1a4c27752b28577a34c92f730&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        return Promise.reject(new Error(`There are no pictures with ${query}`));
    });
}