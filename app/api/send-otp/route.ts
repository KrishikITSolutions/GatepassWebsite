
// import { supabase } from "@/app/utils/supabase";
// //import { sendOTP } from "@../../twilio";
// import { sendOtpSMS as sendOTP } from "@/app/utils/twilio";

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { supabase } from "@/app/utils/supabase";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);
const fromNumber = process.env.TWILIO_PHONE_NUMBER!; // e.g., +12722334437

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.length !== 10) {
      return NextResponse.json({ success: false, message: "Enter a 10-digit phone number" }, { status: 400 });
    }

    const formattedPhone = `91${phone.trim()}`;

    // 1️. DB check
    const { data: user } = await supabase
      .from("resident_profiles")
      .select("id, role, website_access")
      .eq("phone_number", formattedPhone)
      .maybeSingle();

    if (!user) {
      return NextResponse.json({ success: false, message: "User not registered. Please contact admin" }, { status: 404 });
    }

    if (!["admin", "rwa"].includes(user.website_access)) {
      return NextResponse.json({ success: false, message: "You do not have permission to access this panel" }, { status: 403 });
    }

    // 2️. Generate 4-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    // 3️. Send via Twilio
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: fromNumber,
      to: `+${formattedPhone}`,
    });

    console.log("Twilio message SID:", message.sid);

    //  Success response
    return NextResponse.json({ success: true, message: "OTP sent successfully", otp }); // optional otp log
  } catch (err) {
    console.error("Send OTP error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
