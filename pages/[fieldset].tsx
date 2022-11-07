import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {NextRouter, useRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {fieldsetConfigsByName} from '../src/data/fieldsetConfigs';
import {lazy, Suspense} from "react";
import {ucaseFirst} from "../src/utils";
import dynamic from "next/dynamic";

export interface IndexPageProps extends WithRouterProps {
}

const NameFields = dynamic(() => import('../src/components/name-fields')
    .then(rslt => rslt.NameFields)),

  AddressFields = dynamic(() => import('../src/components/address-fields')
    .then(rslt => rslt.AddressFields)),

  ContactFields = dynamic(() => import('../src/components/contact-fields')
    .then(rslt => rslt.ContactFields)),

  OtherFields = dynamic(() => import('../src/components/other-fields')
    .then(rslt => rslt.OtherFields)),

  fieldComponents = {NameFields, AddressFields, ContactFields, OtherFields}
;


function IndexPage() {
  const {query: {fieldsetName = 'name'}} = useRouter() as NextRouter;
  const fieldsetConfig = fieldsetConfigsByName[fieldsetName as string],

    // Enable "lazy load" for target "Fields" component
    FieldsComponent = fieldComponents[ucaseFirst(fieldsetName as string) + 'Fields'];

  return (
    <React.Fragment>
      <IntakeFormLayout name={fieldsetConfig.name}
                        prevPage={fieldsetConfig.prev}
                        nextPage={fieldsetConfig.next}
                        action={`intake-form/${fieldsetConfig.name}`}>
        <fieldset className="x-fieldset--grid-2 x-grid">
          <legend>{fieldsetConfig.legend}</legend>
          <Suspense>
            <FieldsComponent />
          </Suspense>
        </fieldset>
      </IntakeFormLayout>
    </React.Fragment>
  );
}

export default IndexPage;
