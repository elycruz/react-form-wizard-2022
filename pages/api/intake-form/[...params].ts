import {AddressData, ContactInfoData, IntakeFormData, NameData, OtherData} from "../../../src/types";
import {ADDRESS_SYMBOL, CONTACT_INFO_SYMBOL, NAME_SYMBOL, OTHER_SYMBOL} from "../../../src/data/constants";
import {sessionConfig} from '../../../middleware';
import {fieldsetConfigsByName} from "../../../src/data/fieldsetConfigs";
import {serverStore as storage} from '../../../server';
import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";

export default withIronSessionApiRoute(intakeFormHandler, sessionConfig);

async function intakeFormHandler(req: NextApiRequest, res: NextApiResponse) {
  const {query: {params: [fieldsetName, nextFieldsetName], redirectUri = req.url}} = req,
    {[fieldsetName as string]: fieldsetConfig} = fieldsetConfigsByName;

  // If no fieldset name or config bail
  if (!fieldsetName || !fieldsetConfig) {
    return res.status(404).json({
      error: 'Endpoint not found'
    });
  }

  // Get session data
  const {session, session: {user}} = req;

  // Set fieldset name (used in views)
  session.fieldsetName = nextFieldsetName || fieldsetName;

  // Parse incoming request by method
  // ----
  switch (req.method) {
    case 'POST':
      const intakeForm = user?.intakeForm ?? {};

      // @todo
      // Pseudo:
      // Perform data validation
      //   If validation success set entry in memory
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response with message

      // Collect data from request body (Pseudo "Create" action)
      intakeForm[fieldsetConfig.name] = Object.assign({}, intakeForm[fieldsetConfig.name] || {},
        fieldsetConfig.fields
          .reduce((agg, field) => {
            if (!!req.body[field.name]) {
              agg[field.name] = req.body[field.name]
            }
            return agg;
          }, {} as IntakeFormData)) as IntakeFormData;

      user.intakeForm = intakeForm;
      session.fieldsetName = nextFieldsetName;

      console.log(user);

      storage.set(user.id, user);

      await session.save();

      // If not is last fieldset (in set) and a 'prev' fieldset was requested, redirect
      if (fieldsetName !== OTHER_SYMBOL || (redirectUri && redirectUri !== req.url)) {
        return res.redirect(307, (redirectUri as string));
      }

      // Else, last fieldset was submitted with no 'redirect to fieldset' param
      return res.redirect(307, `http://localhost:3000/form-completed`);

    case'GET':
      if (!session.fieldsetName) session.fieldsetName = fieldsetName;
      await session.save();
      return res.status(200).json({fieldsetName: nextFieldsetName || fieldsetName, user});

    case 'PUT':
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
