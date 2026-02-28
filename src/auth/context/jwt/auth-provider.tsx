"use client";

import { useMemo, useEffect, useCallback, useState } from "react";
import { usePathname } from "next/navigation";

import { AuthContext } from "../auth-context";
import { getSession } from "./utils";
import { apiClient } from "@/utils/server/client-api";
import axiosInstance from "@/utils/server/axios";
import { paths } from "@/routes/path";

// ----------------------------------------------------------------------

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const statusRes = await apiClient("/api/auth/status");
      if (statusRes.isAuthenticated) {
        const user = statusRes?.user;
        setState({ user: { ...user }, loading: false });
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState, getSession]);

  useEffect(() => {
    // Skip session check on login pages — no cookie yet, avoids 401 in console
    const isLoginPage = pathname?.startsWith("/login");
    if (isLoginPage) {
      setState({ user: null, loading: false });
      return;
    }
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue: AuthContextValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? "admin",
          }
        : null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
