import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {ContactFields} from "../src/components/contact-fields";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";

const contactInfoConfig = fieldsetConfigsByName[CONTACT_INFO_SYMBOL];

export default function ContactInfoPage() {
  return (
    <React.Fragment>
      <IntakeFormLayout prevPage={contactInfoConfig.prev}
                        nextPage={contactInfoConfig.next}
                        action={`/${contactInfoConfig.name}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{contactInfoConfig.legend}</legend>
          <ContactFields/>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}
