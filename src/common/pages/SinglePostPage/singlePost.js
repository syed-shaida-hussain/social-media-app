import SinglePost from '../../../features/posts/singlePost';
import '../Homepage/home.css';
import '../../../style/utils.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { followUser, unfollowUser } from '../../../features/posts/userSlice';
import { Users } from '../../compoments/users';

const SinglePostPage = () => {
  // const { users, currentUser } = useSelector((store) => store.auth);
  // const dispatch = useDispatch();

  return (
    <div className="flex-r mt1">
      <SinglePost />
      <Users />
    </div>
  );
};

export { SinglePostPage };
