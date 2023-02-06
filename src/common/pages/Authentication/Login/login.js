import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser, fetchUsers } from '../../../../features/posts/userSlice';
import '../../../../style/utils.css';
import '../../Authentication/auth.css';
import { useDispatch } from 'react-redux';
import { Sidebar } from '../../../compoments/sidebar';
import { ProfilePage } from '../../ProfilePage/userProfile';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [auth, setAuth] = useState({
    token: localStorage.getItem('AUTH_TOKEN'),
    status: localStorage.getItem('AUTH_TOKEN') ? true : false,
    username: localStorage.getItem('USERNAME') || ''
  });

  const signinService = async ({ username, password }) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        username: username,
        password: password
      });
      console.log(data.foundUser);
      dispatch(fetchUser(data.foundUser));
      localStorage.setItem('USER', JSON.stringify(data.foundUser));
      return data;
    } catch (e) {
      alert('user not found');
      console.error(e.response.data);
    }
  };

  const signinSubmitHandler = async (user) => {
    const { encodedToken } = await signinService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem('AUTH_TOKEN', JSON.stringify(encodedToken));
      localStorage.setItem('USERNAME', user.username);
      setAuth({
        ...auth,
        status: true,
        token: encodedToken
      });
      dispatch(fetchUsers());
      navigate('/home');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('USER');
    localStorage.removeItem('USERID');
    setAuth({ ...auth, status: false });
  };
  return (
    <div>
      {!auth.status ? (
        <section>
          <form
            className="page-wrapper flex-r"
            onSubmit={(e) => {
              e.preventDefault();
              signinSubmitHandler(user);
            }}>
            <h1 className="page-heading centered">Login</h1>

            <div className="input-labels">Username </div>
            <input
              className="input-field"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />

            <div className="input-labels">Password</div>
            <input
              className="input-field"
              type="password"
              placeholder="***********"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />

            <button className="login-button" type="submit">
              Signin
            </button>
            <button
              className="signin-guest-btn login-button"
              type="button"
              onClick={() =>
                signinSubmitHandler({
                  username: 'guest',
                  password: 'guest123'
                })
              }>
              Signin as Guest
            </button>

            <button className="create-account-link">
              <Link to="/signup">Create new account </Link>
            </button>
          </form>
        </section>
      ) : (
        <div>
          <div className="logout-btn-container">
            <button className="logout-btn mt1 mr1" onClick={() => logoutHandler()}>
              Logout
            </button>
          </div>
          <div className="flex-r">
            <Sidebar />
            <ProfilePage />
          </div>
        </div>
      )}
    </div>
  );
};
export { Signin };
