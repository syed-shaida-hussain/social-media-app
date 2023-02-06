import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewPost,
  loadPosts,
  loadUserPosts,
  likeButtonPressed,
  dislikeButtonPressed
} from './postSlice';
import { fetchUsers, bookmarkPost, deleteBookmark } from './userSlice';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../../backend/utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../common/compoments/users';

export default function Posts() {
  const username = localStorage.getItem('USERNAME');
  const [post, setPost] = useState({
    _id: uuid(),
    content: '',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: []
    },
    username: username,
    createdAt: formatDate(),
    updatedAt: formatDate()
  });

  const { posts, status } = useSelector((store) => store.timeline);
  const { currentUser, bookmarks } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
      dispatch(loadPosts());
      dispatch(loadUserPosts());
    }
  }, [dispatch, status]);

  const addPostHandler = () => {
    dispatch(addNewPost(post));
    setPost({ ...post, content: '', _id: uuid(), img: '' });
  };

  const getSinglePost = (post) => {
    navigate(`/posts/${post._id}`);
  };

  return status === 'loading' ? (
    <p> loading... </p>
  ) : (
    <main className=" mt1 flex-r">
      <section className="posts">
        <form
          className="input-card mt1"
          onSubmit={(e) => {
            e.preventDefault();
            addPostHandler();
          }}>
          <textarea
            required
            className="tweetarea"
            placeholder="What's happening?"
            onChange={(e) => {
              setPost({ ...post, content: e.target.value });
            }}
            value={post.content}
          />
          <div>
            <button type="submit" className="tweet-btn mt1 mb1 btn">
              Tweet
            </button>
          </div>
        </form>
        {posts.map((post) => (
          <div className="mb1 wrapper hover-bg" key={post._id}>
            <div onClick={() => getSinglePost(post)}>
              <div className="flex-r space-bw align-items">
                <div>@{post.username}</div>
              </div>
              <p>{post.content}</p>
            </div>
            <div className="flex-r align-items mt1">
              {post.likes.likedBy.find((user) => user._id === currentUser._id) ? (
                <span
                  className="material-icons like-icon btn"
                  onClick={() => dispatch(dislikeButtonPressed({ post: post, user: currentUser }))}>
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined btn"
                  onClick={() => dispatch(likeButtonPressed({ post: post, user: currentUser }))}>
                  favorite
                </span>
              )}
              <span className="likes">{post.likes.likeCount}</span>
              {bookmarks?.find((bookmarkedPost) => bookmarkedPost._id === post._id) ? (
                <span
                  className="material-icons like-icon btn"
                  onClick={() => dispatch(deleteBookmark(post))}>
                  bookmark
                </span>
              ) : (
                <span
                  className="material-symbols-outlined btn"
                  onClick={() => dispatch(bookmarkPost(post))}>
                  bookmark
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className="wrapper ml1">
        <h3>Suggestions</h3>
        <Users />
      </section>
    </main>
  );
}
