"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export { SuperAdminApp } from "@/components/admin/SuperAdminApp";
export { UmkmAdminApp } from "@/components/umkm/UmkmAdminApp";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return <div className="min-h-screen bg-[#f6f7f8]" />;
}
