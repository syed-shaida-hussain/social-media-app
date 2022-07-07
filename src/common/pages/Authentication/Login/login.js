import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signinService } from '../../../../Services/login-service';
import '../../../../style/utils.css';
import '../../Authentication/auth.css';

const Signin = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [auth, setAuth] = useState({
    token: localStorage.getItem('AUTH_TOKEN'),
    status: localStorage.getItem('AUTH_TOKEN') ? true : false,
    username: localStorage.getItem('username') || ''
  });

  const signinSubmitHandler = async (user) => {
    const { encodedToken } = await signinService(user);
    if (encodedToken !== undefined) {
      localStorage.setItem('AUTH_TOKEN', JSON.stringify(encodedToken));
      console.log(auth);
      setAuth((auth) => ({
        ...auth,
        status: true,
        token: encodedToken
      }));
    }
  };

  const logout = () => {
    window.location.reload(true);
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('STATUS');
  };
  return (
    <section>
      <div className="logout-btn-container">
        <button className="logout-btn mt1 mr1" onClick={() => logout()}>
          {' '}
          Logout
        </button>
      </div>

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
              username: 'adarshbalika',
              password: 'adarshBalika123'
            })
          }>
          Signin as Guest
        </button>

        <button className="create-account-link">
          <Link to="/signup">Create new account </Link>
        </button>
      </form>
    </section>
  );
};
export { Signin };
