// /* eslint-disable no-console */
// import { NextApiRequest, NextApiResponse } from "next";

// import { supabase } from "@/lib/supabaseClient";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   console.log("Request received:", req.method, req.query);

//   const { userId } = req.query;

//   if (req.method === "GET") {
//     try {
//       const { data, error } = await supabase
//         .from("auth")
//         .select("users_id")
//         .eq("users_id", userId);

//       if (error) {
//         console.error("Database error:", error);

//         return res.status(500).json({ error: "Database error" });
//       }

//       if (data.length > 0) {
//         return res.status(200).json({ exists: true });
//       } else {
//         return res.status(200).json({ exists: false });
//       }
//     } catch (error) {
//       console.error("Server error:", error);

//       return res.status(500).json({ error: "Server error" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
