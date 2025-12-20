// app/utils/otpStore.ts

export type OTPRecord = {
  otp: string;
  expiresAt: number;
};

export const otpStore: Record<string, OTPRecord> = {};