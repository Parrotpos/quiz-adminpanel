"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Participant {
  userId: string;
  username: string;
  email: string;
  phone: string;
  pic: string;
  scored: number;
  usedLives: number;
  win: string;
  joinedAt: string;
  lastQuestionId: string;
  lastAnswer: number;
  lastTransactionTotal: number;
  lastPaymentCount: number;
  lastReferralCount: number;
}

type SortField =
  | "username"
  | "scored"
  | "phone"
  | "lastTransactionTotal"
  | "lastPaymentCount"
  | "lastReferralCount";
type SortDirection = "asc" | "desc";

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface WinnerSelectionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizId: string;
  onWinnersSelected: (winnerIds: string[]) => void;
}

export default function WinnerSelectionPopup({
  open,
  onOpenChange,
  quizId,
  onWinnersSelected,
}: WinnerSelectionPopupProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "username",
    direction: "asc",
  });

  // Dummy data for now - you can uncomment the API call later
  const dummyParticipants: Participant[] = [
    {
      userId: "7198339",
      username: "ROMIL",
      email: "romilsaptestl239@gmail.com",
      phone: "", // API response shows no phone for this user
      pic: "https://parrotpostoss.blob.core.windows.net/images/tdmginez1baafc1.png",
      scored: 0,
      usedLives: 0,
      win: "",
      joinedAt: "2025-10-06T11:04:07.798Z",
      lastQuestionId: "",
      lastAnswer: -1,
      lastTransactionTotal: 30,
      lastPaymentCount: 3,
      lastReferralCount: 0,
    },
    {
      userId: "4797798",
      username: "ROMIL",
      email: "testingromil123@gmail.com",
      phone: "8123476986",
      pic: "https://parrotpostoss.blob.core.windows.net/images/gaoffgsipfousa.png",
      scored: 0,
      usedLives: 0,
      win: "",
      joinedAt: "2025-10-06T11:04:14.942Z",
      lastQuestionId: "",
      lastAnswer: -1,
      lastTransactionTotal: 20,
      lastPaymentCount: 3,
      lastReferralCount: 0,
    },
  ];

  useEffect(() => {
    if (open) {
      fetchParticipants();
    }
  }, [open, quizId]);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      // Using the Next.js API route which can be easily switched to actual backend later
      const response = await fetch(`/api/quiz/participant/${quizId}`);
      const data = await response.json();
      console.log("data: ", data);

      // Handle the API response structure: data.data.participants or data.participants
      const participantsData =
        data.data?.participants || data.participants || [];
      setParticipants(participantsData);

      // TODO: When you're ready to use the actual backend API, uncomment this:
      // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/quiz/participant/${quizId}`);
      // const data = await response.json();
      // setParticipants(data.participants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
      // Fallback to dummy data
      setParticipants(dummyParticipants);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantSelect = (userId: string, checked: boolean) => {
    setSelectedWinners((prev) => {
      if (checked) {
        return [...prev, userId];
      } else {
        return prev.filter((id) => id !== userId);
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedWinners.length === participants.length) {
      setSelectedWinners([]);
    } else {
      setSelectedWinners(participants.map((p) => p.userId));
    }
  };

  const handleConfirmWinners = () => {
    onWinnersSelected(selectedWinners);
    onOpenChange(false);
    setSelectedWinners([]);
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortedParticipants = () => {
    const sorted = [...participants].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  };

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 font-medium text-xs uppercase tracking-wider transition-colors ${
        sortConfig.field === field
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-gray-900"
      } p-1 sm:p-2 rounded text-left w-full justify-start`}
    >
      <span className="truncate">{children}</span>
      {sortConfig.field === field ? (
        sortConfig.direction === "asc" ? (
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        )
      ) : (
        <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 opacity-30 flex-shrink-0" />
      )}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none !w-[90vw] !max-h-[90vh] !overflow-hidden !rounded-lg !p-4 !gap-2 !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle>Select Quiz Winners</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 max-w-full overflow-hidden">
          {/* Select All Checkbox */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Checkbox
              id="select-all"
              checked={
                selectedWinners.length === participants.length &&
                participants.length > 0
              }
              onCheckedChange={handleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium cursor-pointer"
            >
              Select All ({participants.length} participants)
            </label>
          </div>

          {/* Mobile scroll hint */}
          <div className="block sm:hidden text-xs text-gray-500 text-center bg-blue-50 p-2 rounded">
            👈 Swipe left to see more columns
          </div>

          {/* Participants Table */}
          <div className="flex-1 max-h-[75vh] overflow-hidden border rounded-lg shadow-sm w-full">
            {loading ? (
              <div className="text-center py-4 sm:py-8 text-sm sm:text-base">
                Loading participants...
              </div>
            ) : participants.length === 0 ? (
              <div className="text-center py-4 sm:py-8 text-gray-500 text-sm sm:text-base">
                No participants found
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <table className="w-full text-xs sm:text-sm lg:text-base min-w-[1200px] lg:min-w-[1600px] xl:min-w-[1800px]">
                  <thead className="bg-gray-50 border-b sticky top-0">
                    <tr>
                      <th className="p-2 sm:p-3 text-left w-8 sm:w-12">
                        <span className="sr-only">Select</span>
                      </th>
                      <th className="p-2 sm:p-3 text-left w-12 sm:w-16">
                        <span className="sr-only">Avatar</span>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[160px] sm:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px]">
                        <SortButton field="username">
                          <span className="hidden sm:inline">Name & Email</span>
                          <span className="sm:hidden">Name</span>
                        </SortButton>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
                        <SortButton field="phone">Phone Number</SortButton>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[60px] sm:w-24 lg:w-32 xl:w-40">
                        <SortButton field="scored">Score</SortButton>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[120px] sm:w-40 lg:w-48 xl:w-56">
                        <SortButton field="lastTransactionTotal">
                          <span className="hidden sm:inline">
                            Transaction Total
                          </span>
                          <span className="sm:hidden">Trans.</span>
                        </SortButton>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[100px] sm:w-32 lg:w-40 xl:w-48">
                        <SortButton field="lastPaymentCount">
                          <span className="hidden sm:inline">
                            Payment Count
                          </span>
                          <span className="sm:hidden">Pay.</span>
                        </SortButton>
                      </th>
                      <th className="p-2 sm:p-3 lg:p-4 text-left min-w-[100px] sm:w-32 lg:w-40 xl:w-48">
                        <SortButton field="lastReferralCount">
                          <span className="hidden sm:inline">
                            Referral Count
                          </span>
                          <span className="sm:hidden">Ref.</span>
                        </SortButton>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedParticipants().map((participant, index) => (
                      <tr
                        key={participant.userId}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          selectedWinners.includes(participant.userId)
                            ? "bg-blue-50"
                            : ""
                        } ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-2 sm:p-3">
                          <Checkbox
                            id={participant.userId}
                            checked={selectedWinners.includes(
                              participant.userId
                            )}
                            onCheckedChange={(checked) =>
                              handleParticipantSelect(
                                participant.userId,
                                checked as boolean
                              )
                            }
                          />
                        </td>
                        <td className="p-2 sm:p-3">
                          <img
                            src={participant.pic || "/images/user.jpg"}
                            alt={participant.username}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 object-cover"
                          />
                        </td>
                        <td className="p-2 sm:p-3 lg:p-4">
                          <div className="min-w-[120px] sm:min-w-[180px] lg:min-w-[220px] xl:min-w-[280px]">
                            <p className="font-semibold text-xs sm:text-sm lg:text-base text-gray-900 truncate">
                              {participant.username}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-[180px] lg:max-w-[220px] xl:max-w-[280px] hidden sm:block">
                              {participant.email}
                            </p>
                          </div>
                        </td>
                        <td
                          className={`p-2 sm:p-3 lg:p-4 font-medium text-xs sm:text-sm lg:text-base ${
                            sortConfig.field === "phone"
                              ? "bg-yellow-100 text-yellow-800"
                              : "text-gray-700"
                          }`}
                        >
                          {participant.phone || "-"}
                        </td>
                        <td className="p-2 sm:p-3 lg:p-4 font-bold text-center text-blue-600 text-sm sm:text-base lg:text-lg">
                          {participant.scored}
                        </td>
                        <td
                          className={`p-2 sm:p-3 lg:p-4 font-semibold text-center text-xs sm:text-sm lg:text-base ${
                            sortConfig.field === "lastTransactionTotal"
                              ? "bg-green-100 text-green-800"
                              : "text-green-600"
                          }`}
                        >
                          RM. {participant.lastTransactionTotal}
                        </td>
                        <td
                          className={`p-2 sm:p-3 lg:p-4 font-semibold text-center text-xs sm:text-sm lg:text-base ${
                            sortConfig.field === "lastPaymentCount"
                              ? "bg-blue-100 text-blue-800"
                              : "text-blue-600"
                          }`}
                        >
                          {participant.lastPaymentCount}
                        </td>
                        <td
                          className={`p-2 sm:p-3 lg:p-4 font-semibold text-center text-xs sm:text-sm lg:text-base ${
                            sortConfig.field === "lastReferralCount"
                              ? "bg-purple-100 text-purple-800"
                              : "text-purple-600"
                          }`}
                        >
                          {participant.lastReferralCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-3 sm:gap-0">
            <p className="text-sm text-gray-600 order-2 sm:order-1">
              {selectedWinners.length} winner(s) selected
            </p>
            <div className="flex gap-3 order-1 sm:order-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <GradientButton
                className="text-white px-4 sm:px-6 flex-1 sm:flex-none"
                onClick={handleConfirmWinners}
                disabled={selectedWinners.length === 0}
              >
                <span className="hidden sm:inline">Confirm Winners</span>
                <span className="sm:hidden">Confirm</span>
              </GradientButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
