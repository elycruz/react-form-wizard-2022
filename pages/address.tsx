import * as React from "react";
import {AddressFields} from "../src/components/address-fields";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL} from "../src/data/constants";

export default function AddressPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout name={ADDRESS_SYMBOL}
                        prevPage={NAME_SYMBOL}
                        nextPage={CONTACT_INFO_SYMBOL}
                        action={`/${ADDRESS_SYMBOL}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Address</legend>
          <AddressFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  )
}
