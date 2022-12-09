import {FwTable, FwTableColumn} from "../components/fw-table";
import {IntakeFormData} from "../types";
import {CONTACT_INFO_SYMBOL, EMAIL_SYMBOL, PHONE_SYMBOL} from "../constants";

export default {
  title: 'Table',
  component: FwTable,
}

const exampleColumns: FwTableColumn<IntakeFormData>[] = [
  {
    label: "No.",
    name: null,
    indexColumn: true,
    indexColumnOffset: 0
  }, {
    label: "Email",
    name: `${EMAIL_SYMBOL}`
  }, {
    label: "Phone",
    name: `${PHONE_SYMBOL}`
  }
],

exampleData = [
  {[EMAIL_SYMBOL]: 'test@test.com', [PHONE_SYMBOL]: '(123) 456-7891'},
  {[EMAIL_SYMBOL]: 'abc@abc.com', [PHONE_SYMBOL]: '(123) 456-7891'},
];

export const WithNoEntriesOrColumns = (args) => <FwTable data={[]} columns={[]}/>,

  WithEntriesAndColumns = (args) => <FwTable data={exampleData} columns={exampleColumns}/>

;
