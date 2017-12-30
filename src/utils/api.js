import uuidv4 from 'uuid/v4';
const apiUrl = 'https://reactnd-readable-api.herokuapp.com';
// const apiUrl = 'http://localhost:3001';

const getUrl = path => {
  return `${apiUrl}/${path}`;
};
const apiUrls = {
  getCategories: getUrl('categories/'),
  posts: getUrl('posts/'),
  comments: getUrl('comments/'),
  voteComment: commentId => getUrl(`comments/${commentId}`),
  votePost: postId => getUrl(`posts/${postId}`),
  getPostById: postId => getUrl(`posts/${postId}`),
  getPostsByCategory: category => getUrl(`${category}/posts`),
  getCommentsByPost: postId => getUrl(`posts/${postId}/comments`)
};

const {
  getCategories,
  getPostById,
  posts,
  comments,
  getPostsByCategory,
  getCommentsByPost,
  voteComment,
  votePost
} = apiUrls;

const authorizationToken = 'GiancarlosReadablev1';
const myHeaders = new Headers({
  Authorization: authorizationToken
});
const myInit = {
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
    voteScore: 1,
    deleted: false,
    timestamp: Date.now()
  };

  const headers = new Headers(myInit.headers);
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
export function createComment(postId, author, body) {
  const data = {
    id: uuidv4(),
    parentId: postId,
    body,
    author,
    voteScore: 1,
    deleted: false,
    parentDeleted: false,
    timestamp: Date.now()
  };

  const headers = new Headers(myInit.headers);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const init = {
    ...myInit,
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  };

  return fetch(comments, init)
    .then(res => res.json())
    .then(res => {
      console.log('Created comment: ', res);
      return res;
    });
}
export function voteForComment(commentId, vote) {
  const data = {
    option: vote
  };

  const headers = new Headers(myInit.headers);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const init = {
    ...myInit,
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetch(voteComment(commentId), init)
    .then(res => res.json())
    .then(res => {
      console.log('Comment vote result: ', res);
      return res;
    });
}
export function voteForPost(postId, vote) {
  const data = {
    option: vote
  };

  const headers = new Headers(myInit.headers);
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const init = {
    ...myInit,
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetch(votePost(postId), init)
    .then(res => res.json())
    .then(res => {
      console.log('Post vote result: ', res);
      return res;
    });
}
