import {AddressData, ContactInfoData, NameData, OtherData} from "../../../src/data/models";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../../../src/data/constants";
import {sessionConfig} from '../../../middleware';
import {fieldsetConfigsByName} from "../../../src/data/fieldsetConfigs";
import {serverStore as storage} from '../../../server';
import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";

export default withIronSessionApiRoute(intakeFormHandler, sessionConfig);

async function intakeFormHandler(req: NextApiRequest, res: NextApiResponse) {
  const {query: {params: [fieldsetName], redirectUri = req.url}} = req,
    {[fieldsetName as string]: fieldsetConfig} = fieldsetConfigsByName;
  console.log(req.query.params)

  if (!fieldsetName || !fieldsetConfig) {
    return res.status(404).json({
      error: 'Endpoint not found'
    });
  }

  const {session, session: {user}} = req;

  switch (req.method) {
    case 'POST':
      // Pseudo:
      // Perform data validation
      //   If validation success set entry in memory
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response with message

      const {intakeForm = {}} = user;

      if (intakeForm) {

        // Pseudo "Create" action
        intakeForm[fieldsetConfig.name] = Object.assign({}, intakeForm[fieldsetConfig.name] || {}, Object.keys(fieldsetConfig.fields)
          .reduce((agg, k) => {
            if (!!req.body[k]) {
              agg[k] = req.body[k]
            }
            return agg;
          }, {}));
      }

      user.intakeForm = intakeForm;

      storage.set(user.id, user);

      await session.save();
      return res.redirect(307, (redirectUri as string));
    case 'PUT':
    case'GET':
    case 'DELETE':
    default:
      break;
  }
  // res.status(200).json({message: 'hello'});
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
