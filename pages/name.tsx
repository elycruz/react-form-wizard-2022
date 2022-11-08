import {NameFields} from "../src/components/name-fields";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";
import {NAME_SYMBOL} from "../src/data/constants";
import {getFormPageLayout} from "../server";

const nameFieldsCnf = fieldsetConfigsByName[NAME_SYMBOL];

export default function NamePage() {
  return getFormPageLayout(nameFieldsCnf, NameFields);
}
