import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { unlockRoom } from "@/api-service/quiz.service";
import { toast } from "sonner";
import GradientButton from "../molecules/gradient-button/gradient-button";

interface LockRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export default function LockRoomModal({
  open,
  onOpenChange,
  id,
}: LockRoomModalProps) {
  const handleUnlockRoom = async () => {
    try {
      const response = await unlockRoom(id);
      console.log("Room unlocked:", response);
      if (response.status) {
        onOpenChange(false);
        toast.success(
          response.data?.message ?? "Room lock/unlock successfully!"
        );
      } else {
        toast.error(response?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to unlock room:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[430px]" showCloseButton={false}>
        <div className="bg-white rounded-2xl max-w-md w-full text-center">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF3D0] to-transparent z-0 rounded-t-2xl" />

          {/* Lock Icon */}
          <div className="flex items-center justify-center mx-auto mb-6">
            <div className="w-28 h-2w-28 rounded-full flex items-center justify-center border-2 border-white">
              {/* <Lock className="w-6 h-6 text-gray-700" /> */}
              <img src="/images/lockIcon.png" />
            </div>
          </div>

          {/* Modal Content */}
          <DialogTitle>
            <div className="text-3xl font-bold text-gray-900 mb-3">
              You Want to lock room?
            </div>
          </DialogTitle>

          <p className="text-[13px] text-gray-600 mb-8 leading-relaxed">
            Once the room is locked, no new participants will be able to join
            this quiz. Only users who have already joined will be allowed to
            continue.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12 text-blue-600 border-[#0E76BC] hover:bg-blue-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <GradientButton
              className="flex-1 h-12"
              onClick={() => handleUnlockRoom()}
            >
              Lock Room
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
