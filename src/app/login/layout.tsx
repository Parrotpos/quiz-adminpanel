"use client";

import { GuestGuard } from "@/auth/context/guard/guest-guard";
import { SplashScreen } from "@/components/loading-screen";
import { Suspense } from "react";

export default function Layout({ children }: IChildren) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <GuestGuard>{children}</GuestGuard>
    </Suspense>
  );
}
