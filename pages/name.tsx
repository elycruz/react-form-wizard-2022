import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {NameFields} from "../src/components/name-fields";
import {ADDRESS_SYMBOL, NAME_SYMBOL} from "../src/data/constants";

export default function NamePage() {
  return (
    <React.Fragment>
      <IntakeFormLayout name={NAME_SYMBOL}
                        nextPage={ADDRESS_SYMBOL}
                        action={`/${NAME_SYMBOL}`}>
      <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>Name</legend>
          <NameFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
