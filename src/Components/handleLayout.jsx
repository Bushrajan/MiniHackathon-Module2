import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const handleLogout = () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
};
