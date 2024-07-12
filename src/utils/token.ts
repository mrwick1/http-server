import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Replace with your secret key

interface TokenPayload {
  userId: string;
  expiresAt?: number;
}

export const createToken = (payload: TokenPayload): string => {
  if (!payload.expiresAt) {
    payload.expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour
  }
  const header = {
    alg: "HS256", // Algorithm used for hashing (HMAC with SHA-256)
    typ: "JWT", // Type of token
  };

  // Encode header and payload
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64"
  );

  // Create signature
  const signature = CryptoJS.HmacSHA256(
    `${encodedHeader}.${encodedPayload}`,
    SECRET_KEY
  ).toString(CryptoJS.enc.Base64);

  // Combine all parts to form JWT
  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
  return jwt;
};

export const verifyToken = (token: string): TokenPayload | null => {
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  // Recreate signature and compare
  const recreatedSignature = CryptoJS.HmacSHA256(
    `${encodedHeader}.${encodedPayload}`,
    SECRET_KEY
  ).toString(CryptoJS.enc.Base64);
  if (signature !== recreatedSignature) {
    return null; // Invalid token if signatures do not match
  }

  // Decode payload
  const decodedPayload = Buffer.from(encodedPayload, "base64").toString(
    "utf-8"
  );
  const payload: TokenPayload = JSON.parse(decodedPayload);

  // Check expiration
  if (payload.expiresAt! < Date.now()) {
    return null; // Token expired
  }

  return payload;
};
