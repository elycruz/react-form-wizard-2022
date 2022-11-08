import {sessionConfig} from "../../../middleware";
import {isset} from "../../../src/utils";
import {NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";

let _uuid = 0;

export default withIronSessionApiRoute(handleIntakeFormStart, sessionConfig);

async function handleIntakeFormStart(req, res: NextApiResponse) {
  const {session, session: {user}} = req;

  if (!isset(user.id) || user.id < 0) {
    user.id = _uuid++;
    await session.save();
  }

  return res.redirect(307, '/contact-info');
}
