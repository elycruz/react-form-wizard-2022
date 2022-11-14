import {withIronSessionSsr} from "iron-session/next";
import {sessionConfig} from "../middleware";

export default function IndexPage() {
  return (<form action="/api/intake-form" method="post">
    <fieldset>
      <button>Start Form</button>
    </fieldset>
  </form>)
}

// @ts-ignore
export const getServerSideProps = withIronSessionSsr(async ({req: {session}}) => {
  // @ts-ignore
  session.intakeFormStarted = false;
  return session.save().then(() => ({props: {intakeFormStarted: false}}));
}, sessionConfig);
