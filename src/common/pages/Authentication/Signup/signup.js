import { useState } from 'react';
import { signupService } from '../../../../Services/signup-service';
import '../../../../style/utils.css';
import '../../Authentication/auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    name: ''
  });

  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: localStorage.getItem('AUTH_TOKEN'),
    status: localStorage.getItem('AUTH_TOKEN') ? true : false,
    username: localStorage.getItem('username') || ''
  });

  const signupSubmitHandler = async (user) => {
    const { name, encodedToken, username, email } = await signupService(user);
    console.log(auth);
    if (encodedToken !== undefined) {
      localStorage.setItem('AUTH_TOKEN', JSON.stringify(encodedToken));
      localStorage.setItem('USERNAME', JSON.stringify(user.firstName));
      setAuth((auth) => ({
        ...auth,
        status: true,
        token: encodedToken,
        name: name,
        username: username,
        email: email
      }));
      navigate('/login');
    }
  };

  return (
    <section>
      <form
        className="page-wrapper flex-page"
        onSubmit={(e) => {
          e.preventDefault();
          signupSubmitHandler(user);
        }}>
        <h1 className="page-heading centered">Signup</h1>

        <div className="input-labels">Name</div>
        <input
          className="input-field"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />

        <div className="input-labels">Email Address</div>
        <input
          className="input-field"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <div className="input-labels">Username</div>
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
          Signup
        </button>
      </form>
    </section>
  );
};
export { Signup };
