import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Signin } from './common/pages/Authentication/Login/login';
import { Signup } from './common/pages/Authentication/Signup/signup';
import { Homepage } from './common/pages/Homepage/home';
import { SinglePostPage } from './common/pages/SinglePostPage/singlePost';
import { ProfilePage } from './common/pages/ProfilePage/userProfile';
import { Bookmarks } from './common/pages/BookmarkPage/bookmarks';
import { SingleUserPage } from './features/users/singleUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Homepage />} />
        <Route path={`/posts/:postId`} element={<SinglePostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path={`/users/:userId`} element={<SingleUserPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  );
}

export default App;
