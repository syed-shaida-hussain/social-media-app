import { useSelector } from 'react-redux';
import ProfileBg from '../../../images/profile-bg.svg';
import Avatar from '../../../images/avatar-pic.svg';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../compoments/users';

const ProfilePage = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { userPosts } = useSelector((store) => store.timeline);
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      <main className=" mt1 flex-r">
        <section className="posts">
          <h3 className="ml1">Welcome {currentUser.username} :)</h3>
          <p className="ml1 font-small mb1">{userPosts.length} Tweets</p>
          <img className="profile-bg" style={{ backgroundImage: `url(${ProfileBg})` }} />
          <img className="avatar small-avatar" src={Avatar} />
          <div className="ml2">
            <h3 className="mt-half">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <div>@{currentUser.username}</div>
            <div className="flex-r mt1">
              <div className="mr1">Following {currentUser?.following?.length}</div>
              <div>Followers {currentUser?.followers?.length}</div>
            </div>
          </div>
          <div className="ml2 mt1"></div>
          <h3 className="ml1 mb1 mt1">Your posts:</h3>
          {userPosts.map((post) => (
            <div
              className="mb1 ml1  wrapper hover-bg"
              key={post._id}
              onClick={() => navigate(`/posts/${post._id}`)}>
              <div className="flex-r space-bw align-items">
                <div>@{post.username}</div>
              </div>
              <p>{post.content}</p>
              <div className="flex-r align-items mt1">
                {<span className="material-icons">delete</span>}
              </div>
            </div>
          ))}
        </section>
        <section className="wrapper ml1 mr1 ">
          <h3>You might like</h3>
          <Users />
        </section>
      </main>
    </div>
  );
};

export { ProfilePage };
