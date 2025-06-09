"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CivilRegistryPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to services page with civil registry filter
    router.push("/services?category=civil-registry");
  }, [router]);

  return <LoadingSpinner />;
}
