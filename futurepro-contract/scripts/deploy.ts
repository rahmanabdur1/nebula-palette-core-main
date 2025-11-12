import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const VRF_COORDINATOR = process.env.VRF_COORDINATOR!;
  const VRF_KEY_HASH = process.env.VRF_KEY_HASH!;
  const VRF_SUBSCRIPTION_ID = BigInt(process.env.VRF_SUBSCRIPTION_ID!);
  const USDT_TOKEN = process.env.USDT_TOKEN!;
  const ADMIN_WALLET = process.env.ADMIN_WALLET!;
  const SALARY_WALLET = process.env.SALARY_WALLET!;
  const FREE_FUND_WALLET = process.env.FREE_FUND_WALLET!;

  console.log(`🚀 Deploying on network: ${hre.network.name}`);
  console.log(`Using VRF_COORDINATOR: ${VRF_COORDINATOR}`);
  console.log(`Using VRF_SUBSCRIPTION_ID: ${VRF_SUBSCRIPTION_ID}`);

  const FutureProSpace = await hre.ethers.getContractFactory("FutureProSpace");
  const fps = await FutureProSpace.deploy(
    VRF_COORDINATOR,
    VRF_KEY_HASH,
    VRF_SUBSCRIPTION_ID,
    USDT_TOKEN,
    ADMIN_WALLET,
    SALARY_WALLET,
    FREE_FUND_WALLET
  );

  await fps.deployed();
  console.log("✅ FutureProSpace deployed to:", fps.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
