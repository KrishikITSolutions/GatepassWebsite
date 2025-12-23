
//import Twilio from "twilio";
const Twilio = require("twilio");
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendOtpSMS(phone: string, otp: string) {
  try {
    const toNumber = `+91${phone.trim()}`; // E.164 format
    const fromNumber = process.env.TWILIO_PHONE_NUMBER!.replace(/[\u202A-\u202E]/g, "").trim();

    console.log("Sending OTP:", { from: fromNumber, to: toNumber, otp });

    const message = await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: `Your OTP is ${otp}. It is valid for 60 seconds.`,
    });

    console.log("Twilio message SID:", message.sid);
    return true;
  } catch (err: any) {
    console.error("Twilio send error:", err.code, err.message);
    return false;
  }
}
