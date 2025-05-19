export interface LoginResponse {
  session: Session;
  mfa: MfaData | null;
}

export interface Session {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenId: string;
  user: User;
}

export interface User {
  id: string;
  createdAt: string; // ISO timestamp
  displayName: string;
  avatarUrl: string;
  locale: string;
  email: string;
  isAnonymous: boolean;
  defaultRole: string;
  metadata: Record<string, unknown>;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  activeMfaType: string | null;
  roles: string[];
  "super-admin": unknown | null; // property name with hyphen must be quoted
}

/**
 * If you ever support MFA flows, fill this out;
 * for now it’s always null.
 */
export type MfaData = Record<string, unknown>;
