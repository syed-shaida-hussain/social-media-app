import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Signin } from './common/pages/Authentication/Login/login';
import { Signup } from './common/pages/Authentication/Signup/signup';
import { Homepage } from './common/pages/Homepage/home';
import { SinglePostPage } from './common/pages/SinglePostPage/singlePost';
import { ProfilePage } from './common/pages/ProfilePage/userProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path={`/posts/:postId`} element={<SinglePostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <a href="https://arxiv.org/pdf/2212.08011.pdf">Click</a>
    </div>
  );
}

export default App;
