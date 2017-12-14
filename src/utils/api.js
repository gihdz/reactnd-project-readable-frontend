const apiUrl = 'https://reactnd-readable-api.herokuapp.com';

const getUrl = path => {
  return `${apiUrl}/${path}`;
};
const apiUrls = {
  getCategories: getUrl('categories/'),
  getPosts: getUrl('posts/'),
  getPostsByCategory: category => getUrl(`${category}/posts`)
};

const { getCategories, getPosts, getPostsByCategory } = apiUrls;

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
  return fetch(getCategories, myInit)
    .then(res => res.json())
    .then(res => {
      console.log('Categories: ', res.categories);
      return res.categories;
    });
}
export function fetchPosts(category) {
  const url = category === 'all' ? getPosts : getPostsByCategory(category);
  return fetch(url, myInit)
    .then(res => res.json())
    .then(res => {
      console.log('Posts: ', res);
      return res;
    });
}
