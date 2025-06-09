"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function TaxationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to services page with taxation filter
    router.push("/services?category=taxation");
  }, [router]);

  return <LoadingSpinner />;
}
