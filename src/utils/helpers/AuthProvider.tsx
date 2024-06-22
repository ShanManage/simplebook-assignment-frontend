/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react'
import {  signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../config/firebase'
import { SignUpFormFields } from '../../interfaces';

interface AuthContextType {
  createUser: (data: SignUpFormFields) => Promise<void>
  authenticate: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  createUser: async () => await Promise.resolve(),
  authenticate: async () => await Promise.resolve(),
  logout: async () => await Promise.resolve()
})

const AuthProvider = (props: any) => {

  const createUser = async (data: SignUpFormFields) => {
    const {
      username,
      password
    } = data
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  }

  const authenticate = async (username: string, password: string) => {
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  }

  const logout = async () => {
    signOut(auth).then(() => {
    // Sign-out successful.
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
        const errorMessage = error.message;
        console.log(errorMessage)
    });
  }

  return (
    <AuthContext.Provider value={{ createUser, authenticate, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
