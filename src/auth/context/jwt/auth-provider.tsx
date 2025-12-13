"use client";

import { useMemo, useEffect, useCallback, useState } from "react";

import { AuthContext } from "../auth-context";
import { getSession } from "./utils";
import { apiClient } from "@/utils/server/client-api";
import axiosInstance from "@/utils/server/axios";

// ----------------------------------------------------------------------

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
