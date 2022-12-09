/**
 * middleware.ts
 *
 * Ensures we have valid user sessions for our application routes, additionally creates initial 'user'/'UserData' struct.
 */
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getIronSession} from "iron-session/edge";
import {v4 as uuidv4} from 'uuid';

import {fieldsetsList} from "./src/data/fieldsetConfigs";

export const sessionConfig = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  ttl: 3600,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false, //process.env.NODE_ENV === "production",
  },
};

const newSessionData = () => ({
  user: {
    id: -1,
    visitCount: 0,
  },
  fieldsetName: fieldsetsList[0].name,
  currIntakeForm: {
    completed: false,
    lastCompletedFieldset: fieldsetsList[0].name
  },
});

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next(),
    session = await getIronSession(req, res, sessionConfig),
    newNextUrl = req.nextUrl.clone(),
    {protocol, host} = newNextUrl;

  let {user} = session;
  const isEmptyUser = !user;

  const newData =  newSessionData();

  if (isEmptyUser) {
    user = session.user = newData.user;
    session.fieldsetName = newData.fieldsetName;
    session.currIntakeForm = newData.currIntakeForm;
    user.id = uuidv4();
  }

  user.visitCount += 1;
  await session.save();

  if (req.nextUrl.pathname !== '/' && isEmptyUser) {
    const redirectUrl = `${protocol}//${host}/`;
    console.log(`Redirecting to ${redirectUrl}, from middleware`);
    return NextResponse.redirect(redirectUrl, 307);
  }

  return res;
};

export const config = {
  matcher: ['/api/:path*', '/(contact-info|name|other|address)*']
};
