import React, { useReducer } from 'react';
import Cookies from 'universal-cookie';
import shaka from 'shaka-player';

export const Store = React.createContext();
const cookies = new Cookies();
const initialConfiguration = {
  language: null,
  subtitles: null,
  quality: null,
};
const initialState = {
  configuration: initialConfiguration,
  dbIndex: [],
  isInit: false,
  isSupported: true,
  videos: [],
  player: null,
  storage: null,
};
 
const init = async (dispatch) => {
  const videosJsonPromise = fetch('data/videos.json').then(response => response.json());

  shaka.polyfill.installAll();

  const isShakaPlayerSupported = shaka.Player.isBrowserSupported();
  const isShakaStorageSupported = shaka.offline.Storage.support();

  if (isShakaPlayerSupported && isShakaStorageSupported) {
    const player = new shaka.Player();
    const storage = new shaka.offline.Storage(player);
    const storageListPromise = storage.list();

    const onError = (error) => {
      console.error('Error code', error.code, 'object', error);
    };
    player.addEventListener('error', ({ detail }) => onError(detail));

    // get previous configuration from cookies
    const configuration = {
      language: cookies.get('userPreferredAudioLanguage'),
      subtitles: cookies.get('userPreferredTextLanguage'),
      quality: cookies.get('PreferredVideoQuality'),
    };

    const trackSelectionCallback = (tracks) => {
      // This example stores the highest bandwidth variant.
      //
      // Note that this is just an example of an arbitrary algorithm, and not a best
      // practice for storing content offline. Decide what your app needs, or keep
      // the default (user-pref-matching audio, best SD video, all text).
      
      const found = tracks
        .filter(track => track.type === 'variant')
        .sort((a, b) => a.bandwidth - b.bandwidth);
      console.log(found);
      return [found.pop()];
    }

    // make shaka dispatch progress events so that we can have a progress bar when downloading
    const progressCallback = (content, progress) => window.dispatchEvent(new CustomEvent("storage-progress", { detail: { content, progress }}));
    player.configure({
      offline: {
        progressCallback,
        trackSelectionCallback,
      },
      preferredAudioLanguage: configuration.language,
      preferredTextLanguage: configuration.subtitles,
    });

    // get available videos from server
    // and check offline storage (IndexedDB)
    // simultaneously (both are async)
    const [videos, dbIndex] = await Promise.all([
      videosJsonPromise,
      storageListPromise,
    ]);

    // start app
    return dispatch({
      type: 'INIT_DONE',
      payload: {
        configuration,
        dbIndex,
        isInit: true,
        isSupported: isShakaPlayerSupported && isShakaStorageSupported,
        player,
        storage,
        videos,
      },
    });
  }

  // not supported
  return dispatch({
    type: 'INIT_DONE',
    payload: {
      ...initialState,
      isInit: true,
      isSupported: false,
    },
  });
};

const reducer = (state, { type, payload, dispatch }) => {
  switch (type) {
    case 'INIT':
      init(dispatch);
      return state;
    case 'INIT_DONE':
      return {
        ...state,
        isInit: payload.isInit,
        isSupported: payload.isSupported,
        videos: payload.videos,
        dbIndex: payload.dbIndex,
        configuration: payload.configuration,
        player: payload.player,
        storage: payload.storage,
      };
    case 'UPDATE_DB_INDEX':
      return {
        ...state,
        dbIndex: payload.dbIndex,
      };
    case 'SET_CONFIG_LANGUAGE':
      cookies.set('userPreferredAudioLanguage', payload, { path: '/' });
      state.player.configure({ preferredAudioLanguage: payload });
      return {
        ...state,
        configuration: {
          ...state.configuration,
          language: payload,
        },
      };
    case 'SET_CONFIG_SUBTITLES':
      cookies.set('userPreferredTextLanguage', payload, { path: '/' });
      state.player.configure({ preferredTextLanguage: payload });
      return {
        ...state,
        configuration: {
          ...state.configuration,
          subtitles: payload,
        },
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

