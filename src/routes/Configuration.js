import React, { useContext } from 'react';
import { Store } from '../Store';

const languageOptions = [
  {
    label: 'English',
    id: 'en',
  },
  {
    label: 'Deutsch',
    id: 'de',
  },
  {
    label: 'Français',
    id: 'fr',
  },
];
const subtitleOptions = [
  ...languageOptions,
  {
    label: 'None',
    id: 'none',
  },
];

const Configuration = () => {
  const { state, dispatch } = useContext(Store);
  const { configuration } = state;

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
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Preferred Video Download Quality</legend>
              <div className="col">
                {[1080, 720, 480].map(q => (
                  <div className="form-check" key={`key_quality_${q}`}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="qualityRadios"
                      id={`quality_${q}`}
                      value={q}
                      checked={q === configuration.quality}
                      onChange={e => dispatch({
                        type: 'SET_CONFIG_QUALITY',
                        payload: parseInt(e.target.value),
                      })}
                      />
                    <label className="form-check-label" htmlFor={`quality_${q}`}>
                      {q}
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
