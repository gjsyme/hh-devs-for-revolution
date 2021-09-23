# Very brief rundown
## Minimal changes from Hardhat sample (not advanced)
Contract.sol is taken from the Etherscan of our Devs for Revolution token/NFT.

## What is this good for
[Enumeration Script](./scripts/enumeration-script.js) should print every single Dev with a convenient (or inconvenient depending on what you're trying to do) formatting to save the output as a JSON file.

[Devs Server](./scripts/devs-server.js) is the absolute most basic server that I could come up with to listen to a port and serve requests.

In both cases, running with `node scripts/SCRIPT_YOU_WANT.js` should be sufficient to execute, due to the `await hre.compile()` in both scripts to ensure that hardhat has compiled before attempting to use the contract.

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```