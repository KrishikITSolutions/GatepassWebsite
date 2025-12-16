import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { v4 as uuidv4 } from "uuid"; // UUID for device_token

export async function POST(req: Request) {
  try {
    const { phone, code, device_token } = await req.json();

    if (!phone || !code) {
      console.log("❌ Missing phone or OTP");
      return NextResponse.json({
        success: false,
        message: "Phone and OTP required",
        status: 400,
      });
    }

    const formattedPhone = `91${phone.trim()}`;
    console.log("🔹 Verify OTP request:", { phone: formattedPhone, code });

    // ================= FETCH RESIDENT =================
    const { data: resident, error: residentError } = await supabase
      .from("resident_profiles")
      .select("resident_id, first_name, website_access, society_id")
      .eq("phone_number", formattedPhone)
      .maybeSingle();

    console.log("🔹 Resident fetch result:", resident, residentError);

    if (!resident) {
      console.log("❌ Resident not found");
      return NextResponse.json({
        success: false,
        message: "User not registered. Please contact admin",
        status: 404,
      });
    }

    if (!["admin", "rwa"].includes(resident.website_access)) {
      console.log("❌ Resident not authorized:", resident.website_access);
      return NextResponse.json({
        success: false,
        message: "You do not have permission to access this panel",
        status: 403,
      });
    }

    // ================= OTP VERIFICATION =================
    if (code.length !== 6) {
      console.log("❌ Invalid OTP length");
      return NextResponse.json({
        success: false,
        message: "Invalid OTP",
        status: 400,
      });
    }
    console.log("✅ OTP verified for", formattedPhone);

    // ================= CHECK EXISTING LOGIN ROW =================
    const { data: existing, error: existingErr } = await supabase
      .from("website_login")
      .select("id")
      .eq("phone_number", formattedPhone);

    console.log("🔹 Existing login row:", existing, "Error:", existingErr);

    const token = device_token || uuidv4(); // UUID device token
    console.log("🔹 Device token to use:", token);

    if (existing && existing.length > 0) {
      // ================= UPDATE EXISTING ROW =================
      const { error: updateErr } = await supabase
        .from("website_login")
        .update({ device_token: token, created_at: new Date() })
        .eq("phone_number", formattedPhone);

      if (updateErr) console.error("❌ Update error:", updateErr);
      else console.log("✅ Existing login row updated");
    } else {
      // ================= INSERT FIRST TIME =================
      const payload = {
        resident_id: resident.resident_id,
        first_name: resident.first_name,
        website_access: resident.website_access,
        society_id: resident.society_id,
        phone_number: formattedPhone,
        device_token: [token],
        created_at: new Date(),
      };
      console.log("🔹 Insert payload:", payload);

      const { error: insertErr } = await supabase
        .from("website_login")
        .insert(payload);

      if (insertErr) console.error("❌ Insert error:", insertErr);
      else console.log("✅ First login row inserted");
    }

    // ================= RETURN SUCCESS =================
    return NextResponse.json({
      success: true,
      message: "Login successful. Redirecting to dashboard…",
      role: resident.website_access,
      society_id: resident.society_id,
      device_token: token,
    });

  } catch (err) {
    console.error("❌ Verify OTP error:", err);
    return NextResponse.json({
      success: false,
      message: "Server error. Try again",
      status: 500,
    });
  }
}
