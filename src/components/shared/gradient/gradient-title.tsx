import React from "react";

type TGradientTitleProps = {
  title: string;
  parentClass?: string;
};

const GradientTitle: React.FC<TGradientTitleProps> = ({
  title = "",
  parentClass,
}) => {
  return (
    <div
      className={`relative inline-flex items-center h-[34px] rounded-tr-[16px] rounded-br-[16px] overflow-hidden mt-6 ${parentClass}`}
    >
      <div className="w-[4px] h-[70%] rounded-br-[5px] rounded-tr-[5px] absolute left-0 bg-[linear-gradient(282.88deg,_#82C63F_25.94%,_#39B54A_90.89%)]" />
      {/* Gradient label background */}
      <div className="bg-[linear-gradient(to_left,_rgba(60,155,54,0)_0%,_rgba(60,155,54,1)_400%)] px-6 flex items-center h-full">
        <h1 className="text-[18px] font-medium text-black">{title}</h1>
      </div>
    </div>
  );
};

export default GradientTitle;
