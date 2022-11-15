import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import dynamic from "next/dynamic";
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {Suspense} from "react";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";
import {User} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {sessionConfig} from "../middleware";
import {withIronSessionSsr} from 'iron-session/next';

export interface FormPageProps {
  user?: User,
  fieldsetName?: string,
  messages?: { [index: string]: string[] }
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
  const {fieldsetName, user: {intakeForm} = {}, messages} = props;
  const fieldsetConfig = fieldsetConfigsByName[fieldsetName as string],
    formData = intakeForm[fieldsetName] ?? {};

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
                        prevAction={prev && `/api/intake-form/${name}/${prev}?redirectUri=/${prev}`}
                        nextAction={next && `/api/intake-form/${name}/${next}?redirectUri=/${next}`}
                        action={`/api/intake-form/${name}`}
                        csrfTokenName={'csrf'}
                        csrfToken={'bla'}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{legend}</legend>
          <Suspense>
            <FieldsComponent {...formData} messages={messages} />
          </Suspense>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<FormPageProps> = withIronSessionSsr(
// @ts-ignore
  async ({req: {session}}: NextPageContext): Promise<{ props: FormPageProps }> => {
    const {fieldsetName, user} = session;

    return {
      props: {
        fieldsetName: fieldsetName ?? CONTACT_INFO_SYMBOL,
        user
      }
    }
  }, sessionConfig);

export default FormPage;
