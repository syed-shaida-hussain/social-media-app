import axios from 'axios';

const signinService = async ({ username, password }) => {
  try {
    const { data } = await axios.post('/api/auth/login', {
      username: username,
      password: password
    });
    console.log(data.foundUser);
    return data;
  } catch (e) {
    alert('user not found');
    console.error(e.response.data);
  }
};

export { signinService };
