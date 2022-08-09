import { AuthService } from '../services/auth.service';

const useAuth = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    const user = await AuthService.checkToken(token);
    // console.log(user, 'USER');
    return true;
  } else {
    return false;
  }
};

export default useAuth;
