import * as React from "react";
import {IntakeFormLayout} from "../src/components/intake-form-layout";
import {withRouter} from "next/router";
import {NameFields} from "../src/components/name-fields";
import {WithRouterProps} from "next/dist/client/with-router";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../src/data/constants";

// const AddressFields = () => import("../src/components/address-fields")
//     .then(({AddressFields}) => AddressFields),
//
//   ContactFields = () => import("../src/components/contact-fields")
//     .then(({ContactFields}) => ContactFields),
//
//   NameFields = () => import("../src/components/name-fields")
//     .then(({NameFields}) => NameFields),
//
//   OtherFields = () => import("../src/components/other-fields")
//     .then(({OtherFields}) => OtherFields)
// ;

class IndexPage extends React.Component<WithRouterProps> {
  render() {
    return (
      <React.Fragment>
        <IntakeFormLayout name={NAME_SYMBOL}
                          prevPage={ADDRESS_SYMBOL}
                          nextPage={OTHER_SYMBOL}
                          action={CONTACT_INFO_SYMBOL}>
          <fieldset className="x-fieldset--grid-2 x-grid">
            <legend>Contact Info</legend>
            <NameFields/>
          </fieldset>
        </IntakeFormLayout>
      </React.Fragment>
    );
  }
}

export default withRouter(IndexPage);
