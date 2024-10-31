/* eslint-disable no-console */
// /* eslint-disable no-console */

import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the HTML content from the external website
    const response = await axios.get(
      "https://historyofceylontea.com/tea-estates/estates-registry",
    );

    // Load the HTML content using cheerio
    const $ = cheerio.load(response.data);

    // Extract the town names from the select options
    const towns: string[] = [];

    $("#post-town-station option").each((_: any, element: any) => {
      const town = $(element).text().trim();

      if (town) towns.push(town);
    });

    if (towns.length > 0) {
      //res.status(200).json({ towns });
      return NextResponse.json({ towns });
    } else {
      console.warn("No towns found in the HTML content.");

      return NextResponse.json({ error: "No towns found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching towns:", error);

    // res
    //   .status(500)
    //   .json({ error: "Failed to fetch towns. Please try again later." });
    return NextResponse.json(
      { error: "Failed to fetch towns. Please try again later." },
      { status: 500 },
    );
  }
}
