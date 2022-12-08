import {IntakeFormData} from "../../../src/types";
import {CONTACT_INFO_SYMBOL, OTHER_SYMBOL} from "../../../src/constants";
import {sessionConfig} from '../../../middleware';
import {fieldsetConfigsByName} from "../../../src/data/fieldsetConfigs";
import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";
import {storage} from '../../../server/storage';

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
  const {session, session: {user, currIntakeForm: intakeForm = {}}} = req;

  // Set fieldset name (used in views)
  session.fieldsetName = nextFieldsetName || fieldsetName;

  // Parse incoming request by method
  // ----
  switch (req.method) {
    case 'POST':

      // @todo
      // Pseudo:
      // Perform data validation
      //   If validation success set entry in memory
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response with message

      // Collect data from request body
      intakeForm[fieldsetConfig.name] = Object.assign({}, intakeForm[fieldsetConfig.name] || {},
        fieldsetConfig.fields
          .reduce((agg, field) => {
            if (!!req.body[field.name]) {
              agg[field.name] = req.body[field.name]
            }
            return agg;
          }, {} as IntakeFormData)) as IntakeFormData;

      intakeForm.lastCompletedFieldset = fieldsetName;
      session.currIntakeForm = intakeForm;
      session.fieldsetName = nextFieldsetName;

      console.log(`Saving intake form data:`, intakeForm, `\nFor user: `, user);

      await storage.put(user.id, intakeForm);
      await session.save();

      // If not is last fieldset (in set) and a 'prev' fieldset was requested, redirect
      if (fieldsetName !== OTHER_SYMBOL || (redirectUri && redirectUri !== req.url)) {
        return res.redirect(307, (redirectUri as string));
      }

      // Else, last fieldset was submitted with no 'redirect to fieldset' param
      return res.redirect(307, `http://localhost:3000/form-completed`);

    case'GET':
      if (!session.fieldsetName) session.fieldsetName = fieldsetName ?? CONTACT_INFO_SYMBOL;
      await session.save();
      return res.status(200).json({fieldsetName: nextFieldsetName || fieldsetName, user});

    case 'PUT':
    case 'DELETE':
    default:
      throw new Error('Only "POST", and "PUT", request methods are supported');
  }
}
