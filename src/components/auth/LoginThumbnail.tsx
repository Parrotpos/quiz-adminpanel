import React from "react";

const LoginThumbnail = () => {
  return (
    <div className="hidden md:block">
      <div className="relative min-h-[400px] w-full min-w-[350px] max-h-screen rounded-2xl overflow-hidden">
        <img
          src="/images/login-bg-image.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6 text-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-[125px] mb-6 mt-24"
          />
          <div className="text-2xl">Login to</div>
          <div className="text-2xl">
            Your <span className="text-[#8ABB2A]">Quiz Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginThumbnail;
