"use client";

import { AuthGuard } from "@/auth/context/guard/auth-guard";
import QuizLayout from "@/components/layout/quiz-layout";
import { SplashScreen } from "@/components/loading-screen";
import { CONFIG } from "@/global-config";
import React, { Suspense } from "react";

export default function Layout({ children }: IChildren) {
  const skipAuth = CONFIG.skip_auth;

  if (skipAuth) {
    return <QuizLayout>{children}</QuizLayout>;
  }

  return (
    <Suspense fallback={<SplashScreen />}>
      <AuthGuard>
        <QuizLayout>{children}</QuizLayout>
      </AuthGuard>
    </Suspense>
  );
}
