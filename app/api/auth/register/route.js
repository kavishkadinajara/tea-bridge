/* eslint-disable no-console */
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const { userId, userType, userName, password } = await request.json();

    // validate email and password
    const hashedPassword = await hash(password, 10);

    const response = await query({
      query:
        "INSERT INTO auth (users_id, user_name, user_type, password) VALUES (?, ?, ?, ?)",
      values: [userId, userType, userName, hashedPassword],
    });

    console.log(response);

    const result = {
      insertId: response.insertId,
      affectedRows: response.affectedRows,
    };

    console.log(result);

    return NextResponse.json({ message: "success", ...result });
  } catch (e) {
    console.log({ e });

    return NextResponse.json({ message: '"error"' });
  }
}
