import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {NameFields} from "../src/components/name-fields";

export default function NamePage() {
  return (
    <React.Fragment>
      <IntakeFormLayout nextPage={'address'} formAction={'/name'}>
      <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Name</legend>
          <NameFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
