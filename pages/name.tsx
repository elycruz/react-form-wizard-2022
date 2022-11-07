import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {NameFields} from "../src/components/name-fields";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";
import {NAME_SYMBOL} from "../src/data/constants";

const nameFieldsCnf = fieldsetConfigsByName[NAME_SYMBOL];

export default function NamePage() {
  return (
    <React.Fragment>
      <IntakeFormLayout name={nameFieldsCnf.name}
                        nextPage={nameFieldsCnf.next}
                        action={`/intake-form/${nameFieldsCnf.name}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{nameFieldsCnf.legend}</legend>
          <NameFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
