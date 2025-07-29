"use client";

import { Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import InputField from "@/components/shared/input/InputField";
import DatePicker from "@/components/shared/datepicker/DatePicker";
import RadioGroupField from "@/components/shared/radio-group/radio-group";
import TextareaField from "@/components/shared/textarea-field/textarea-field";
import ImageDropzone from "@/components/shared/dropzone/dropzone";
import AssignModeratorPopup from "./assign-moderator-popup";
import GradientTitle from "@/components/shared/gradient/gradient-title";

interface QuizDetailsProps {
  form: UseFormReturn<QuizFormValues>;
}

export function QuizDetails({ form }: QuizDetailsProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const values = watch(); // returns all current form values
  console.log("values: ", values);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <GradientTitle title="Quiz Details" />

      <div className="p-6 !h-[calc(100dvh-280px)] overflow-auto">
        <div className="mb-4">
          <ImageDropzone
            value={
              watch("image") instanceof File
                ? watch("image")
                : watch("image")
                ? `${process.env.NEXT_PUBLIC_SERVER_URL_IMAGE}${watch("image")}`
                : null
            }
            onChange={(file: File | null) => setValue("image", file)}
          />
        </div>

        <div className="mb-4">
          <InputField
            label="Quiz Title"
            id="title"
            name="title"
            register={register}
            placeholder="Enter quiz name"
            error={errors?.title?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <DatePicker
            id="date"
            label="Date"
            value={form.watch()?.date}
            setValue={form.setValue}
            error={errors?.date?.message}
          />

          <div>
            <label
              htmlFor="time"
              className="block text-[12px] font-medium text-gray-700 mb-1"
            >
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="time"
                type="time"
                {...register("time")}
                className={cn(
                  "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-[13px] h-12",
                  errors.time && "border-destructive"
                )}
              />
            </div>
            {errors.time && (
              <p className="text-xs text-destructive mt-1">
                {errors.time.message}
              </p>
            )}
          </div>
        </div>

        <div className="my-6">
          <RadioGroupField
            id="joinType"
            label=""
            value={form.watch()?.joinType}
            onChange={(val) =>
              setValue("joinType", val, {
                shouldValidate: true,
                shouldTouch: true,
                shouldDirty: true,
              })
            }
            options={[
              { label: "Unlimited Join", value: "unlimited" },
              { label: "Restrict Join", value: "restricted" },
            ]}
            error={errors?.joinType?.message ?? ""}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {values.joinType === "restricted" && (
            <div>
              <InputField
                label="Max Users"
                id="maxUsers"
                name="maxUsers"
                register={register}
                placeholder="Enter Max Users"
                error={errors?.maxUsers?.message}
              />
            </div>
          )}
          <div>
            <InputField
              label="Quiz Price"
              id="quizPrice"
              name="quizPrice"
              register={register}
              placeholder="Enter Quiz Price"
              error={errors?.quizPrice?.message}
            />
          </div>

          <div>
            <InputField
              label="Q. Countdown"
              id="questionCountdown"
              name="questionCountdown"
              register={register}
              placeholder="Enter Q. Countdown"
              error={errors?.questionCountdown?.message}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[12px] text-[#3b3a3a] mb-1">
            Assign moderator
          </label>

          <AssignModeratorPopup
            setValue={setValue}
            assignedModeratorId={watch()?.moderator}
            error={errors?.moderator?.message ?? ""}
          />
        </div>

        <div>
          <TextareaField
            id="description"
            label="Description"
            placeholder="Enter description"
            register={register}
            error={errors.description?.message}
          />
        </div>
      </div>
    </div>
  );
}
