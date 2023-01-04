import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewPost,
  deletePost,
  dislikeButtonPressed,
  likeButtonPressed,
  loadPosts,
  loadUserPosts
} from './postSlice';
import { fetchUser, fetchUsers, followUser, unfollowUser } from './userSlice';
import { v4 as uuid } from 'uuid';
import { formatDate } from '../../backend/utils/authUtils';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  const { users } = useSelector((store) => store.auth);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
      dispatch(loadPosts());
      dispatch(fetchUser());
      dispatch(loadUserPosts());
    }
  }, [dispatch, status]);

  const addPostHandler = () => {
    dispatch(addNewPost(post));
    setPost({ ...post, content: '', _id: uuid() });
  };

  const followHandler = (user) => {
    dispatch(followUser(user));
  };

  const unfollowHandler = (user) => {
    dispatch(unfollowUser(user));
  };

  const deletePostHandler = (post) => {
    console.log(post);
    dispatch(deletePost(post));
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
          <button>
            <Link to="/login"> Login</Link>
          </button>
          <div>
            <button type="submit" className="tweet-btn mt1 mb1 btn">
              Tweet
            </button>
          </div>
        </form>
        {posts.map((post) => (
          <div className="mb1 wrapper hover-bg" key={post._id} onClick={() => getSinglePost(post)}>
            <div className="flex-r space-bw align-items">
              <div>@{post.username}</div>
            </div>
            <p>{post.content}</p>
            <div className="flex-r align-items mt1">
              {post.likes.likedBy.find((user) => user._id === currentUser._id) ? (
                <span
                  className="material-icons like-icon btn"
                  onClick={() => dispatch(dislikeButtonPressed(post))}>
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined btn"
                  onClick={() => dispatch(likeButtonPressed(post))}>
                  favorite
                </span>
              )}
              <span className="likes">{post.likes.likeCount}</span>
              {post.username === currentUser.username && (
                <span className="material-icons" onClick={() => deletePostHandler(post)}>
                  delete
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
      <section className="wrapper ml1">
        <h3>Suggestions</h3>
        {users.map(
          (user) =>
            user.username !== currentUser.username && (
              <div className="flex-r users mt-half" key={user._id}>
                <span>@{user.username}</span>
                {user.followers.includes(currentUser) ? (
                  <button className="btn follow-btn" onClick={() => unfollowHandler(user)}>
                    Following
                  </button>
                ) : (
                  <button className="btn follow-btn" onClick={() => followHandler(user)}>
                    Follow
                  </button>
                )}
              </div>
            )
        )}
      </section>
    </main>
  );
}
