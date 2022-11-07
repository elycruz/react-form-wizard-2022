import {AddressData, ContactInfoData, NameData, OtherData} from "../../../src/data/models";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../../../src/data/constants";

export default function intakeFormHandler(req, res) {
  const {query: {fieldsetName}} = req;
  if (!fieldsetName || !Object.hasOwn(intakeFormHandler, fieldsetName)) {
    return res.status(404).json({
      error: 'Endpoint not found'
    });
  }

  switch (req.method) {
    case 'POST':
      // Pseudo:
      // Perform data validation
      //   If validation success add/set entry into memory store
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response status with message
      break;
    case 'PUT':
      break;
    case'GET':
      break;
    case 'DELETE':
      break;
    default:
      break;
  }

  console.log('index');
  return res.status(200).json({hello: 'hello'});
};

const handleNameFieldset = (data: NameData) => {
  },
  handleAddressFieldset = (data: AddressData) => {
  },
  handleContactInfoFieldset = (data: ContactInfoData) => {
  },
  handleOtherFieldset = (data: OtherData) => {
  },
  intakeFormHandlers = {
    [NAME_SYMBOL]: handleNameFieldset,
    [ADDRESS_SYMBOL]: handleAddressFieldset,
    [CONTACT_INFO_SYMBOL]: handleContactInfoFieldset,
    [OTHER_SYMBOL]: handleOtherFieldset,
  };
