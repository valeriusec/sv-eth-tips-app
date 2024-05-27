"use client";

import React from "react";
import { PageLayout } from "../common/PageLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { contractAddressConstant, contractCodeString, techs } from "@/utils/constants";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

const HowItWorks = () => {
    const theme = useTheme();
    const [codeTheme, setCodeTheme] = React.useState<any>(null);
  
    React.useEffect(() => {
      if (theme.theme === "dark") {
        setCodeTheme(oneDark);
      } else if (
        (theme.systemTheme === "dark" && theme.theme === "system") ||
        theme.theme === "dark"
      ) {
        setCodeTheme(oneDark);
      } else {
        setCodeTheme(materialLight);
      }
    }, [theme]);

  return (
    <PageLayout className="items-center">
      <div className="default-container w-full flex flex-col bg-transparent border-none">
        <h2 className="font-extrabold">How It Works</h2>
      </div>
      <div className="default-container max-w-screen-xl">
        <blockquote className="text-center">
          "This is a decentralized application (DApp) built on the{" "}
          <strong className="text-primary">Ethereum </strong>
          blockchain, currently deployed on the
          <strong className="text-primary"> Sepolia</strong> testnet. The
          application allows users to send tips to the contract owner.
          <br />
          <br />
          Users can connect their MetaMask wallet, specify a tip amount, enter
          their name and a message, and sign the transaction via MetaMask.
          <br />
          <br />
          The contract owner can withdraw the funds from the contract at any
          time."
        </blockquote>
        <h3>Features</h3>
        <div className="default-container bg-background p-2 sm:p-4">
          <ul className="list-disc p-2 sm:p-4 flex flex-col gap-4 ml-4 sm:ml-0">
            <li>
              <strong className="text-primary">Connect MetaMask Wallet:</strong>{" "}
              Users can connect their MetaMask wallet to interact with the DApp.
            </li>
            <li>
              <strong className="text-primary">Send Tips:</strong> Users can
              specify an amount, enter their name and a message, and send a tip
              to the contract owner.
            </li>
            <li>
              <strong className="text-primary">View Tips:</strong> Tips are
              directly fetched from the blockchain and displayed in the app.
            </li>
            <li>
              <strong className="text-primary">Withdraw Funds:</strong> The
              contract owner can withdraw the collected tips from the contract.
            </li>
          </ul>
        </div>
        <h3>Built With</h3>
        <div className="default-container flex-row bg-transparent border-none flex-wrap">
          {techs.map((tech: {name: string; logo: string;}, index: any) => (
            <div
              key={index}
              className="default-container bg-background border-primary gap-2 w-[150px]"
            >
              <div className="bg-primary w-[64px] h-[64px] rounded-full flex justify-center items-center">
                <Image width={48} height={48} alt={tech.name} src={tech.logo} className="rounded-full"/>
              </div>
              <span className="font-bold text-md">{tech.name}</span>
            </div>
          ))}
        </div>
        <Separator className="w-full bg-primary"/>
        <h3>Smart Contract</h3>
        <Link className="font-bold text-primary underline" href={`https://sepolia.etherscan.io/address/${contractAddressConstant}`}>
            Block Explorer
        </Link>
        <p className="break-all text-center">
            {contractAddressConstant}
        </p>
        {codeTheme === null ? 
        <Skeleton className="w-full h-[300px]"/>
        : 
        <SyntaxHighlighter
          className="w-full"
          wrapLines={true}
          language="solidity"
          style={codeTheme}
        >
          {contractCodeString}
        </SyntaxHighlighter>
        }
      </div>
    </PageLayout>
  );
};

export default HowItWorks;
