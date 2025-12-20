import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { otpStore } from "@/app/utils/otpStore"; // temporary OTP store
import { v4 as uuidv4 } from "uuid";


import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);




export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json({ success: false, message: "Invalid phone" }, { status: 400 });
  }

  const formattedPhone = `91${phone}`;

  const { data: resident } = await supabase
    .from("resident_profiles")
    .select("resident_id, website_access, society_id")
    .eq("phone_number", formattedPhone)
    .maybeSingle();

  if (!resident) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });


  
  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[formattedPhone] = { otp, expiresAt: Date.now() + 60000 }; // 1 min expiry

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+${formattedPhone}`,
  });


  console.log(`OTP for ${formattedPhone}: ${otp}`); // replace with Twilio send

  return NextResponse.json({ success: true, message: "OTP sent" });
}
