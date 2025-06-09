"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function SocialSecurityPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to services page with social security filter
    router.push("/services?category=social-security");
  }, [router]);

  return <LoadingSpinner />;
}
