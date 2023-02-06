import axios from 'axios';

const signupService = async ({ username, password, name, email }) => {
  try {
    const { data } = await axios.post('/api/auth/signup', {
      username: username,
      password: password,
      name: name,
      email: email
    });
    console.log(data.createdUser);
    localStorage.setItem('USER', JSON.stringify(data.createdUser));
    return data;
  } catch (e) {
    console.error(e);
  }
};
export { signupService };
