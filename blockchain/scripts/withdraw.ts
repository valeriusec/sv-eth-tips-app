import hre from "hardhat";
import abi from "../artifacts/contracts/Tip.sol/Tip.json";

async function getBalance(provider: any, address: string) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress = "0x3E55A02Ba3a200f4C3aC19121E660ac72847280e";
  const contractABI = abi.abi;

  const provider = new hre.ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`
  );

  const signer = new hre.ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    provider
  );

  const tipContract = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "ETH"
  );
  const contractBalance = await getBalance(provider,  await tipContract.getAddress());
  console.log(
    "current balance of contract: ",
    await getBalance(provider, await tipContract.getAddress()),
    "ETH"
  );

  if(contractBalance !== "0.0") {
    console.log("Withdrawing funds...")
    const withdrawTxn = await tipContract.withdrawTips();
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
