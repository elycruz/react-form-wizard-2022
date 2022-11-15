import * as React from "react";
import {Suspense} from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {Fieldset} from "../src/types";

// Token with placeholder value
const csrf_token = Math.random() + ''

export const serverStore = new Map(),

  getFormPageLayout = (fieldsetConfig: Fieldset, FieldsComponent) => {
    const {name, prev, next, legend} = fieldsetConfig;

    return (
      <React.Fragment>
        <IntakeFormLayout name={name}
                          prevAction={`/api/intake-form/${name}?redirectUri=/${prev}`}
                          nextAction={`/api/intake-form/${name}?redirectUri=/${next}`}
                          action={`/api/intake-form/${name}`}
                          csrfTokenName={'csrf'}
                          csrfToken={csrf_token}>
          <fieldset className="x-fieldset--grid-2 x-grid">
            <legend>{legend}</legend>
            <Suspense>
              <FieldsComponent/>
            </Suspense>
          </fieldset>
        </IntakeFormLayout>
      </React.Fragment>
    );
  }

;
