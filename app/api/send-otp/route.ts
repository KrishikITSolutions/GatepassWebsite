import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { otpStore } from "@/app/utils/otpStore"; // in-memory or replace with Redis
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "Invalid phone" }, { status: 400 });
    }

    const formattedPhone = `91${phone}`;

    // Fetch user
    const { data: resident } = await supabase
      .from("resident_profiles")
      .select("resident_id, website_access, society_id")
      .eq("phone_number", formattedPhone)
      .maybeSingle();

    if (!resident) {
      return NextResponse.json({ success: false, message: "you are not a RWA member" }, { status: 404 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[formattedPhone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

    // Send via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+${formattedPhone}`,
    });

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
