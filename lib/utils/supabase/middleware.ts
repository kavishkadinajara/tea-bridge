/* eslint-disable no-console */
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // Refresh session if expired - required for Server Components
    const { data } = await supabase.auth.getUser();

    // Route to `/auth` if no user and trying to access `/dashboard` or `/my_dashboard`
    if (
      request.nextUrl.pathname.startsWith("/tea-factory/dashboard") ||
      request.nextUrl.pathname.startsWith("/tea-supplier/dashboard")
    ) {
      if (!data.user) {
        const url = request.nextUrl.clone();

        url.pathname = "/auth";

        return NextResponse.redirect(url);
      }
    }

    // Check `userType` and redirect accordingly when on `/auth` or `/dashboard`/`/my_dashboard`
    if (data.user) {
      const userType = data.user.user_metadata?.userType || "";
      const url = request.nextUrl.clone();

      // Redirect to `/my_dashboard` if `userType` is "tea_supplier", otherwise `/dashboard`
      if (request.nextUrl.pathname.startsWith("/auth")) {
        url.pathname =
          userType === "tea_supplier"
            ? "/tea-supplier/dashboard"
            : "/tea-factory/dashboard";

        return NextResponse.redirect(url);
      }

      // Ensure `/dashboard` redirects to `/my_dashboard` if user is `tea_supplier`
      if (
        userType === "tea_supplier" &&
        request.nextUrl.pathname === "/tea-factory/dashboard"
      ) {
        url.pathname = "/tea-supplier/dashboard";

        return NextResponse.redirect(url);
      }

      // Ensure `/my_dashboard` redirects to `/dashboard` if user is not `tea_supplier`
      if (
        userType !== "tea_supplier" &&
        request.nextUrl.pathname === "/tea-supplier/dashboard"
      ) {
        url.pathname = "/tea-factory/dashboard";

        return NextResponse.redirect(url);
      }

      // Redirect based on user type for other paths
      if (
        userType === "tea_supplier" &&
        request.nextUrl.pathname.startsWith("/tea-factory/")
      ) {
        url.pathname = "/tea-supplier/dashboard";

        return NextResponse.redirect(url);
      }

      if (
        userType === "tea_factory" &&
        request.nextUrl.pathname.startsWith("/tea-supplier/")
      ) {
        url.pathname = "/tea-factory/dashboard";

        return NextResponse.redirect(url);
      }
    }

    return response;
  } catch (error) {
    console.error("Error updating session:", error);

    return NextResponse.error();
  }
};
