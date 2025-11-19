 "use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "../shared/input/InputField";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DEFAULT_CHANNEL = "Quiz";
const DEFAULT_UID = "0";

const AgoraStreamDialog = () => {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerSecret, setCustomerSecret] = useState("");
  const [appId, setAppId] = useState("");
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setCustomerId("");
    setCustomerSecret("");
    setAppId("");
    setStreamKey(null);
    setLoading(false);
  };

  const handleGetStreamKey = async () => {
    if (!customerId || !customerSecret || !appId) {
      toast.error("Please enter Customer ID, Customer Secret and App ID.");
      return;
    }
 console.log("appId 11111", appId);
    const basicToken = btoa(`${customerId}:${customerSecret}`);

    setLoading(true);
    setStreamKey(null);
 console.log("basicToken 11111", basicToken);
    try {
     console.log("basicToken 2222", basicToken);
      const response = await fetch(
        `https://api.agora.io/ap/v1/projects/${appId}/rtls/ingress/streamkeys`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            settings: {
              channel: DEFAULT_CHANNEL,
              uid: DEFAULT_UID,
              expiresAfter: 0,
            },
          }),
        }
      );
console.log("Response //////", response);
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Failed to create stream key.");
      }

      const data = await response.json();
      console.log("Data //////", data);
      const key = data?.data?.streamkeys?.[0]?.value;

      if (!key) {
        throw new Error("Stream key not found in response.");
      }

      setStreamKey(key);
      toast.success("Stream key generated.");
    } catch (error: any) {
      toast.error(error?.message || "Unable to generate stream key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = async () => {
    if (!streamKey) return;
    await navigator.clipboard.writeText(streamKey);
    toast.success("Stream key copied.");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetState();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          <span>Agora Stream</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Agora Stream Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <InputField
            id="customerId"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <InputField
            id="customerSecret"
            placeholder="Customer Secret"
            value={customerSecret}
            onChange={(e) => setCustomerSecret(e.target.value)}
          />
          <InputField
            id="appId"
            placeholder="App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
          <Button className="w-full" onClick={handleGetStreamKey} disabled={loading}>
            {loading ? "Generating..." : "Get Stream Key"}
          </Button>
          {streamKey && (
            <div className="rounded-md border border-dashed border-gray-300 p-3 flex items-center justify-between gap-3">
              <span className="text-sm break-all flex-1">{streamKey}</span>
              <Button variant="outline" size="sm" onClick={handleCopyKey}>
                Copy Key
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgoraStreamDialog;