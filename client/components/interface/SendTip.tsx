"use client";
import React from "react";
import { PageLayout } from "../common/PageLayout";
import { Lamp } from "../ui/lamp";
import { ethers } from "ethers";

import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import abi from '@/utils/lib/Tip.json';
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { DataTable } from "../tables/data-table";
import { columns } from "../tables/columns";
import { Label } from "../ui/label";
import { contractAddressConstant } from "@/utils/constants";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter a valid name" })
    .max(50, { message: "Name max-length is 50 characters" }),
  message: z.string(),
});

const tips = ["0.0003", "0.0008", "0.001", "0.002"];

const SendTip = () => {
  const contractAddress = contractAddressConstant;
  const contractABI = abi.abi;

  const { toast } = useToast();

  const [currentAccount, setCurrentAccount] = React.useState("");
  const [memos, setMemos] = React.useState<any>([]);
  const [tipValue, setTipValue] = React.useState<string>(tips[1]);
  const [tipTracker, setTipTracker] = React.useState<boolean>(false);
  const [owner, setOwner] = React.useState("");
  const [withdrawalAddress, setWithdrawalAddress] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendTip(values.name, values.message);
    form.setValue("name", "");
    form.setValue("message", "");
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
  
      if (!ethereum) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const metamaskUrl = isMobile
          ? 'https://metamask.app.link/dapp/sv-eth-tips-app.vercel.app/'
          : 'https://metamask.io/download.html';
  
        toast({
          title: "MetaMask not found",
          description: (
            <div>
              Please install MetaMask to use this feature.
              <br />
              <a href={metamaskUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Download MetaMask
              </a>
            </div>
          ),
          duration: 5000,
          variant: "destructive",
        });
        return;
      }

      const NETWORK_ID = "11155111";
  
      if (ethereum.networkVersion !== NETWORK_ID) {
        toast({
          title: "Wrong Network",
          description: "Please connect to the Sepolia network.",
          duration: 5000,
          variant: "destructive",
        });
        return;
      }
  
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
  
      setCurrentAccount(accounts[0]);
      getOwner();
      toast({
        title: "Wallet Connected!",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error!",
        duration: 5000,
        description: (
          <Textarea disabled className="max-h-[200px] min-w-[300px]">
            {error.message}
          </Textarea>
        ),
        variant: "destructive",
      });
    }
  };
  

  const sendTip = async (name: string, message: string) => {
    try {
      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        const tipContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        toast({
          title: "Sending Tip...",
          duration: 3000,
        });
        const tipTxn = await tipContract.sendTip(
          name,
          message ? message : "Enjoy your coffee!",
          { value: ethers.parseEther(tipValue) }
        );

        await tipTxn.wait();

        toast({
          title: "Tip Sent! Thank You!",
          description: `Transaction: ${tipTxn.hash}`,
        });

        setTipTracker(!tipTracker);
      }
    } catch (error: any) {
      toast({
        title: "Error!",
        duration: 5000,
        description: (
          <Textarea disabled className="max-h-[200px] min-w-[300px]">
            {error.message}
          </Textarea>
        ),
        variant: "destructive",
      });
    }
  };

  const withdrawTips = async () => {
    if (ethers.isAddress(withdrawalAddress)) {
      try {
        const { ethereum } = window as any;

        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum, "any");
          const signer = await provider.getSigner();
          const tipContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          toast({
            title: "Withdrawing...",
            duration: 3000,
          });
          const withdrawTxn = await tipContract.withdrawTips(withdrawalAddress);

          await withdrawTxn.wait();

          toast({
            title: "Tips withdrawal successfully completed!",
            description: `Transaction: ${withdrawTxn.hash}`,
          });
        }
      } catch (error: any) {
        toast({
          title: "Error!",
          duration: 5000,
          description: (
            <Textarea disabled className="max-h-[200px] min-w-[300px]">
              {error.message}
            </Textarea>
          ),
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid Withdrawal Address!",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  const getOwner = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const tipContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const contractOwner = await tipContract.getOwner();
        setOwner(contractOwner);
        setWithdrawalAddress(contractOwner);
      } else {
        toast({
          title: "Error!",
          duration: 5000,
          description: "Couldn't get contract owner!",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error!",
        duration: 5000,
        description: (
          <Textarea disabled className="max-h-[200px] min-w-[300px]">
            {error.message}
          </Textarea>
        ),
        variant: "destructive",
      });
    }
  };

  const getMemos = async () => {
    if (currentAccount) {
      try {
        const { ethereum } = window as any;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const tipContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const memos = await tipContract.getMemos();
          console.log("MEMOS: ", memos);
          setMemos(memos);
        } else {
          toast({
            title: "Error!",
            duration: 5000,
            description: "MetaMask is not connected!",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Error! Could not get received tips.",
          duration: 5000,
          description: (
            <Textarea disabled className="max-h-[200px] min-w-[300px]">
              {error.message}
            </Textarea>
          ),
          variant: "destructive",
        });
      }
    }
  };

  React.useEffect(() => {
    let tipContract: ethers.Contract;
    getMemos();
    async () => {
      const onNewMemo = (
        from: string,
        timestamp: number,
        name: string,
        message: string
      ) => {
        setMemos((prevState: any) => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message,
            name,
          },
        ]);
      };

      const { ethereum } = window as any;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        tipContract = new ethers.Contract(contractAddress, contractABI, signer);
        tipContract.on("NewMemo", onNewMemo);
      }

      return () => {
        if (tipContract) {
          tipContract.off("NewMemo", onNewMemo);
        }
      };
    };
  }, [currentAccount, tipTracker]);

  return (
    <PageLayout className="items-center !p-0 !h-fit !min-h-fit">
      <Lamp />
      {currentAccount && (
        <div className="w-full flex justify-center items-center p-2 sm:p-4 flex-col gap-2 max-w-screen-xl">
          <span>Your Wallet Address:</span>
          <Badge>{currentAccount}</Badge>
        </div>
      )}
      <div className="w-full p-2 sm:p-4 max-w-screen-xl">
        <div className="default-container min-h-[200px]">
          {currentAccount ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-[500px] flex flex-col gap-4"
              >
                <div className="default-container flex-row gap-2 w-full">
                  {tips.map((tip, index) => (
                    <div
                      className={`bg-background font-bold text-lg h-full p-2 sm:p-4 rounded-md text-center flex-1 cursor-pointer ${
                        tip === tipValue && "border-2 border-primary"
                      }`}
                      key={index}
                      onClick={() => setTipValue(tip)}
                    >
                      {tip} ETH
                    </div>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-[250px]"
                          placeholder="Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Send Tip for {tipValue} ETH</Button>
              </form>
            </Form>
          ) : (
            <Button type="button" onClick={connectWallet}>
              Connect Your Wallet
            </Button>
          )}
        </div>
      </div>
      {currentAccount && (
        <div className="w-full p-2 sm:p-4 max-w-screen-xl">
          <div className="default-container">
            <h2 className="font-bold">Tips received</h2>
            <DataTable columns={columns} data={memos} />
          </div>
        </div>
      )}
      {currentAccount &&
        currentAccount.toLowerCase() === owner.toLowerCase() && (
          <div className="w-full p-2 sm:p-4 max-w-screen-xl">
            <div className="default-container">
              <h2 className="font-bold">Withdraw</h2>
              <div className="w-full flex flex-col gap-2 items-center">
                <Label>Withdrawal Address</Label>
                <Input
                  className="max-w-[500px]"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                />
              </div>
              <Button
                onClick={() => withdrawTips()}
                variant="default"
                type="button"
              >
                Withdraw Contract Balance
              </Button>
            </div>
          </div>
        )}
    </PageLayout>
  );
};

export default SendTip;
