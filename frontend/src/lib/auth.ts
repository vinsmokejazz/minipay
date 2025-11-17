import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";

const defaultCookieOptions: Cookies.CookieAttributes = {
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  expires: 1, // one day
};

export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_KEY, token, defaultCookieOptions);
}

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function clearAccessToken() {
  Cookies.remove(ACCESS_TOKEN_KEY, defaultCookieOptions);
}

