import React from 'react';

export const Store = React.createContext();

const initialState = {
  isInit: false,
  isSupported: true,
  videos: [],
  isDownloadInProgress: false,
  downloadInProgress: {
    content: null,
    progress: 0,
  },
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
    case 'SET_IS_DOWNLOAD_IN_PROGRESS':
      if (state.isDownloadInProgress === action.value) return state;
      return {
        ...state,
        isDownloadInProgress: action.value,
      };
    case 'DOWNLOAD_PROGRESS':
      return {
        ...state,
        downloadInProgress: {
          content: action.content,
          progress: action.progress,
        },
      }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {children}
    </Store.Provider>
  );
};

