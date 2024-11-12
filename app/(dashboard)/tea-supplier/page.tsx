import { redirect } from "next/navigation";

export default async function TeaSupplierPage() {
  redirect("/tea-supplier/dashboard");

  return null;
}
