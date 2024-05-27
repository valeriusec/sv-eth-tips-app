import { socials } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full flex h-[400px] default-container bg-accent rounded-b-none text-primary-foreground">
      <div className="flex flex-col items-center justify-center gap-2">
        <h4>Built by:</h4>
        <div className="rounded-full h-[100px] w-[100] bg-[#131217] flex justify-center items-center">
          <Image
            className="rounded-full"
            src="/logo/svg/logo-sv-light.svg"
            alt="SV Logo"
            width={100}
            height={100}
          />
        </div>
        <p>valeriu.secrieru19@gmail.com</p>
        <div className="w-full flex justify-center items-center gap-2">
          {socials.map((social) => (
            <div key={social.name}>
              <Link target="_blank" href={social.link} className="flex justify-center w-[48] h-[48] bg-[#fff] rounded-full items-center p-2">
                <Image
                  src={social.logo}
                  alt={social.name}
                  width={48}
                  height={48}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
