import {IntakeFormData} from "../../../src/types";
import {CONTACT_INFO_SYMBOL, CSRF_TOKEN_SYMBOL, OTHER_SYMBOL} from "../../../src/constants";
import {sessionConfig} from '../../../middleware';
import {fieldsetConfigsByName} from "../../../src/data/fieldsetConfigs";
import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";
import {storage} from '../../../server/storage';
import {v4 as uuidv4} from 'uuid';

export default withIronSessionApiRoute(intakeFormHandler, sessionConfig);

async function intakeFormHandler(req: NextApiRequest, res: NextApiResponse) {
  const {query: {params: [fieldsetName, nextFieldsetName], redirectUri = req.url}} = req,
    {[fieldsetName as string]: fieldsetConfig} = fieldsetConfigsByName;

  // If no fieldset name or config bail
  if ((!fieldsetName || !fieldsetConfig) && req.method !== 'GET') {
    return res.status(404).json({
      error: 'Endpoint not found'
    });
  }

  // Get session data
  const {session, session: {user, currIntakeForm: intakeForm = {}, csrfToken}} = req;

  // Set fieldset name (used in views)
  session.fieldsetName = nextFieldsetName || fieldsetName;

  // Parse incoming request by method
  // ----
  switch (req.method) {
    case 'PUT':
    case 'POST':

      // @todo
      // Pseudo:
      // Perform data validation
      //   If validation success set entry in memory
      //   Return CREATED status with success message
      //   If validation failed return NOT_ALLOWED response with message

      // If csrf token is not valid reset it and redirect to index page
      if (csrfToken !== req.body[CSRF_TOKEN_SYMBOL]) {
        session.csrfToken = uuidv4();
        await session.save();
        return res.redirect(307, `//${req.headers.host}/`);
      }

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
      session.csrfToken = uuidv4();

      console.log(`Saving intake form data:`, intakeForm, `\nFor user: `, user);

      await storage.put(intakeForm.id, structuredClone(intakeForm));
      await session.save();

      // Redirect, if redirect uri was supplied
      if (redirectUri && redirectUri !== req.url) {
        return res.redirect(307, (redirectUri as string));
      }

      // Else, (assumed) last fieldset was submitted with no 'redirect to fieldset' param
      return res.redirect(307, `//${req.headers.host}/form-completed`);

    case'GET':
      // Return intake form matching `id` - `id` is assumed to be the first received path param, for 'GET' request (here),.
      const _intakeForm = storage.get(fieldsetName);

      // Return intake form matching `id` if `id` is populated, else assume it is an 'index' request
      return _intakeForm ?
        res.status(200).json({
          data: _intakeForm
        }) : res.status(403).json({
          error: `Intake form with received \`id\` not found`
        });

    case 'DELETE':
    default:
      throw new Error('Only "POST", "PUT", and "GET" HTTP methods supported');
  }
}
