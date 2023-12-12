const DEXToolsApi = require('@stiacs/dextools-api');
const apiKey = 'YOUR_API_KEY';

// Create an instance of DEXtoolsApi with your API key for ethereum mainnet network
const apiClient = new DEXToolsApi(apiKey, true); 

// Get token information by its address
async function getToken(chain = 'ether', tokenAddress) {
  try {
    const tokenData = await apiClient.getToken(chain, tokenAddress);
    console.log('Token Information:');
    console.log(tokenData);
  } catch (error) {
    console.error(`Error getting token data: ${error}`);
  }
}

// Get pool information by its address for ethereum network
async function getPool(chain, address) {
  try {
    const pairData = await apiClient.getPool(chain, address);
    console.log('Pool Information:');
    console.log(pairData);
  } catch (error) {
    console.error(`Error fetching pool information: ${error}`);
  }
}

// Get supported shain list. Chain `slug` is used for `getPair` and `getToken`.
async function getChains() {
  try {
    const list = await apiClient.getChainList('name', 'asc');
    console.log('Chains list:');
    console.log(list);
  } catch (error) {
    console.error(`Error fetching chain list: ${error}`);
  }
}

// Get DEXes list
async function getDexList() {
  try {
    const list = await apiClient.getDexList('ether', 'name', 'asc');
    console.log('DEXes list:');
    console.log(list);
  } catch (error) {
    console.error(`Error fetching DEXes list: ${error}`);
  }
}

// PEPE address
const tokenAddress = '0x6982508145454ce325ddbe47a25d4ec3d2311933';
// PEPE/WETH pair
const poolAddress = '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f';

(async () => {
  let chains = await getChains();
  let dexList = await getDexList();
  let tokenData = await getToken(tokenAddress);
  let poolData = await getPool('ether', poolAddress);
})();