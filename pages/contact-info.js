import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {ContactFields} from "../src/components/contact-fields";

export default function ContactInfoPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Contact Info</legend>
          <ContactFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
