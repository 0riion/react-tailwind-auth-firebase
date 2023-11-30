import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from '../config/firebase';

const FirebaseContext = createContext();
const FirebaseActionsContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);
export const useFirebaseActions = () => useContext(FirebaseActionsContext);

const AuthProvider = ({ children }) => {
  const [firebaseData, setFirebaseData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const getAuthUser = auth.onAuthStateChanged(
      (user) => {
        setFirebaseData({
          user: user,
          isLoading: false,
          isAuthenticated: Boolean(user),
        });
      },
      () => {
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
      (completed) => {
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: completed,
        });
      },
    );

    return () => {
      getAuthUser();
    };
  }, [auth]);

  const getProvider = (providerName) => {
    switch (providerName) {
      case 'google': {
        return googleAuthProvider;
      }
      case 'facebook': {
        return facebookAuthProvider;
      }
      case 'twitter': {
        return twitterAuthProvider;
      }
      case 'github': {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const signInWithPopup = async (providerName) => {
    try {
      const { user } = await auth.signInWithPopup(getProvider(providerName));
      setFirebaseData({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const signInWithEmailAndPassword = async ({ email, password }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setFirebaseData({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const createUserWithEmailAndPassword = async ({ name, email, password }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification({
        url: window.location.href,
        handleCodeInApp: true,
      });
      await auth.currentUser.updateProfile({
        displayName: name,
      });
      setFirebaseData({
        user: { ...user, displayName: name },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const logout = async () => {
    setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      await auth.signOut();
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}>
      <FirebaseActionsContext.Provider
        value={{
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          signInWithPopup,
          logout,
        }}>
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default AuthProvider;
