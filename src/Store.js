import React, { useReducer } from 'react';
import Cookies from 'universal-cookie';
import shaka from 'shaka-player';

export const Store = React.createContext();
const cookies = new Cookies();
const initialConfiguration = {
  language: 'en',
  subtitles: 'en',
  quality: 480,
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

    const qualityValue = cookies.get('userPreferredQuality');

    // get previous configuration from cookies
    const configuration = {
      language: cookies.get('userPreferredAudioLanguage') || initialConfiguration.language,
      subtitles: cookies.get('userPreferredTextLanguage') || initialConfiguration.subtitles,
      quality: qualityValue ? parseInt(qualityValue) : initialConfiguration.quality,
    };

    const trackSelectionCallback = (tracks) => {
      // HACK: TODO MAYBE: no idea how to access the state inside this function, so I'll just use the cookie
      // I would prefer to access the state
      let quality = initialConfiguration.quality;
      let language = initialConfiguration.language;
      let subtitles = initialConfiguration.subtitles;

      if (!!cookies.get('userPreferredQuality')) 
        quality = parseInt(cookies.get('userPreferredQuality'));  
      if (!!cookies.get('userPreferredAudioLanguage'))
         language = cookies.get('userPreferredAudioLanguage');
      if (!!cookies.get('userPreferredTextLanguage'))
         subtitles = cookies.get('userPreferredTextLanguage');

      if (!!window.customConfig) {
        quality = window.customConfig.quality;
        language = window.customConfig.language;
        subtitles = window.customConfig.subtitles;

        window.customConfig = null;
      }
      player.configure({
        preferredAudioLanguage: language,
        preferredTextLanguage: subtitles,
      });

      const videoWithAudio = tracks
        .sort((a, b) => a.height - b.height) // qualities are now sorted from worst to best
        .filter(track => track.type === 'variant' && track.height <= quality); // choose all qualities smaller than the preferrence

      const videoWithCorrectLanguage = videoWithAudio.filter(track => track.language === language);

      const subtitlesTracks = tracks.filter(track => track.type === 'text').filter(track => track.language === subtitles);
      console.log(subtitlesTracks);
      //player.configure({ preferredTextLanguage: subtitles});
      return [
        ...subtitlesTracks,
        videoWithCorrectLanguage.length > 0 ? videoWithCorrectLanguage.pop() : videoWithAudio.pop() // choose english when preferrence is not available
      ];
    }

    // make shaka dispatch progress events so that we can have a progress bar when downloading
    const progressCallback = (content, progress) => window.dispatchEvent(new CustomEvent('storage-progress', { detail: { content, progress } }));
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
      state.player.configure({ preferredTextLanguage: payload === 'none' ? '' : payload });
      return {
        ...state,
        configuration: {
          ...state.configuration,
          subtitles: payload,
        },
      };
    case 'SET_CONFIG_QUALITY':
      cookies.set('userPreferredQuality', payload, { path: '/' });
      return {
        ...state,
        configuration: {
          ...state.configuration,
          quality: payload,
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

