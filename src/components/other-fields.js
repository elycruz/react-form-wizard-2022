import * as React from 'react';

export function OtherFields() {
  return (
    <React.Fragment>
      <label htmlFor="cookies-yes">Did you have cookies today?</label>
      <div className="x-field">
        <div className="x-field">
          <input type="radio" className="x-radio" id="cookies-yes" name="cookies"/>
          <label htmlFor="cookies-yes">Yes</label>
        </div>
        <div className="x-field">
          <input type="radio" className="x-radio" id="cookies-no" name="cookies" defaultChecked/>
          <label htmlFor="cookies-no">No</label>
        </div>
      </div>
    </React.Fragment>
  );
}
