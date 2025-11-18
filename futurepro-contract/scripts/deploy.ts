import hre, { ethers } from "hardhat"; 
import * as dotenv from "dotenv";
dotenv.config();

// Address validation function, skip VRF_KEY_HASH because it's not an address
function validateAddress(address: string, name: string) {
  if (name !== "VRF_KEY_HASH" && !ethers.utils.isAddress(address)) {
    throw new Error(`Invalid ${name}: ${address}`);
  }
}

async function main() {

  const USDT_TOKEN = process.env.USDT_TOKEN!;
  const ADMIN_WALLET = process.env.ADMIN_WALLET!;
  const SALARY_WALLET = process.env.SALARY_WALLET!;
  const FREE_FUND_WALLET = process.env.FREE_FUND_WALLET!;
  const REGISTRATION_FEE = ethers.utils.parseEther(process.env.REGISTRATION_FEE!);

  console.log(`🚀 Deploying on network: ${hre.network.name}`);

  // Validate addresses (skip VRF_KEY_HASH)

  validateAddress(USDT_TOKEN, "USDT_TOKEN");
  validateAddress(ADMIN_WALLET, "ADMIN_WALLET");
  validateAddress(SALARY_WALLET, "SALARY_WALLET");
  validateAddress(FREE_FUND_WALLET, "FREE_FUND_WALLET");

  // Deploy contract
  const FutureProSpace = await ethers.getContractFactory("FuturePro"); 
  const fps = await FutureProSpace.deploy(
   
    USDT_TOKEN,
    ADMIN_WALLET,
    SALARY_WALLET,
    FREE_FUND_WALLET,
    REGISTRATION_FEE
  );

  await fps.deployed();
  console.log("✅ FutureProSpace deployed to:", fps.address);
}

// Run the deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
