import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {CONTACT_INFO_SYMBOL, CSRF_TOKEN_SYMBOL} from "../src/constants";
import {IntakeFormData, UserData} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {sessionConfig} from "../middleware";
import {withIronSessionSsr} from 'iron-session/next';
import {Field} from "../src/components/field";

export interface FormPageProps {
  user?: UserData,
  fieldsetName?: string,
  messages?: { [index: string]: string[] }
  intakeForm?: IntakeFormData,
  csrfToken?: string
}

export function FormPage(props: FormPageProps) {
  const {fieldsetName, intakeForm = {}, messages, csrfToken} = props;
  const fieldsetConfig = {fieldMessages: messages, ...fieldsetConfigsByName[fieldsetName as string]},
    formData = intakeForm[fieldsetName] ?? {};

  const {name, prev, next, legend} = fieldsetConfig;

  return (
    <React.Fragment>
      <IntakeFormLayout name={name}
                        prevAction={prev && `/api/intake-form/${name}/${prev}?redirectUri=/${prev}`}
                        nextAction={next && `/api/intake-form/${name}/${next}?redirectUri=/${next}`}
                        action={`/api/intake-form/${name}${!next ? '' : `/${name}?redirectUri=/${name}`}`}
                        method="POST"
                        csrfTokenName={CSRF_TOKEN_SYMBOL}
                        csrfToken={csrfToken}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{legend}</legend>
          {fieldsetConfig?.fields?.map((f, i) =>
            (<Field key={`field-${fieldsetName}-${i}`}
                    defaultValue={formData[f.name]}
                    value={formData[f.name]}
                    {...f} />))
          }
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<FormPageProps> = withIronSessionSsr(
// @ts-ignore
  async ({req: {session}}: NextPageContext): Promise<{ props: FormPageProps }> => {
    const {fieldsetName, user, currIntakeForm: intakeForm, csrfToken} = session;

    return {
      props: {
        fieldsetName: fieldsetName ?? CONTACT_INFO_SYMBOL,
        user: user ?? null,
        intakeForm,
        csrfToken
      }
    }
  }, sessionConfig);

export default FormPage;
