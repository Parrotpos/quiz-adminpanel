import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { paths } from "@/routes/path";
import { addUrl } from "@/api-service/quiz.service";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useBoolean } from "@/hooks/useBoolean";

interface UrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

// ✅ Zod schema
const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
});

type UrlFormData = z.infer<typeof urlSchema>;

export default function UrlModal({ open, onOpenChange, id }: UrlModalProps) {
  const router = useRouter();
  const loadingBool = useBoolean();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: UrlFormData) => {
    try {
      loadingBool.onTrue();
      const response = await addUrl(id, { videoUrl: data.url }); // Pass url to backend

      if (response.status) {
        onOpenChange(false);
        toast.success(response.data?.message ?? "URL added successfully!");
        router.push(`${paths.quiz_management.detail}/${id}`);
      } else {
        toast.error(response?.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      loadingBool.onFalse();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-10" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold mt-2">
            Add URL!!
          </DialogTitle>
          <DialogDescription className="text-center text-black">
            Before starting the quiz, you must add a TikTok or YouTube video
            URL. This video will be shown in the quiz preview inside the app.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="">
            <label htmlFor="url" className="text-xs mb-2">
              URL
            </label>
            <Input
              id="url"
              placeholder="Add URL here..."
              {...register("url")}
            />
            {errors.url && (
              <p className="text-sm text-red-500 mt-2">{errors.url.message}</p>
            )}
          </div>
          <div className="w-full flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              className="w-1/2 cursor-pointer border-[#0E76BC] text-[#0E76BC]"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              Cancel
            </Button>
            <GradientButton
              type="submit"
              className="w-1/2 cursor-pointer"
              loading={loadingBool.bool}
            >
              Save
            </GradientButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
