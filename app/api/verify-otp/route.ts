import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { otpStore } from "@/app/utils/otpStore";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    const formattedPhone = `91${phone}`;

    // ===== OTP CHECK =====
    const record = otpStore[formattedPhone];
    if (
      !record ||
      record.otp !== code ||
      Date.now() > record.expiresAt
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    // Destroy OTP
    delete otpStore[formattedPhone];

    // ===== FETCH RESIDENT =====
    const { data: resident } = await supabase
      .from("resident_profiles")
      .select(
        "resident_id, first_name, phone_number, website_access, society_id"
      )
      .eq("phone_number", formattedPhone)
      .maybeSingle();

    if (!resident) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ===== RWA → SINGLE SESSION =====
    if (resident.website_access === "rwa") {
      await supabase
        .from("website_sessions")
        .delete()
        .eq("resident_id", resident.resident_id);
    }

    // ===== CREATE SESSION =====
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await supabase.from("website_sessions").insert({
      resident_id: resident.resident_id,
      full_name: resident.first_name,
      phone_number: formattedPhone,
      website_access: resident.website_access,
      society_id:
        resident.website_access === "admin"
          ? null
          : resident.society_id,
      session_token: sessionToken,
      expires_at: expiresAt,
    });

    // ===== RESPONSE + COOKIE =====
    const res = NextResponse.json({
      success: true,
      role: resident.website_access,
      society_id:
        resident.website_access === "admin"
          ? "ALL"
          : resident.society_id,
    });

    res.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });

    return res;

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
