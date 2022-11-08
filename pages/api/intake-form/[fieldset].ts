import {AddressData, ContactInfoData, NameData, OtherData} from "../../../src/data/models";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../../../src/data/constants";
import {sessionConfig} from '../../../middleware';
import {fieldsetConfigsByName} from "../../../src/data/fieldsetConfigs";
import {serverStore as storage} from '../../../server';
import {withIronSessionApiRoute} from "iron-session/next";

export default withIronSessionApiRoute(intakeFormHandler, sessionConfig);

async function intakeFormHandler(req, res) {
  const {query: {fieldsetName}} = req,
    {[fieldsetName]: fieldsetConfig} = fieldsetConfigsByName;

  if (!fieldsetName || !fieldsetConfig) {
    return res.status(404).json({
      error: 'Endpoint not found'
    });
  }

  const {session, session: {user}} = req;
console.log(req.query)
  switch (req.method) {
    case 'POST':
      // Pseudo:
      // Perform data validation
      //   If validation success set entry in memory
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response with message

      // Pseudo "Create" action
      user.intakeForm = Object.assign({}, user.intakeForm || {}, Object.keys(fieldsetConfig.fields)
        .reduce((agg, k) => {
          if (!!req.query[k]) {
            agg[k] = req.query[k]
          }
          return agg;
        }, {}));

      storage.set(Math.random(), user);

      await session.save();
      console.log('User data:', user);
      return res.redirect(200, `/${fieldsetConfig.next}`);
    case 'PUT':
      break;
    case'GET':
      break;
    case 'DELETE':
      break;
    default:
      break;
  }
  res.status(200).json({message: 'hello'});
}

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
