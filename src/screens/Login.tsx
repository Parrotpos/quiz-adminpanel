"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import LoginThumbnail from "@/components/auth/LoginThumbnail";

const Login = ({ isAdmin }: { isAdmin?: boolean }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#f6f6f6] overflow-hidden">
      <div className="bg-[#f6f6f6] w-full">
        <Card className="w-full max-w-[800px] mx-auto border border-[#cfd4d9] shadow-DA rounded-2xl py-6">
          <CardContent className="flex gap-8">
            <LoginThumbnail />
            <LoginForm isAdmin={isAdmin}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
