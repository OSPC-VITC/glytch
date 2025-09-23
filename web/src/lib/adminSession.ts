import crypto from "node:crypto";

const COOKIE_NAME = "admin_session";
const DEFAULT_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret(): Buffer {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return Buffer.from(secret);
}

function base64url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createAdminSessionToken(ttlMs: number = DEFAULT_TTL_MS): string {
  const exp = Date.now() + ttlMs;
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${exp}.${nonce}`;
  const h = crypto.createHmac("sha256", getSecret()).update(payload).digest();
  const sig = base64url(h);
  return `${payload}.${sig}`; // exp.nonce.sig
}

export function verifyAdminSessionToken(value: string | undefined | null): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || !nonce || !sig) return false;
  if (Date.now() > exp) return false;
  const payload = `${exp}.${nonce}`;
  const expected = base64url(crypto.createHmac("sha256", getSecret()).update(payload).digest());
  // constant-time compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const AdminSession = {
  COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminSessionToken,
};
