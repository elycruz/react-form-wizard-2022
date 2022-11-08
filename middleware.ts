// /middleware.ts
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getIronSession} from "iron-session/edge";
import {IronSession} from "iron-session";

export const sessionConfig = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next(),
    session = await getIronSession(req, res, sessionConfig);
  let {user} = session;

  if (req.url !== '/' && !user) return NextResponse.redirect('/', 200);
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
  matcher: ['/name', '/contact-info', '/address', '/other', '/']
};
