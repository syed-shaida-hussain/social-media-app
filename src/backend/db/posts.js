import { v4 as uuid } from 'uuid';
import { formatDate } from '../../backend/utils/authUtils';

export const posts = [
  {
    _id: uuid(),
    content:
      'Hey there , i am a front-end web developer aspiring to become a fullstack web developer . I am currently familiar with HTML5 , CSS3 , vanilla js ,  react , redux . I have already made an Ecommerce app , a video library app and a note taking app on the frontend and i am currently working on the backend side as well.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalak',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'Welcome to the redux world',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalika',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'This is the world of React Redux',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalika',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'Hello , world!',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalak',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'I am a guest',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'guest',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'I am a front-end web developer',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalak',
    createdAt: formatDate(),
    updatedAt: formatDate()
  },
  {
    _id: uuid(),
    content: 'I can do backend as well',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: 'adarshbalak',
    createdAt: formatDate(),
    updatedAt: formatDate()
  }
];
