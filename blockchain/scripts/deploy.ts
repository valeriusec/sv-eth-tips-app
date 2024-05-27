import hre from 'hardhat';

async function main() {
    const TipContract = await hre.ethers.getContractFactory("Tip");
    const tipContract = await TipContract.deploy();

    console.log("TipContract deployed to:", await tipContract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })