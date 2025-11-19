"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Inter } from "next/font/google";
import { paths } from "@/routes/path";
import Image from "next/image";
import { signOut } from "@/auth/context/jwt";
import AgoraStreamDialog from "../quiz/agora-stream-dialog";

const inter = Inter({ subsets: ["latin"] });

const navigation = [
  {
    name: "Quiz Management",
    href: paths.quiz_management.root,
    icon: LayoutDashboard,
  },
];

const QuizLayout = ({ children }: IChildren) => {
  const pathname = usePathname();
  const user = {
    name: "Admin",
  };

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const hanldeLogout = useCallback(() => {
    signOut();
  }, []);

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${inter.className}`}
    >
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              {/* Drawer Trigger (for mobile only) */}
              <Drawer open={open} onOpenChange={setOpen} direction="left">
                <DrawerTrigger asChild>
                  <DrawerTitle>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DrawerTitle>
                </DrawerTrigger>
                <DrawerContent className="top-0 left-0 h-full !w-64 rounded-none border-r p-4">
                  <div className="mb-8 border-[1px] border-dotted border-green-500 rounded-md px-2 py-1">
                    <Image
                      src="/images/main-logo.png"
                      alt="Logo"
                      width={150}
                      height={150}
                      color="black"
                      className="rounded-md cursor-pointer"
                      onClick={() => router.push(paths.quiz_management.root)}
                    />
                  </div>
                  <nav className="space-y-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200`}
                          onClick={() => setOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <AgoraStreamDialog />
                  </nav>
                </DrawerContent>
              </Drawer>
              <div className="-ml-4 py-2 hidden lg:block">
                <Image
                  src="/images/main-logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  color="black"
                  className="rounded-md cursor-pointer"
                  onClick={() => router.push(paths.quiz_management.root)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 cursor-pointer"
                onClick={hanldeLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Static Sidebar on Desktop */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r p-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <AgoraStreamDialog />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 h-[calc(100vh-68px)] overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-4 py-4 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizLayout;
