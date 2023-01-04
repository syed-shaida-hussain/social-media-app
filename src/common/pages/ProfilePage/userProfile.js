// import { useSelector } from 'react-redux';

const ProfilePage = () => {
  // const { currentUser } = useSelector((store) => store.auth);

  const user = localStorage.getItem('USER');
  const currentUser = JSON.parse(user);
  return <div>{currentUser.username}</div>;
};

export { ProfilePage };
