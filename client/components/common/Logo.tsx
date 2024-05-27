"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";

const Logo = () => {
  const theme = useTheme();
  const [currentLogo, setCurrentLogo] = useState<string>("");

  useEffect(() => {
    if (theme.theme === "dark") {
      setCurrentLogo("/logo/svg/logo-sv-light.svg");
    } else if (
      (theme.systemTheme === "dark" && theme.theme === "system") ||
      theme.theme === "dark"
    ) {
      setCurrentLogo("/logo/svg/logo-sv-light.svg");
    } else {
      setCurrentLogo("/logo/svg/logo-sv-dark.svg");
    }
  }, [theme]);

  return (
    <div className="h-full md:w-fit flex items-center">
      <Link aria-label="Home Page" className="flex items-center" href={`/`}>
        {currentLogo !== "" ? (
            <div className="flex gap-2 items-center">
                <Image
                  height={40}
                  width={90}
                  alt="Sithakol Logo"
                  src={currentLogo}
                />
                <Separator orientation="vertical" className="bg-foreground h-[30px]"/>
                <span className="font-medium text-md text-primary">Tips</span>
            </div>
        ) : (
          <Skeleton className="w-[140px] h-[40px]" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
