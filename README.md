# ETH Tips - Buy Me A Coffee

ETH Tips - Buy Me A Coffee is a decentralized application (DApp) built on the Ethereum blockchain, currently deployed on the Sepolia testnet. The application allows users to send tips to the contract owner.

Users can connect their MetaMask wallet, specify a tip amount, enter their name and a message, and sign the transaction via MetaMask.

The contract owner can withdraw the funds from the contract at any time.

## Features

- **Connect MetaMask Wallet**: Users can connect their MetaMask wallet to interact with the DApp.
- **Send Tips**: Users can specify an amount, enter their name and a message, and send a tip to the contract owner.
- **View Tips**: Tips are directly fetched from the blockchain and displayed in the app.
- **Withdraw Funds**: The contract owner can withdraw the collected tips from the contract.

## Technologies Used

- Next.js
- Solidity
- Hardhat
- Ethers.js
- ShadcnUI
- Tailwind CSS

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory with the following variables:
   - `SEPOLIA_URL` (ex: https://eth-sepolia.g.alchemy.com/v2/<api-key> from Alchemy)
   - `SEPOLIA_API_KEY`: `<api-key>`
   - `PRIVATE_KEY`: (private key of the wallet deploying the contract)
   **Note**: Ensure not to share your `.env` file containing sensitive information.
4. Run the project using `npm run dev`.
5. Access the application at `http://localhost:3000`.

## Deployment

This application is currently deployed on the Sepolia testnet. For deployment to the mainnet or any other network, follow the deployment instructions provided in the project.

To deploy the contract using Hardhat:

1. Update the `hardhat.config.js` file with your network settings.
2. Run `npx hardhat compile` to compile the contracts.
3. Run `npx hardhat deploy --network <network-name>` to deploy the contracts to the specified network.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```

Make sure to include a `.gitignore` file in your project directory with entries for `.env` and any other sensitive files that should not be shared publicly.