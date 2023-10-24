const DEXToolsApi = require('@stiacs/dextools-api');
const apiKey = 'YOUR_API_KEY';

// Create an instance of DEXtoolsApi with your API key for ethereum mainnet network
const apiClient = new DEXToolsApi(apiKey, true); 

// Get token information by its address
async function getToken(tokenAddress) {
  try {
    const tokenData = await apiClient.getToken(tokenAddress, 'ether');
    console.log('Token Information:');
    console.log(tokenData);
  } catch (error) {
    console.error(`Error getting token data: ${error}`);
  }
}

// Get pair information by its address for ethereum network
async function getPair(pairAddress) {
  try {
    const pairData = await apiClient.getPair(pairAddress);
    console.log('Pair Information:');
    console.log(pairData);
  } catch (error) {
    console.error(`Error fetching pair information: ${error}`);
  }
}

// Get supported shain list. Chain `slug` is used for `getPair` and `getToken`.
async function getChains() {
  try {
    const list = await apiClient.getChainList();
    console.log('Chains list:');
    console.log(list);
  } catch (error) {
    console.error(`Error fetching chain list: ${error}`);
  }
}

// Get DEXes list
async function getExchangeList() {
  try {
    const list = await apiClient.getExchangeList();
    console.log('DEXes list:');
    console.log(list);
  } catch (error) {
    console.error(`Error fetching DEXes list: ${error}`);
  }
}

// PEPE address
const tokenAddress = '0x6982508145454ce325ddbe47a25d4ec3d2311933';
// PEPE/WETH pair
const pairAddress = '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f';

(async () => {
  let chains = await getChains();
  let exchangeList = await getExchangeList();
  let tokenData = await getToken(tokenAddress);
  let pairData = await getPair(pairAddress);
})();