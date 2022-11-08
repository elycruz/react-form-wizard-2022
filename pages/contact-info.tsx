import {ContactFields} from "../src/components/contact-fields";
import {CONTACT_INFO_SYMBOL} from "../src/data/constants";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";
import {getFormPageLayout} from "../server";

const contactInfoConfig = fieldsetConfigsByName[CONTACT_INFO_SYMBOL];

export default function ContactInfo() {
  return getFormPageLayout(contactInfoConfig, ContactFields);
}
