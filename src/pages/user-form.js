import {AddressFields} from "../components/address-fields";
import {NameFields} from "../components/name-fields";
import {ContactFields} from "../components/contact-fields";
import {OtherFields} from "../components/other-fields";

export function UserForm() {
  return (<section>
    <header>
      <h3>User Info</h3>
    </header>

    <form action="#">
      <fieldset className="x-fieldset x-grid x-fieldset--grid-2">
        <legend>Name</legend>
        <NameFields/>
      </fieldset>
      <fieldset className="x-fieldset x-grid x-fieldset--grid-2">
        <legend>Address</legend>
        <AddressFields/>
      </fieldset>
      <fieldset className="x-fieldset x-grid x-fieldset--grid-2">
        <legend>Contact Info</legend>
        <ContactFields/>
      </fieldset>
      <fieldset className="x-fieldset x-grid x-fieldset--grid-2">
        <legend>Other</legend>
        <OtherFields/>
      </fieldset>
    </form>

  </section>)
}
