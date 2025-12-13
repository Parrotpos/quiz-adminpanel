import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// Optional: put your server URL here
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket connected");
        setConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const emit = (event: string, payload?: any) => {
    socketRef.current?.emit(event, payload);
  };

  const emitWithAck = <T = any>(event: string, payload?: any): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) return reject("No socket connection");
      socketRef.current.emit(event, payload, (response: T) => {
        resolve(response);
      });
    });
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback);
  };

  const once = (event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.once(event, callback);
  };

  const off = (event: string, callback?: (...args: any[]) => void) => {
    if (!socketRef.current) return;
    if (callback) {
      socketRef.current.off(event, callback);
    } else {
      socketRef.current.removeAllListeners(event);
    }
  };

  return {
    socket: socketRef.current,
    connected,
    emit,
    emitWithAck,
    on,
    off,
    once
  };
};
