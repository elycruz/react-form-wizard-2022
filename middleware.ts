// /middleware.ts
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getIronSession} from "iron-session/edge";
import {IronSession} from "iron-session";

export const getUserSession = (req: NextRequest, res: NextResponse): Promise<IronSession> => {
  return getIronSession(req, res, {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getUserSession(req, res);

  let {user} = session;

  if (!user) {
    user = {
      visitCount: 1,
      intakeForm: null
    };
  } else {
    user.visitCount += 1;
  }

  session.user = user;

  // Commit session changes:
  await session.save();

  return res;
};

export const config = {
  matcher: ['/name', '/contact-info', '/address', '/other', '/']
};
