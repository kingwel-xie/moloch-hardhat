const {getApprovedToken, getMolochAddress} = require("../scripts/utils");
const {BigNumber} = require("ethers");

task('test-task', 'test task system')
  .setAction(async () => {

    // Make sure everything is compiled
    await run('compile')

      const [deployer] = await ethers.getSigners();

      console.log(
          "Deploying contracts with the account:",
          deployer.address
      );

      console.log("Account balance:", (await deployer.getBalance()).toString());


    console.log('testing... done!')
  })


task('recharge', 'transfer some tokens to sender1')
  .addParam('tokens', "The number of token's wei offered as tribute")
  .setAction(async ({ applicant, tokens }, hre) => {

    const token = await getApprovedToken(hre)
    if (token === undefined) {
      return
    }

    const [sender, sender1] = await hre.ethers.getSigners();

    console.log(
      "Transferring from account:",
      sender.address
    );

    console.log("Sender token balance:", (await token.balanceOf(sender.address)).toString());
    console.log("Sender1 token balance:", (await token.balanceOf(sender1.address)).toString());

    await token.transfer(sender1.address, tokens)

    console.log('... done!')
    console.log("Sender token balance:", (await token.balanceOf(sender.address)).toString());
    console.log("Sender1 token balance:", (await token.balanceOf(sender1.address)).toString());

    const IERC20 = await hre.ethers.getContractAt('IERC20', token.address, sender1)
    if (IERC20 === undefined) {
      return
    }

    const molochAddress = getMolochAddress()
    if (!molochAddress) {
      console.error(`Please, set the moloch DAO's address in config`)
      return
    }

    await IERC20.approve(molochAddress, tokens)

    // await IERC20.transfer(sender.address, BigNumber.from(tokens).div(2))
    // console.log("Sender token balance:", (await IERC20.balanceOf(sender.address)).toString());
    // console.log("Sender1 token balance:", (await IERC20.balanceOf(sender1.address)).toString());
  })

