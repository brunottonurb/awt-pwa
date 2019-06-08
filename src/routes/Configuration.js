import React, { useEffect, useState } from 'react';
import { Store } from '../Store';
import Cookies from 'universal-cookie';


const Configuration = ({ history }) => {

  const cookies = new Cookies();
  
  const [audio, setAudio] = useState(cookies.get('userPreferredAudioLanguage'));
  
  const [subtitle, setSubtitle] = useState(cookies.get('userPreferredTextLanguage'));


  const updateRadios = (update, value) => {



    if (update === "audio")
    {
      cookies.set('userPreferredAudioLanguage', value, { path: '/' });
      setAudio(value);
    }
    else if (update === "subtitle")
    {
      cookies.set('userPreferredTextLanguage', value, { path: '/' });
      setSubtitle(value);
    }
  };

  return (

    <div className="form-check">
      <form>
        <fieldset className="form-group">
          <div className="col">
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Preferred Language</legend>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="langRadios" id="langRadios1" value="en-US" checked={audio === 'en-US'} onChange={e => updateRadios("audio", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="langRadios1">
                    English
          </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="langRadios" id="langRadios2"  checked={audio === 'ger'} value="ger" onChange={e => updateRadios("audio", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="langRadios2">
                    German
          </label>
                </div>
                <div className="form-check disabled">
                  <input className="form-check-input" type="radio" name="langRadios" id="langRadios3" value="fr" checked={audio === 'fr'} onChange={e => updateRadios("audio", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="langRadios3">
                    French
          </label>
                </div>
              </div>
            </div>
            <div className="row">
              <legend className="col-form-label col-sm-2 pt-0">Preferred Subtitles</legend>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="subRadios" id="subRadios1" value="en-US" checked={subtitle === 'en-US'} onChange={e => updateRadios("subtitle", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="subRadios1">
                    English
          </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="subRadios" id="subRadios2" value="ger" checked={subtitle === 'ger'} onChange={e => updateRadios("subtitle", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="subRadios2">
                    German
          </label>
                </div>
                <div className="form-check disabled">
                  <input className="form-check-input" type="radio" name="subRadios" id="subRadios3" value="fr" checked={subtitle === 'fr'} onChange={e => updateRadios("subtitle", e.target.value)}></input>
                  <label className="form-check-label" htmlFor="subRadios3">
                    French
          </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );

};

export default Configuration;
