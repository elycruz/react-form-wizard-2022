import * as React from 'react';

export function AddressFields() {
  return (<React.Fragment>
    <label htmlFor="address">Address</label>
    <div><input type="text" id="address" name="address"/></div>
    <label htmlFor="city">City:</label>
    <div><input type="text" id="city" name="city"/></div>
    <label htmlFor="state">State:</label>
    <div><input type="text" id="state" name="state"/></div>
    <label htmlFor="zipcode">Zip:</label>
    <div><input type="text" id="zipcode" name="zipcode"/></div>
  </React.Fragment>)
}
