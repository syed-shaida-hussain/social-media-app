import ProfileBg from '../../images/profile-bg.svg';
import Avatar from '../../images/avatar-pic.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../common/compoments/users';
import { Sidebar } from '../../common/compoments/sidebar';

const SingleUserPage = () => {
  const { visitedUser } = useSelector((store) => store.auth);
  const { visitedUserPosts } = useSelector((store) => store.timeline);
  const navigate = useNavigate();
  return (
    <div className="flex-r">
      <Sidebar />
      <div className="profile-card">
        <main className=" mt1 flex-r">
          <section className="posts">
            <h3 className="ml1">@{visitedUser.username}</h3>
            <p className="ml1 font-small mb1">{visitedUserPosts.length} Tweets</p>
            <img className="profile-bg" style={{ backgroundImage: `url(${ProfileBg})` }} />
            <img className="avatar small-avatar" src={Avatar} />
            <div className="ml2">
              <h3 className="mt-half">
                {visitedUser.firstName} {visitedUser.lastName}
              </h3>
              <div>@{visitedUser.username}</div>
              <div className="flex-r mt1">
                <div className="mr1">Following {visitedUser?.following?.length}</div>
                <div>Followers {visitedUser?.followers?.length}</div>
              </div>
            </div>
            <div className="ml2 mt1"></div>
            <h3 className="ml1 mb1 mt1">Your posts:</h3>
            {visitedUserPosts.map((post) => (
              <div
                className="mb1 ml1  wrapper hover-bg"
                key={post._id}
                onClick={() => navigate(`/posts/${post._id}`)}>
                <div className="flex-r space-bw align-items">
                  <div>@{post.username}</div>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </section>
          <section className="wrapper ml1 mr1 ">
            <h3>You might like</h3>
            <Users />
          </section>
        </main>
      </div>
    </div>
  );
};

export { SingleUserPage };
