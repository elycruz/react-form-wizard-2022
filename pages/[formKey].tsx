import {NextRouter, useRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import {ucaseFirst} from "../src/utils";
import dynamic from "next/dynamic";
import {getFormPageLayout} from "../server";
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {Suspense} from "react";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";

export interface IndexPageProps extends WithRouterProps {
}

const NameFields = dynamic(() => import('../src/components/name-fields')
    .then(rslt => rslt.NameFields)),

  AddressFields = dynamic(() => import('../src/components/address-fields')
    .then(rslt => rslt.AddressFields)),

  ContactFields = dynamic(() => import('../src/components/contact-fields')
    .then(rslt => rslt.ContactFields)),

  OtherFields = dynamic(() => import('../src/components/other-fields')
    .then(rslt => rslt.OtherFields))
;

function IndexPage() {
  const {query: {formKey: fieldsetName = 'name'}} = useRouter() as NextRouter;
  const fieldsetConfig = fieldsetConfigsByName[fieldsetName as string];

  // Enable "lazy load" for target "Fields" component
  let FieldsComponent;

  switch (fieldsetName) {
    case NAME_SYMBOL:
      FieldsComponent = NameFields;
      break;
    case ADDRESS_SYMBOL:
      FieldsComponent = AddressFields;
      break;
    case OTHER_SYMBOL:
      FieldsComponent = OtherFields;
      break;
    case CONTACT_INFO_SYMBOL:
    default:
      FieldsComponent = ContactFields;
      break;
  }

  const {name, prev, next, legend} = fieldsetConfig;

  return (
    <React.Fragment>
      <IntakeFormLayout name={name}
                        prevAction={`/api/intake-form/${name}?redirectUri=/${prev}`}
                        nextAction={`/api/intake-form/${name}?redirectUri=/${next}`}
                        action={`/api/intake-form/${name}`}
                        csrfTokenName={'csrf'}
                        csrfToken={'bla'}>
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

export default IndexPage;

