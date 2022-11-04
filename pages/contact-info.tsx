import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {ContactFields} from "../src/components/contact-fields";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";

export default function ContactInfoPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout prevPage={ADDRESS_SYMBOL}
                        nextPage={OTHER_SYMBOL}
                        action={`/${CONTACT_INFO_SYMBOL}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Contact Info</legend>
          <ContactFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
