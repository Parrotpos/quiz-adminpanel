"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleX, Search } from "lucide-react";
import { getModeratorList } from "@/api-service/moderator.service";
import { ModeratorForm } from "./create-moderator";
import { UseFormSetValue } from "react-hook-form";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";

interface AssignModeratorPopupProps {
  setValue?: UseFormSetValue<QuizFormValues>;
  assignedModeratorId?: string | number;
  children?: ReactNode;
  error?: string;
}

export default function AssignModeratorPopup({
  setValue,
  assignedModeratorId,
  children,
  error,
}: AssignModeratorPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"assign" | "create">("assign");
  const [moderatorData, setModeratorData] = useState<any>([]);

  useEffect(() => {
    onload();
  }, []);

  const onload = async () => {
    const quizRes = (await getModeratorList(searchTerm)) as any;
    setModeratorData(quizRes.data?.data ?? []);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for:", searchTerm);
    onload();
  };

  const handleCreateNew = () => {
    setCurrentView("create");
  };

  const handleAssign = (userId: string) => {
    // @ts-ignore
    setValue("moderator", userId, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });

    setIsOpen(false);
  };

  const handleCancel = () => {
    onload();
    setCurrentView("assign");
  };

  const moderatorVal = useMemo(() => {
    return (
      moderatorData?.find(
        (m: any) => m?._id?.toString() === assignedModeratorId?.toString()
      )?.fullName ?? ""
    );
  }, [moderatorData, assignedModeratorId]);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        {children ? (
          children
        ) : (
          <div className="mb-4">
            <div className="flex h-12 items-center justify-between rounded-md border border-input bg-background px-3 py-3 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <span className="text-[14px]">
                {assignedModeratorId ? moderatorVal : "Select"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted-foreground"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {error && <span className="text-red-500 text-[12px]">{error}</span>}
          </div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setCurrentView("assign");
          setIsOpen(open);
        }}
      >
        <DialogContent
          className={
            currentView === "assign"
              ? "min-w-3xl max-w-3xl max-h-[600px] px-5 py-10"
              : "min-w-lg max-w-3xl max-h-[600px] px-5 py-10"
          }
          showCloseButton={false}
        >
          <div
            className={
              currentView === "assign"
                ? "flex justify-between"
                : "flex justify-center"
            }
          >
            <div className="px-6 font-semibold text-2xl">
              {currentView === "assign"
                ? "Assign Moderator"
                : "Create New Moderator"}
            </div>
            {currentView === "assign" && (
              <CircleX
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setCurrentView("assign");
                  setIsOpen(false);
                }}
              />
            )}
          </div>
          {currentView === "assign" ? (
            <div className="px-6 py-4">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-[42px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchTerm.trim() !== "") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <GradientButton
                  fromGradient="from-[#71D561]"
                  toGradient="to-[#00A32E]"
                  onClick={handleSearch}
                  className="text-white px-6"
                >
                  Search
                </GradientButton>
                <GradientButton
                  onClick={handleCreateNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                >
                  Create New
                </GradientButton>
              </div>

              <div className="max-h-80 overflow-y-auto">
                <div className="space-y-1">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                      <tbody className="divide-y divide-gray-200">
                        {moderatorData.length > 0 &&
                          moderatorData?.map((user: any) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">{user.fullName}</td>
                              <td className="px-6 py-4">{user.email}</td>
                              {setValue && (
                                <td className={`px-6 py-4 flex justify-end`}>
                                  <label className="flex items-center space-x-3">
                                    <span className="text-sm font-semibold">
                                      Assign
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 rounded-md border-2 border-green-500 text-green-600 focus:ring-0"
                                      onChange={() => handleAssign(user._id)}
                                      checked={assignedModeratorId === user._id}
                                    />
                                  </label>
                                </td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ModeratorForm onCancel={handleCancel} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
