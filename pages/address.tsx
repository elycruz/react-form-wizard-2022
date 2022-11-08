import {AddressFields} from "../src/components/address-fields";
import {ADDRESS_SYMBOL} from "../src/data/constants";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";
import {getFormPageLayout} from "../server";

const addressConfig = fieldsetConfigsByName[ADDRESS_SYMBOL];

export default function AddressPage() {
  return getFormPageLayout(addressConfig, AddressFields)
}
