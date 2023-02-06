import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../compoments/sidebar';
import { dislikeButtonPressed, likeButtonPressed } from '../../../features/posts/postSlice';
import { bookmarkPost, deleteBookmark } from '../../../features/posts/userSlice';

const Bookmarks = () => {
  const { bookmarks, currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSinglePost = (post) => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div className="flex-r">
      <Sidebar />
      <div className="flex-c">
        {bookmarks.length > 0 ? (
          bookmarks.map((post) => (
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
          ))
        ) : (
          <div className="highlighted">Your Bookmarks will be shown here.</div>
        )}
      </div>
    </div>
  );
};

export { Bookmarks };
