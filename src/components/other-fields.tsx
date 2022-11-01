import * as React from 'react';

export function OtherFields() {
  return (
    <React.Fragment>
      <label htmlFor="cookies-today-yes">Did you have cookies today?</label>
      <div className="x-field">
        <div className="x-field">
          <input type="radio" className="x-radio" id="cookies-today-yes" name="cookies-today"/>
          <label htmlFor="cookies-today-yes">Yes</label>
        </div>
        <div className="x-field">
          <input type="radio" className="x-radio" id="cookies-today-no" name="cookies-today" defaultChecked/>
          <label htmlFor="cookies-today-no">No</label>
        </div>
      </div>
    </React.Fragment>
  );
}
