import React from "react";
import Login from "@/screens/Login";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Sign in | ${CONFIG.appName}` };

export default function Page() {
  return <Login isAdmin={true}/>;
}
