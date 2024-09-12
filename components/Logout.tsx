/* eslint-disable no-console */
import { useRouter } from "next/router";

import { createClient } from "@/lib/utils/supabase/client"; // adjust the path based on your project structure

const LogoutButton = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      // Optionally: Display an error message to the user
    } else {
      router.push("/login"); // Redirect to the login page or another page after logout
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
