import {sessionConfig} from "../../../middleware";
import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";

// Pseudo uuid value (used to designate user IDs).
let _uuid = 0;

// Ensure session property is attached to api request object
export default withIronSessionApiRoute(handleIntakeFormStart, sessionConfig);

/**
 * Handles '/api/intake-form' route.
 */
async function handleIntakeFormStart(req: NextApiRequest, res: NextApiResponse) {
  const {session, session: {user, fieldsetName}} = req;

  // Parse request by method
  switch (req.method) {

    // Fetch current snapshot of user data
    case 'GET':
      session.fieldsetName = fieldsetName;
      await session.save();
      return res.status(200).json({user, fieldsetName});

    // Perform "pseudo" session initialization and set our first fieldset to show and redirect to it
    case 'POST':
      user.id = _uuid++;
      console.log('uuid: ', _uuid);
      // Reset user Application State
      session.fieldsetName = 'contact-info';
      session.intakeFormStarted = true;
      user.intakeForm = {};
      await session.save();
      return res.redirect(307, 'http://localhost:3000/contact-info');

    // Return response "as is" otherwise
    default:
      return res;
  }
}
