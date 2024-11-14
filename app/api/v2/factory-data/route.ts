/* eslint-disable no-console */
import { NextResponse } from "next/server";

import { createClient } from "@/lib/utils/supabase/server";

export async function GET() {
  const supabase = createClient({
    /* your configuration here */
  });

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles_factories")
      .select(
        `factory_name, telephone, address, town, description, profile_photo,
        factory_services(service)`,
      )
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to fetch profile data" },
        { status: 500 },
      );
    }
    if (profileError) {
      return NextResponse.json(
        { error: "Failed to fetch profile data" },
        { status: 500 },
      );
    }

    return NextResponse.json({ profileData });
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
