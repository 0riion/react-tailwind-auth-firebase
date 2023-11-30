import { useFirebase, useFirebaseActions } from "../context/AuthProvider";
import { getUserFromAuth } from "../helper/getUserFromAuth";

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useFirebase();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromAuth(user),
  };
};

export const useAuthMethod = () => {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    logout,
  } = useFirebaseActions();

  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    logout,
  };
};
