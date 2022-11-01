import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {withRouter} from "next/router";

const AddressFields = () => import("../src/components/address-fields")
    .then(({AddressFields}) => AddressFields),

  ContactFields = () => import("../src/components/contact-fields")
    .then(({ContactFields}) => ContactFields),

  NameFields = () => import("../src/components/name-fields")
    .then(({NameFields}) => NameFields),

  OtherFields = () => import("../src/components/other-fields")
    .then(({OtherFields}) => OtherFields)
;

class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <IntakeFormLayout prevPage={'address'} nextPage={'other'} formAction={'/contact-info'}>
          <fieldset className="x-fieldset--grid-2 x-grid">
            <legend>Contact Info</legend>
            <ContactFields/>
          </fieldset>
        </IntakeFormLayout>
      </React.Fragment>
    );
  }
}

export default withRouter(IndexPage);
