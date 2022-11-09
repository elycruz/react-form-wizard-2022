import {NextRouter, useRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import {ucaseFirst} from "../src/utils";
import dynamic from "next/dynamic";
import {getFormPageLayout, serverStore} from "../server";
import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {Suspense} from "react";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";
import {IntakeFormData} from "../src/data/models";
import {getIronSession, IronSessionData} from "iron-session/edge";
import {sessionConfig} from "../middleware";

export interface IndexPageProps extends WithRouterProps {
  intakeFormData?: IntakeFormData,
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

export class IndexPage extends React.Component<IndexPageProps, any> {
  getServerSideProps(ctx): { props: IndexPageProps } {
    const {req, res} = ctx,
      {user} = getIronSession(req, res, sessionConfig) as IronSessionData;
    console.log(req.query)
    return {
      props: {
        fieldsetName: req.query?.params[0],
        router: null,
        intakeFormData: user && user?.intakeForm ? user.intakeForm : null
      }
    };
  }

  render() {
    const {props: {fieldsetName}} = this;

    const fieldsetConfig = fieldsetConfigsByName[fieldsetName as string];

    console.log(this.props)

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
}


export default IndexPage;

