import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {OtherFields} from "../src/components/other-fields";

export default function OtherPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout prevPage={'contact-info'} formAction={'/other'}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Other</legend>
          <OtherFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
