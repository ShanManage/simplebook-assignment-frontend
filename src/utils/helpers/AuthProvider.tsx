import { ReactNode, createContext, useContext } from 'react'
import {  signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../config/firebase'
import { CreateNewUserPayloadDto, SignUpFormFields } from '../../interfaces';
import { AppDispatch } from '../../redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/action';
import { clearAuthState } from '../../redux/slice';

interface AuthContextType {
  createUser: (data: SignUpFormFields) => Promise<void>
  authenticate: (username: string, password: string) => Promise<void>
  logout: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  createUser: async () => await Promise.resolve(),
  authenticate: async () => await Promise.resolve(),
  logout: async () => await Promise.resolve(true)
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const createUser = async (data: SignUpFormFields) => {
    const {
      username,
      password,
      firstName,
      lastName
    } = data
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
    <AuthContext.Provider value={{ createUser, authenticate, logout }}>
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
