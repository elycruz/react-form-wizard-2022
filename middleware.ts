// /middleware.ts
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getIronSession} from "iron-session/edge";

export const sessionConfig = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false, //process.env.NODE_ENV === "production",
  },
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next(),
    session = await getIronSession(req, res, sessionConfig),
    newNextUrl = req.nextUrl.clone();
  newNextUrl.pathname = '/';

  const {protocol, host, port} = newNextUrl;

  let {user} = session;

  if (req.url !== '/' && !user) return NextResponse.redirect(`${protocol}//${host}/`, 307);
  else if (!user) {
    session.user =
      user = {
        id: -1,
        visitCount: 0,
        intakeForm: null
      };
  }

  user.visitCount += 1;

  await session.save();
  return res;
};

export const config = {
  matcher: ['/api/:path*', '/(contact-info|name|other|address)*']
};
