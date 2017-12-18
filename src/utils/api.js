import uuidv4 from 'uuid/v4';
const apiUrl = 'https://reactnd-readable-api.herokuapp.com';

const getUrl = path => {
  return `${apiUrl}/${path}`;
};
const apiUrls = {
  getCategories: getUrl('categories/'),
  posts: getUrl('posts/'),
  getPostById: postId => getUrl(`posts/${postId}`),
  getPostsByCategory: category => getUrl(`${category}/posts`),
  getCommentsByPost: postId => getUrl(`posts/${postId}/comments`)
};

const {
  getCategories,
  getPostById,
  posts,
  getPostsByCategory,
  getCommentsByPost
} = apiUrls;

const authorizationToken = 'GiancarlosReadablev1';
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
  const url = category === 'all' ? posts : getPostsByCategory(category);
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
export function createPost(title, body, author, category) {
  const data = {
    id: uuidv4(),
    title,
    body,
    author,
    category,
    timestamp: Date.now()
  };

  const headers = myInit.headers;
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const init = {
    ...myInit,
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  };

  return fetch(posts, init)
    .then(res => res.json())
    .then(res => {
      console.log('Created post: ', res);
      return res;
    });
}
