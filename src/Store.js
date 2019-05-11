import React, { useReducer } from 'react';

export const Store = React.createContext();

const initialProgress = {
  content: null,
  progress: 0,
};

const initialState = {
  isInit: false,
  isSupported: true,
  videos: [],
  downloadInProgress: initialProgress,
  dbIndex: [],
  isOnline: window.navigator.onLine,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_DONE':
      return {
        ...state,
        isInit: action.isInit,
        isSupported: action.isSupported,
        videos: action.videos,
      };
    case 'DOWNLOAD_PROGRESS':
      const { content, progress } = action;
      return { ...state, downloadInProgress: { content, progress } };
    case 'UPDATE_DB_INDEX':
      return { ...state, dbIndex: action.dbIndex };
    case 'SET_IS_ONLINE':
      return { ...state, isOnline: action.isOnline }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  );
};

