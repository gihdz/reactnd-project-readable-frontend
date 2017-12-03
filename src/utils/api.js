const apiUrl = 'https://reactnd-readable-api.herokuapp.com/';
const categoriesPath = 'categories';
const authorizationToken = 'GiancarlosReadable';
var myHeaders = new Headers({
  Authorization: authorizationToken
});
var myInit = {
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};
export function fetchCategories() {
  return fetch(apiUrl + categoriesPath, myInit)
    .then(res => res.json())
    .then(res => {
      console.log('Categories: ', res.categories);
      return res.categories;
    });
}
