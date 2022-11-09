import {WithRouterProps} from "next/dist/client/with-router";
import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import dynamic from "next/dynamic";
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {Suspense} from "react";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";
import {User} from "../src/data/models";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export interface FormPageProps extends WithRouterProps {
  user?: User,
  fieldsetName?: string
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

export function FormPage(props: FormPageProps) {
  const {fieldsetName} = props;
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
                        prevAction={prev && `/api/intake-form/${name}?redirectUri=/${prev}`}
                        nextAction={next && `/api/intake-form/${name}?redirectUri=/${next}`}
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

export async function getServerSideProps(): Promise<{ props: FormPageProps }> {
  return fetch('/api/intake-form', {
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then((data: FormPageProps) => {
      return {props: {fieldsetName: CONTACT_INFO_SYMBOL, ...data} as FormPageProps};
    })
    .catch(err => {
      error(err);
      return {props: {fieldsetName: CONTACT_INFO_SYMBOL}} as { props: FormPageProps };
    });
}

export default FormPage;

