// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const buildDevFromArray = require('./build-dev-from-array');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run('compile');

  // We get the contract to deploy
  const Dev = await hre.ethers.getContractFactory("Dev");
  const dev = await Dev.deploy();

  await dev.deployed();

  // note that it's running 1-8000. Other inputs will give results but they're bad.
  for(let tokenId=1; tokenId<8001; tokenId++){
    const devArray = await Promise.all([
      dev.getOS(tokenId),
      dev.getTextEditor(tokenId),
      dev.getClothing(tokenId),
      dev.getLanguage(tokenId),
      dev.getIndustry(tokenId),
      dev.getLocation(tokenId),
      dev.getMind(tokenId),
      dev.getVibe(tokenId)
    ]);
    const developer = buildDevFromArray(tokenId,devArray);
    console.log(`${tokenId===1 ? '[\n' : ''}${JSON.stringify(developer)}${tokenId<8000 ? ',' : '\n]'}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
