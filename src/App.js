import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Signin } from './common/pages/Authentication/Login/login';
import { Signup } from './common/pages/Authentication/Signup/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
