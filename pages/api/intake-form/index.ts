/**
 * api/intake-form/index.ts
 *
 * Normalizes user session for 'intake-form' routes.
 */
import {sessionConfig} from "../../../middleware";
import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import {v4 as uuidv4} from 'uuid';

import {storage} from "../../../server/storage";

// Ensure session property is attached to api request object
export default withIronSessionApiRoute(handleIntakeFormStart, sessionConfig);

/**
 * Handles '/api/intake-form' route.
 */
async function handleIntakeFormStart(req: NextApiRequest, res: NextApiResponse) {
  const {session, session: {user, fieldsetName}} = req;

  // Parse request by method
  switch (req.method) {

    // Fetch submitted intake forms
    case 'GET':
      const out = {data: storage.getRange({}).asArray ?? []};
      console.log(`${req.url} output`, out/*, Array.from(storage.getKeys())*/);
      return res.status(200).json(out);

    // Perform "pseudo" session initialization and set our first fieldset to show and redirect to it
    case 'POST':
      const csrfToken = uuidv4();
      // Reset user Application State
      session.fieldsetName = 'contact-info';
      session.currIntakeForm = {id: uuidv4()};
      session.csrfToken = csrfToken;
      await session.save();
      return res.redirect(307, 'http://localhost:3000/contact-info');

    // Return response "as is" otherwise
    default:
      return res;
  }
}
