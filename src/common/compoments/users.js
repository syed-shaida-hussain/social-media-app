import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadVisitedUserPosts } from '../../features/posts/postSlice';
import { followUser, getSingleUser, unfollowUser } from '../../features/posts/userSlice';
import { fetchUser } from '../../features/posts/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, currentUser, visitedUser } = useSelector((store) => store.auth);

  const followHandler = (user) => {
    dispatch(followUser(user));
    dispatch(fetchUser(currentUser));
    dispatch(getSingleUser(visitedUser));
  };

  const unfollowHandler = (user) => {
    dispatch(unfollowUser(user));
    dispatch(fetchUser(currentUser));
    dispatch(getSingleUser(visitedUser));
  };

  const getSingleUserHandler = (user) => {
    dispatch(getSingleUser(user));
    dispatch(loadVisitedUserPosts(user));
    navigate(`/users/${user._id}`);
  };
  return (
    <div>
      {users.map(
        (user) =>
          user.username !== currentUser.username && (
            <div className="flex-r users mt-half" key={user._id}>
              <span onClick={() => getSingleUserHandler(user)}>@{user.username}</span>
              {user.followers.find((user) => user.id === currentUser.id) ? (
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
    </div>
  );
};

export { Users };
