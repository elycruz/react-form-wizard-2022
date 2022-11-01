import * as React from 'react';

export function NameFields() {
  return (<React.Fragment>
    <label htmlFor="first-name">First</label>
    <div><input type="text" id="first-name" name="first-name" required/></div>
    <label htmlFor="middle-initial">Middle, or Middle initial:</label>
    <div><input type="text" id="middle-initial" name="middle-initial"/></div>
    <label htmlFor="last-name">Last:</label>
    <div><input type="text" id="last-name" name="last-name"/></div>
  </React.Fragment>)
}
