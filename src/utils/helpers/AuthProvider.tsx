import { ReactNode, createContext, useContext, useState } from 'react'
import {  signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../config/firebase'
import { CreateNewUserPayloadDto, SignUpFormFields } from '../../interfaces';
import { AppDispatch } from '../../redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/action';
import { clearAuthState } from '../../redux/slice';

interface AuthContextType {
  isAuthorizing: boolean
  createUser: (data: SignUpFormFields) => Promise<void>
  authenticate: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  isAuthorizing: false,
  createUser: async () => await Promise.resolve(),
  authenticate: async () => await Promise.resolve(true),
  logout: async () => await Promise.resolve(true)
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const dispatch = useDispatch<AppDispatch>();

  const createUser = async (data: SignUpFormFields) => {
    const {
      username,
      password,
      firstName,
      lastName
    } = data
    setIsAuthorizing(true)
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      const payload: CreateNewUserPayloadDto = {
        bodyParam: {
          email: username,
          firstName,
          lastName
        }
      }
      dispatch(authAction.createUser(payload))
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode, 'errorMessage', errorMessage)
    }).finally(() => {
      setIsAuthorizing(false)
    });
  }

  const authenticate = async (username: string, password: string): Promise<boolean> => {
    setIsAuthorizing(true)
    return signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode, 'errorMessage', errorMessage);
        return false;
      }).finally(() => {
        setIsAuthorizing(false)
      });
  }

  const logout = async (): Promise<boolean> => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      dispatch(clearAuthState());
      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ createUser, authenticate, logout, isAuthorizing }}>
      {children}
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
