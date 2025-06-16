"use client";

import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { CircleX } from "lucide-react";
interface WinnerPopupProps {
  children?: ReactNode;
  winnerList: any[];
}

export default function WinnerPopup({
  children,
  winnerList,
}: WinnerPopupProps) {
  console.log("winnerList: ", winnerList);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (winnerList?.length) setIsOpen(true);
  }, [winnerList]);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children && children}</div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            router.push(paths.quiz_management.root);
          }
        }}
      >
        <DialogContent
          className={"min-w-3xl max-w-3xl max-h-[600px] px-5 py-10"}
          showCloseButton={false}
        >
          <div className={"flex justify-between"}>
            <DialogTitle className="px-6 font-semibold text-2xl">
              Quiz Winners
            </DialogTitle>
            <CircleX
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                router.push(paths.quiz_management.root);
              }}
            />
          </div>
          <div className="px-6 py-4">
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-1">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-200">
                      {winnerList.length > 0 &&
                        winnerList?.map((user: any, index: number) => (
                          <tr
                            key={user?._id || index}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img
                                  key={user.userId}
                                  src={user.pic || "/images/user.jpg"}
                                  alt={user.username}
                                  className="w-6 h-6 rounded-full border-2 border-white"
                                />
                                <div className="text-black ml-2">
                                  {user.username}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold">Price Amt: </span>
                              <span className="font-semibold text-transparent bg-gradient-to-b from-[#8ABB2A] to-[#3C9B36] bg-clip-text">
                                {user.quizPrice}RM 10
                              </span>
                            </td>
                            <td className={`px-6 py-4 flex font-semibold`}>
                              {user.scored}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
