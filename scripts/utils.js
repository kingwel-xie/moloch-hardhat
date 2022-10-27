const BN = require('bn.js')

// These functions are meant to be run from tasks, so the
// BuidlerRuntimeEnvironment is available in the global scope.

/**
 * Returns the deployed instance of the Moloch DAO, or undefined if its
 * address hasn't been set in the config.
 */
async function getDeployedMoloch (hre) {
  const molochAddress = getMolochAddress()
  if (!molochAddress) {
    console.error(`Please, set the moloch DAO's address in config`)
    return
  }
  const Moloch = await hre.ethers.getContractAt('Moloch', molochAddress)
  return Moloch
}

/**
 * Returns the deployed instance of the MolochPool contract, or undefined if its
 * address hasn't been set in the config.
 */
async function getDeployedPool (hre) {
  const poolAddress = getPoolAddress()
  if (!poolAddress) {
    console.error(`Please, set the Pool's address in buidler.config.js's networks.${buidlerArguments.network}.deployedContracts.pool`)
    return
  }

  const Pool = await hre.ethers.getContractAt('MolochPool', poolAddress)
  return Pool
}

/**
 * Returns the deployed instance of the Moloch DAO's approved token, or
 * undefined if the DAO's address hasn't been set in the config.
 */
async function getApprovedToken (hre) {
  const moloch = await getDeployedMoloch(hre)
  if (moloch === undefined) {
    return
  }

  const tokenAddress = await moloch.approvedToken()
  const IERC20 = await hre.ethers.getContractAt('IERC20', tokenAddress)
  return IERC20
}

/**
 * Returns the address of the Moloch DAO as set in the config, or undefined if
 * it hasn't been set.
 */
function getMolochAddress () {
  return config.networks[network.name].deployedContracts.moloch
}

/**
 * Returns the address of the MolochPool as set in the config, or undefined if
 * it hasn't been set.
 */
function getPoolAddress () {
  return config.networks[network.name].deployedContracts.pool
}

async function giveAllowance (tokenContract, allowanceGiver, receiverContract, amount) {
  return tokenContract.approve(receiverContract.address, amount, { from: allowanceGiver })
}

async function hasEnoughAllowance (tokenContract, allowanceGiver, receiverContract, amount) {
  const allowance = await tokenContract.allowance(allowanceGiver, receiverContract.address)
  return allowance.gte(amount)
}

async function hasEnoughTokens (tokenContract, tokensOwner, amount) {
  const balance = await tokenContract.balanceOf(tokensOwner)
  console.log('balance', balance)
  return balance.gte(amount)
}

async function getFirstAccount () {
  const accounts = await web3.eth.getAccounts()
  return accounts[0]
}

async function hasEnoughPoolShares (pool, owner, amount) {
  const shares = await pool.donors(owner);
  console.log('shares', shares)
  return shares.gte(amount);
}

module.exports = {
  getDeployedMoloch,
  getDeployedPool,
  getApprovedToken,
  getMolochAddress,
  getPoolAddress,
  giveAllowance,
  hasEnoughAllowance,
  hasEnoughTokens,
  getFirstAccount,
  hasEnoughPoolShares
}
