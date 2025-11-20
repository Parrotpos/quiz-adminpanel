"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy, Trash2, Wifi } from "lucide-react";
import GradientButton from "../molecules/gradient-button/gradient-button";

const DEFAULT_CHANNEL = "Quiz";
const DEFAULT_UID = "0";
const STREAM_KEY_STORAGE_KEY = "agora_stream_key";

const AgoraStreamDialog = () => {
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerSecret, setCustomerSecret] = useState("");
  const [appId, setAppId] = useState("");
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing stream key from localStorage on component mount
  useEffect(() => {
    const savedStreamKey = localStorage.getItem(STREAM_KEY_STORAGE_KEY);
    if (savedStreamKey) {
      setStreamKey(savedStreamKey);
    }
  }, []);

  const resetFormFields = () => {
    setCustomerId("");
    setCustomerSecret("");
    setAppId("");
    setLoading(false);
  };

  const handleGetStreamKey = async () => {
    if (!customerId || !customerSecret || !appId) {
      toast.error("Please enter Customer ID, Customer Secret and App ID.");
      return;
    }
    const basicToken = btoa(`${customerId}:${customerSecret}`);

    setLoading(true);
    setStreamKey(null);
    try {
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
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Failed to create stream key.");
      }

      const data = await response.json();
      console.log("Data //////", data);

      // Extract streamKey from the response based on your API structure
      const key = data?.data?.streamKey || data?.streamKey;

      if (!key) {
        throw new Error("Stream key not found in response.");
      }

      // Store in localStorage and update state
      localStorage.setItem(STREAM_KEY_STORAGE_KEY, key);
      setStreamKey(key);

      // Clear form fields on success
      resetFormFields();

      toast.success("Stream key generated successfully!");
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
        // Don't reset stream key when dialog closes, only reset form fields
        if (!nextOpen) {
          resetFormFields();
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800">
          <Wifi className="w-4 h-4" />
          <span>Agora Stream</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md w-[95vw] max-h-[90vh] p-6 flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-center text-xl font-semibold">
            Generate Stream Key
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 text-sm">
            Configure your Agora credentials to generate a stream key.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3 overflow-y-auto flex-1 min-h-0">
          <div>
            <label
              htmlFor="customerId"
              className="text-xs mb-1 block font-medium"
            >
              Customer ID
            </label>
            <Input
              id="customerId"
              placeholder="Enter Customer ID..."
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="h-10"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="customerSecret"
              className="text-xs mb-1 block font-medium"
            >
              Customer Secret
            </label>
            <Input
              id="customerSecret"
              placeholder="Enter Customer Secret..."
              value={customerSecret}
              onChange={(e) => setCustomerSecret(e.target.value)}
              className="h-10"
              // type="password"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="appId" className="text-xs mb-1 block font-medium">
              App ID
            </label>
            <Input
              id="appId"
              placeholder="Enter App ID..."
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="h-10"
              autoComplete="off"
            />
          </div>
          <GradientButton
            onClick={handleGetStreamKey}
            loading={loading}
            disabled={loading}
            className="w-full h-10 mt-1"
          >
            {loading ? "Generating..." : "Generate Stream Key"}
          </GradientButton>
          {streamKey && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">
                  Stream Key
                </label>
                <button
                  onClick={() => {
                    setStreamKey(null);
                    localStorage.removeItem(STREAM_KEY_STORAGE_KEY);
                    toast.success("Stream key cleared.");
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                  title="Clear stream key"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={streamKey}
                  readOnly
                  className="h-9 bg-white font-mono text-xs flex-1 min-w-0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyKey}
                  className="h-9 px-2 shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-4 flex-shrink-0 border-t border-gray-200 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="font-medium px-6 h-10 text-[#0E76BC] border-2 border-[#0E76BC] hover:text-[#0E76BC] hover:bg-blue-50 min-w-[120px] mt-4"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgoraStreamDialog;
