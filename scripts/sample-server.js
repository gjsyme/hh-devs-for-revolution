const hre = require("hardhat");
const buildDevFromArray = require('./build-dev-from-array');
const http = require('http');
const url = require('url');

const PORT = 8545;
const HOST = '127.0.0.1';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  console.log('hardhat compile step');
  await hre.run('compile');
  console.log('hardhat compile completed\n');

  // We get the contract to deploy
  const Dev = await hre.ethers.getContractFactory("Dev");
  const dev = await Dev.deploy();
  // and deploy the contract
  await dev.deployed();

  // now stand up the barest bones server to answer queries about devs
  http.createServer( async (req,res) => {
    const requestUrl = url.parse(req.url,true);
    // invalid out anything other than '/' with a query of id=x (where 0<x<8001)
    if(!requestUrl.search || requestUrl.pathname!=='/' || !requestUrl.query?.id){
      console.log('failing request');
      console.log(requestUrl);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write("invalid URL: use localhost:8545/?id=x where 0<x<8001");
      res.end()
    }else{
      const tokenId = requestUrl.query.id;
      // we are valid, so we look up our dev based upon that id query
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
      
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(buildDevFromArray(tokenId,devArray)));
      res.end();
    }
  }).listen(PORT,HOST);

  // up and running
  console.log(`Devs for Revolution data server listening at ${HOST}:${PORT}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// have to manually kill the server to end it
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });