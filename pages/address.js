import * as React from "react";
import {AddressFields} from "../src/components/address-fields";
import {IntakeFormLayout} from "../src/components/intake-form-layout";

export default function AddressPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout prevPage={'name'} nextPage={'contact-info'} formAction={'/address'}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Address</legend>
          <AddressFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  )
}
