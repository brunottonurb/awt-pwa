import React, { useReducer } from 'react';

export const Store = React.createContext();

const initialState = {
  isInit: false,
  isSupported: true,
  videos: [],
  dbIndex: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_DONE':
      return {
        ...state,
        isInit: action.isInit,
        isSupported: action.isSupported,
        videos: action.videos,
        dbIndex: action.dbIndex,
      };
    case 'UPDATE_DB_INDEX':
      return {
        ...state,
        dbIndex: action.dbIndex,
      };
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

