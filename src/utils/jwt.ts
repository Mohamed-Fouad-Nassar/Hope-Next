import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextRequest } from "next/server";

export type TJwtPayload = {
  id: string;
  email: string;
  isAdmin: boolean;
  username: string;
};

export function generateJWT(payload: TJwtPayload): string {
  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(payload, privateKey, {
    expiresIn: "30d",
  });

  return token;
}

export function setCookie(jwtPayload: TJwtPayload): string {
  const token = generateJWT(jwtPayload);

  const cookie = serialize("jwtToken", token, {
    path: "/",
    // httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV !== "development",
  });

  return cookie;
}

// export function verifyJWT(request: NextRequest): TJwtPayload | null {
//   try {
//     const privateKey = process.env.JWT_SECRET as string;
//     const jwtToken = request.cookies.get("jwtToken");

//     const token = jwtToken?.value as string;
//     if (!token) return null;

//     const user = jwt.verify(token, privateKey) as TJwtPayload;
//     if (!user) return null;

//     return user;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// export function verifyJWTForAPI(request: NextRequest): TJwtPayload | null {
//   const authHeader = request.headers.get("Authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return null;
//   }
//   const token = authHeader.split(" ")[1];

//   try {
//     const user = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as TJwtPayload;

//     if (!user) return null;
//     return user;
//   } catch (err) {
//     console.error("Invalid JWT token:", err);
//     return null;
//   }
// }

export function verifyJWT(request: NextRequest): TJwtPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET as string;

    // Check the Authorization header
    const authHeader = request.headers.get("Authorization");
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      // Fallback to checking the cookie
      const jwtToken = request.cookies.get("jwtToken");
      token = jwtToken?.value;
    }

    if (!token) return null;

    const user = jwt.verify(token, privateKey) as TJwtPayload;
    return user || null;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export function verifyToken(
  token: string
): Promise<TJwtPayload> | null | TJwtPayload {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const user = jwt.verify(token, privateKey) as TJwtPayload;

    if (!user) return null;

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
// export function verifyToken(token: string): Promise<string> | string | null {
//   try {
//     const privateKey = process.env.JWT_SECRET as string;
//     const user = jwt.verify(token, privateKey) as TJwtPayload;

//     if (!user) return null;

//     return user?.id;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }
