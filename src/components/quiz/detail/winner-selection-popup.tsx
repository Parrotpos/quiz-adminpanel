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

interface Participant {
  userId: string;
  username: string;
  email: string;
  pic: string;
  score: number;
  usedLives: number;
  win: string;
  joinedAt: string;
  lastQuestionId: string;
  lastAnswer: number;
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

  // Dummy data for now - you can uncomment the API call later
  const dummyParticipants: Participant[] = [
    {
      userId: "6411989",
      username: "MAVANI",
      email: "lalaldha1789@gmail.com",
      pic: "https://parrotpostoss.blob.core.windows.net/images/no_image.svg",
      score: 8,
      usedLives: 0,
      win: "",
      joinedAt: "2025-10-01T11:59:31.704Z",
      lastQuestionId: "",
      lastAnswer: -1,
    },
    {
      userId: "6106384",
      username: "ROMIL",
      email: "romil@example.com",
      pic: "https://parrotpostoss.blob.core.windows.net/images/no_image.svg",
      score: 3,
      usedLives: 0,
      win: "100",
      joinedAt: "2025-10-01T11:59:31.704Z",
      lastQuestionId: "",
      lastAnswer: -1,
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
      setParticipants(data.data.participants || []);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Quiz Winners</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
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

          {/* Participants List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {loading ? (
              <div className="text-center py-8">Loading participants...</div>
            ) : participants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No participants found
              </div>
            ) : (
              participants.map((participant) => (
                <Card key={participant.userId} className="p-0">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={participant.userId}
                        checked={selectedWinners.includes(participant.userId)}
                        onCheckedChange={(checked) =>
                          handleParticipantSelect(
                            participant.userId,
                            checked as boolean
                          )
                        }
                      />

                      <img
                        src={participant.pic || "/images/user.jpg"}
                        alt={participant.username}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">
                              {participant.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {participant.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              Score: {participant.score}
                            </p>
                            <p className="text-xs text-gray-500">
                              Lives: {participant.usedLives}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              {selectedWinners.length} winner(s) selected
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <GradientButton
                className="text-white px-6"
                onClick={handleConfirmWinners}
                disabled={selectedWinners.length === 0}
              >
                Confirm Winners
              </GradientButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
