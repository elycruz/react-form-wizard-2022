import * as React from "react";

export function ContactFields() {
  return (<React.Fragment>
    <label htmlFor="email">Email:</label>
    <div><input type="email" id="email" name="email" required/></div>
    <label htmlFor="phone">Phone:</label>
    <div><input type="tel" id="phone" name="phone" required/></div>
  </React.Fragment>)
}
