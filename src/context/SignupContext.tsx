
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

// States
type SignupState = {
  step: number; // 1 = Email, 2 = Password, 3 = Plan, 4 = Profil, 5 = Welcome
  email: string;
  password: string;
  plan: string;
  profileName: string;
};

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_PLAN'; payload: string }
  | { type: 'SET_PROFILE'; payload: string }
  | { type: 'RESET' };

// Initial State
const initialState: SignupState = {
  step: 1,
  email: '',
  password: '',
  plan: 'free',
  profileName: '',
};

// Reducer
function signupReducer(state: SignupState, action: Action): SignupState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, step: 2 };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, step: 3 };
    case 'SET_PLAN':
      return { ...state, plan: action.payload, step: 4 };
    case 'SET_PROFILE':
      return { ...state, profileName: action.payload, step: 5 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Context
const SignupContext = createContext<{
  state: SignupState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider
export function SignupProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  return (
    <SignupContext.Provider value={{ state, dispatch }}>
      {children}
    </SignupContext.Provider>
  );
}

// Hook
export function useSignup() {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
}