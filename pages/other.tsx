import {OtherFields} from "../src/components/other-fields";
import {getFormPageLayout} from "../server";
import {fieldsetConfigsByName} from "../src/data/fieldsetConfigs";
import {OTHER_SYMBOL} from "../src/data/constants";

export default function OtherPage() {
  return getFormPageLayout(fieldsetConfigsByName[OTHER_SYMBOL], OtherFields);
}
