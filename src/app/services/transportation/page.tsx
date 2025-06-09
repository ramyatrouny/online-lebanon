"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function TransportationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to services page with transportation filter
    router.push("/services?category=transportation");
  }, [router]);

  return <LoadingSpinner />;
}
