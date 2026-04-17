import React, { createContext, useReducer, useEffect } from 'react';
import { comicReducer, initialState } from '../reducers/comicReducer';

export const ComicContext = createContext();

const LOCAL_STORAGE_KEY = 'eko_cizgi_roman_state';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Local storage error:", err);
    return initialState;
  }
};

export const ComicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(comicReducer, initialState, loadState);

  useEffect(() => {
    // Save to local storage on state change. 
    // In a production app, we might debounce this.
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (err) {
      console.error("Failed to save to local storage", err);
    }
    
    // Auto calculate scores when panels change
    dispatch({ type: 'CALCULATE_SCORES' });
  }, [state.panels]);

  return (
    <ComicContext.Provider value={{ state, dispatch }}>
      {children}
    </ComicContext.Provider>
  );
};
