import React, { useContext } from 'react';
import { Store } from '../Store';

const languageOptions = [
  {
    label: 'English',
    id: 'en-US',
  },
  {
    label: 'Deutsch',
    id: 'ger',
  },
  {
    label: 'Français',
    id: 'fra',
  },
];
const subtitleOptions = [
  ...languageOptions,
  {
    label: 'None',
    id: '',
  },
];

const Configuration = () => {
  const { state, dispatch } = useContext(Store);
  const { configuration } = state;

  // const updateRadios = (update, value) => {
  //   if (update === "audio") {
  //     cookies.set('userPreferredAudioLanguage', value, { path: '/' });
  //     setAudio(value);
  //   } else if (update === "subtitle") {
  //     cookies.set('userPreferredTextLanguage', value, { path: '/' });
  //     setSubtitle(value);
  //   }
  // };

  return (
    <div className="form-check">
      <form>
        <fieldset className="form-group">
          <div className="col">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Preferred Language</legend>
              <div className="col">
                {languageOptions.map(({ label, id }) => (
                  <div className="form-check" key={`key_language_${id}`}>
                    <input 
                      className="form-check-input"
                      type="radio"
                      name="languageRadios"
                      id={`language_${id}`}
                      value={id}
                      checked={id === configuration.language}
                      onChange={e => dispatch({
                        type: 'SET_CONFIG_LANGUAGE',
                        payload: e.target.value,
                      })}
                      />
                    <label className="form-check-label" htmlFor={`language_${id}`}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Preferred Subtitles</legend>
              <div className="col">
                {subtitleOptions.map(({ label, id }) => (
                  <div className="form-check" key={`key_subtitles_${id}`}>
                    <input 
                      className="form-check-input"
                      type="radio"
                      name="subtitleRadios"
                      id={`subtitles_${id}`}
                      value={id}
                      checked={id === configuration.subtitles}
                      onChange={e => dispatch({
                        type: 'SET_CONFIG_SUBTITLES',
                        payload: e.target.value,
                      })}
                      />
                    <label className="form-check-label" htmlFor={`subtitles_${id}`}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );

};

export default Configuration;
