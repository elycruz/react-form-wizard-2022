import * as React from "react";

export interface ContactFieldsProps {
  showPhone?: boolean
}

export function ContactFields(props?: ContactFieldsProps) {
  return (<React.Fragment>
    <label htmlFor="email">Email:</label>
    <div><input type="email" id="email" name="email" required/></div>
    {props.showPhone && (<React.Fragment>
      <label htmlFor="phone">Phone:</label>
      <div><input type="tel" id="phone" name="phone" required/></div>
    </React.Fragment>)}
  </React.Fragment>)
}
