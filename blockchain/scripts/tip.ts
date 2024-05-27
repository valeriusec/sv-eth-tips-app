import { BaseContractMethod } from "ethers";
import hre from "hardhat";

// Returns the Ether balance of a given address.
async function getBalance(address: string) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses: (string | BaseContractMethod<any[], any, any>)[]) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address as string));
    idx++;
  }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos: any) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const TipContract = await hre.ethers.getContractFactory("Tip");
  const tipContract = await TipContract.deploy();

  console.log("TipContract deployed to:", await tipContract.getAddress());

  // Check balances before the coffee purchase.
  const addresses = [owner.address, tipper.address, await tipContract.getAddress()];
  console.log("== start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees.
  const tip = { value: hre.ethers.parseEther("1") };
  await tipContract
    .connect(tipper)
    .sendTip("Carolina", "You're the best!", tip);
  await tipContract
    .connect(tipper2)
    .sendTip("Vitto", "Amazing teacher", tip);
  await tipContract
    .connect(tipper3)
    .sendTip("Kay", "I love my Proof of Knowledge", tip);

  // Check balances after the coffee purchase.
  console.log("== bought coffee ==");
  await printBalances(addresses);

  // Withdraw.
  await tipContract.connect(owner).withdrawTips(owner);

  // Check balances after withdrawal.
  console.log("== withdrawTips ==");
  await printBalances(addresses);

  // Check out the memos.
  console.log("== memos ==");
  const memos = await tipContract.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
