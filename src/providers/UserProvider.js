import { Auth } from 'aws-amplify';

export const getCurrentUser = () => {
  return JSON.parse(window.localStorage.getItem("user-info"));
}

export const logOut = async () =>  {
  await Auth.signOut({ global: true });
}