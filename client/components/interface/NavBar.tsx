import Logo from "@/components/common/Logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <nav
      className={`flex w-full items-center justify-between py-2 px-2 sm:px-4 bg-background fixed top-0 z-50`}
    >
      <Logo />
      <div className="flex gap-2">
        <Link target="_blank" href="" className="h-10 flex justify-center items-center rounded-md w-10 bg-primary border border-border">
            <Image src="/images/github.svg" alt="Github Logo" width={24} height={24} />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
