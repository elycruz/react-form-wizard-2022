import * as React from "react";
import {AddressFields} from "../src/components/address-fields";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL} from "../src/data/constants";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";

const addressConfig = fieldsetConfigsByName[ADDRESS_SYMBOL];

export default function AddressPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout name={addressConfig.name}
                        prevPage={addressConfig.prev}
                        nextPage={addressConfig.next}
                        action={`/${addressConfig.name}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{addressConfig.legend}</legend>
          <AddressFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  )
}
