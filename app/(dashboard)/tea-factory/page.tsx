import { redirect } from "next/navigation";

export default async function TeaFactoryPage() {
  redirect("/tea-factory/dashboard");

  return null;
}
