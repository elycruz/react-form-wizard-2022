import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {CONTACT_INFO_SYMBOL} from "../src/constants";
import {UserData} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {sessionConfig} from "../middleware";
import {withIronSessionSsr} from 'iron-session/next';
import {Field} from "../src/components/field";

export interface FormPageProps {
  user?: UserData,
  fieldsetName?: string,
  messages?: { [index: string]: string[] }
}

export function FormPage(props: FormPageProps) {
  const {fieldsetName, user: {intakeForm} = {}, messages} = props;
  const fieldsetConfig = {fieldMessages: messages, ...fieldsetConfigsByName[fieldsetName as string]},
    formData = intakeForm[fieldsetName] ?? {};

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
          {fieldsetConfig.fields.map((f, i) =>
            (<Field key={`field-${fieldsetName}-${i}`} defaultValue={formData[f.name]} value={formData[f.name]} {...f} />))
          }
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
