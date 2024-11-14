import { NextApiRequest, NextApiResponse } from "next";

import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient({ req, res });

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await supabase
      .from("profiles_factories")
      .select(
        `factory_name, telephone, address, town, description, profile_photo, 
        factory_services(service)`,
      )
      .eq("id", user.id)
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to fetch profile data" });
    }

    const towns = await supabase.from("towns").select("*");

    if (towns.error) {
      return res.status(500).json({ error: "Failed to fetch towns" });
    }

    return res.status(200).json({
      profileData: data,
      towns: towns.data.map((t: { name: string }) => t.name),
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
