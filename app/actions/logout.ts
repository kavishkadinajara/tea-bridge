/* eslint-disable no-console */
import { createClient } from "@/lib/utils/supabase/server";

export const handleLogout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    window.location.href = "/auth";
  }
};
