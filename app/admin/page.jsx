"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  router.push("/");

  return <div>page</div>;
}
