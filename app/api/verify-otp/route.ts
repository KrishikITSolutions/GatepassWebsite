import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";

export async function POST(req: Request) {
  try {
    const { phone, code, device_token } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ success: false, message: "Phone and OTP required", status: 400 });
    }

    const formattedPhone = `91${phone.trim()}`;
    console.log("Verify OTP request:", { phone: formattedPhone, code });

    // 1️. Check resident
    const { data: resident } = await supabase
      .from("resident_profiles")
      .select("id, first_name, website_access, gatepass_id")
      .eq("phone_number", formattedPhone)
      .maybeSingle();

    if (!resident) {
      return NextResponse.json({ success: false, message: "User not registered. Please contact admin", status: 404 });
    }

    if (!["admin", "rwa"].includes(resident.website_access)) {
      return NextResponse.json({ success: false, message: "You do not have permission to access this panel", status: 403 });
    }

    // 2️. OTP verification
    // Here, just simulate verification (in real app, compare with Twilio OTP)
    if (code.length !== 6) {
      return NextResponse.json({ success: false, message: "Invalid OTP", status: 400 });
    }

    console.log("✅ OTP verified for", formattedPhone);

    // 3️.Insert login record
    const insertResult = await supabase.from("website_login").insert({
      resident_id: resident.id,
      first_name: resident.first_name,
      website_access: resident.website_access,
      gatepass_id: resident.gatepass_id,
      phone_number: formattedPhone,
      device_token: device_token || null,
      created_at: new Date(),
    });

    if (insertResult.error) {
      console.error("❌ Error inserting login record:", insertResult.error);
      return NextResponse.json({ success: false, message: "Server error. Try again", status: 500 });
    }

    // 4. Return success
    return NextResponse.json({
      success: true,
      message: "Login successful. Redirecting to dashboard…",
      role: resident.website_access,
    });

  } catch (err) {
    console.error(" Verify OTP error:", err);
    return NextResponse.json({ success: false, message: "Server error. Try again", status: 500 });
  }
}
