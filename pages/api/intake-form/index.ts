import {sessionConfig} from "../../../middleware";
import {isset} from "../../../src/utils";
import {NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";

let _uuid = 0;

export default withIronSessionApiRoute(handleIntakeFormStart, sessionConfig);

async function handleIntakeFormStart(req, res: NextApiResponse) {
  const {session, session: {user}, query} = req;

  console.log(query);
  switch (req.method) {
    case 'GET':
      return res.status(200).json({user});
    case 'POST':
      if (!isset(user.id) || user.id < 0) {
        user.id = _uuid++;
        session.fieldsetName = 'contact-info';
        await session.save();
      }
      return res.redirect(307, '/contact-info');
    default:
      break;
  }

}
