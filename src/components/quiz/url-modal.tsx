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
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useBoolean } from "@/hooks/useBoolean";

interface UrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

// ✅ Zod schema
const urlSchema = z.object({
  app_id: z.string().min(1, "App ID is required"),
  channel_name: z.string().min(1, "Channel name is required"),
  token: z.string().min(1, "Token is required"),
  // quiz_id: z.string().min(1, "Quiz ID is required"),
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
      const response = await addUrl(id, {
        app_id: data.app_id,
        channel_name: data.channel_name,
        token: data.token,
        quiz_id: id,
      }); // Pass the new fields to backend

      if (response.status) {
        onOpenChange(false);
        toast.success(
          response.data?.message ?? "Configuration added successfully!"
        );
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
            Add Configuration!!
          </DialogTitle>
          <DialogDescription className="text-center text-black">
            Before starting the quiz, you must configure the app settings.
            Please provide the App ID, Channel Name, and Token.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="">
            <label htmlFor="app_id" className="text-xs mb-2">
              App ID
            </label>
            <Input
              id="app_id"
              placeholder="Enter App ID..."
              {...register("app_id")}
              className="h-12"
            />
            {errors.app_id && (
              <p className="text-sm text-red-500 mt-2">
                {errors.app_id.message}
              </p>
            )}
          </div>

          <div className="">
            <label htmlFor="channel_name" className="text-xs mb-2">
              Channel Name
            </label>
            <Input
              id="channel_name"
              placeholder="Enter Channel Name..."
              {...register("channel_name")}
              className="h-12"
            />
            {errors.channel_name && (
              <p className="text-sm text-red-500 mt-2">
                {errors.channel_name.message}
              </p>
            )}
          </div>

          <div className="">
            <label htmlFor="token" className="text-xs mb-2">
              Token
            </label>
            <Input
              id="token"
              placeholder="Enter Token..."
              {...register("token")}
              className="h-12"
            />
            {errors.token && (
              <p className="text-sm text-red-500 mt-2">
                {errors.token.message}
              </p>
            )}
          </div>

          {/* <div className="">
            <label htmlFor="quiz_id" className="text-xs mb-2">
              Quiz ID
            </label>
            <Input
              id="quiz_id"
              placeholder="Enter Quiz ID..."
              {...register("quiz_id")}
              className="h-12"
              defaultValue={id}
            />
            {errors.quiz_id && (
              <p className="text-sm text-red-500 mt-2">
                {errors.quiz_id.message}
              </p>
            )}
          </div> */}

          <div className="w-full flex justify-center gap-4 pt-4 px-7">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="font-bold px-8 h-11 py-5 w-1/2 text-[#0E76BC] border-2 border-[#0E76BC] hover:text-[#0E76BC]"
            >
              Cancel
            </Button>
            <GradientButton
              type="submit"
              className="w-1/2 cursor-pointer h-11"
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
