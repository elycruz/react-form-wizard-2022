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

const newUser = () => ({
  id: -1,
  visitCount: 0,
  intakeForm: {}
})

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next(),
    session = await getIronSession(req, res, sessionConfig),
    newNextUrl = req.nextUrl.clone(),
    {protocol, host} = newNextUrl;

  let {user} = session;
  const isEmptyUser = !user;

  if (isEmptyUser) {
    session.user =
      user = newUser();
  }

  user.visitCount += 1;
  await session.save();

  if (req.nextUrl.pathname !== '/' && isEmptyUser) {
    const redirectUrl = `${protocol}//${host}/`;
    console.log(`Redirecting to ${redirectUrl}, from middle`);
    return NextResponse.redirect(redirectUrl, 307);
  }

  return res;
};

export const config = {
  matcher: ['/api/:path*', '/(contact-info|name|other|address)*']
};
