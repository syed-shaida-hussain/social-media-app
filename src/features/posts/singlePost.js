import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../common/compoments/sidebar';
import { dislikeButtonPressed, likeButtonPressed } from './postSlice';
import { bookmarkPost, deleteBookmark } from './userSlice';

export default function SinglePost() {
  const { currentUser, bookmarks } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.timeline);
  const { postId } = useParams();
  const singlePost = posts.find((post) => post._id === postId);
  const dispatch = useDispatch();

  return (
    <div className="flex-r">
      <Sidebar />
      <main className=" mt1 flex-r">
        <section className="posts">
          <div className="mb1 wrapper hover-bg" key={singlePost._id}>
            <div className="flex-r space-bw align-items">
              <div>@{singlePost.username}</div>
            </div>
            <p>{singlePost.content}</p>
            <div className="flex-r align-items mt1">
              {singlePost.likes.likedBy.find((user) => user._id === currentUser._id) ? (
                <span
                  className="material-icons like-icon btn"
                  onClick={() =>
                    dispatch(dislikeButtonPressed({ post: singlePost, user: currentUser }))
                  }>
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined btn"
                  onClick={() =>
                    dispatch(likeButtonPressed({ post: singlePost, user: currentUser }))
                  }>
                  favorite
                </span>
              )}
              <span className="likes">{singlePost.likes.likeCount}</span>
              {bookmarks?.find((bookmarkedPost) => bookmarkedPost._id === postId) ? (
                <span
                  className="material-icons like-icon btn"
                  onClick={() => dispatch(deleteBookmark(singlePost))}>
                  bookmark
                </span>
              ) : (
                <span
                  className="material-symbols-outlined btn"
                  onClick={() => dispatch(bookmarkPost(singlePost))}>
                  bookmark
                </span>
              )}
              {singlePost.username === currentUser.username && (
                <span className="material-icons">delete</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
