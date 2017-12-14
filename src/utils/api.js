const apiUrl = 'https://reactnd-readable-api.herokuapp.com';

const getUrl = path => {
  return `${apiUrl}/${path}`;
};
const apiUrls = {
  getCategories: getUrl('categories/'),
  getPosts: getUrl('posts/'),
  getPostById: postId => getUrl(`posts/${postId}`),
  getPostsByCategory: category => getUrl(`${category}/posts`),
  getCommentsByPost: postId => getUrl(`posts/${postId}/comments`)
};

const {
  getCategories,
  getPostById,
  getPosts,
  getPostsByCategory,
  getCommentsByPost
} = apiUrls;

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
export function fetchCommentsOfPost(postId) {
  return fetch(getCommentsByPost(postId), myInit)
    .then(res => res.json())
    .then(res => {
      console.log(`Comments of post ${postId}:`, res);
      return res;
    });
}
export function fetchPostById(postId) {
  return fetch(getPostById(postId), myInit)
    .then(res => res.json())
    .then(res => {
      console.log('Post: ', res);
      return res;
    });
}
