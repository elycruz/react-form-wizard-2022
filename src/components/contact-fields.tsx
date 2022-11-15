import * as React from "react";

export interface ContactFieldsProps {
  showPhone?: boolean;
  email?: string,
  phone?: string,
  messages?: { [index: string]: string }
}

export function ContactFields(props?: ContactFieldsProps) {
  const {messages: {email: emailMessage, phone: phoneMessage} = {}, phone, email} = props;
  return (<React.Fragment>
    <label htmlFor="email">Email:</label>
    <div className="x-field">
      <div className="x-input">
        <input type="email" id="email" name="email" required defaultValue={email} />
      </div>
      {emailMessage && (<div className="x-error-message">emailMessage</div>)}
    </div>
    {props.showPhone && (<React.Fragment>
      <label htmlFor="phone">Phone:</label>
      <div className="x-field">
        <div className="x-input">
          <input type="tel" id="phone" name="phone" required defaultValue={phone} className="x-input"/>
        </div>
        {phoneMessage && (<div className="x-error-message">phoneMessage</div>)}
      </div>
    </React.Fragment>)}
  </React.Fragment>)
}
