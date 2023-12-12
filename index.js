const Axios = require('axios')
const AxiosLogger = require('axios-logger')

class DEXToolsApi {
  /**
   * Initializes the DEXTools API client.
   * @param {string} apiKey - API key string.
   * @param {boolean} enableLogging - Whether to use logging with requests.
   */
  constructor (apiKey, enableLogging = false) {
    this.enableLogging = enableLogging
    this.apiAddress = 'https://open-api.dextools.io/free/v2'

    if (!apiKey || apiKey.length < 25) {
      throw new Error('API key is required.')
    }

    this.apiKey = apiKey
  }

  /**
   * Make a general request to the specified URL.
   * @param {string} url - The URL to make the request to.
   * @returns {Promise<any>} - A promise that resolves with the response data.
   */
  async makeRequest (url) {
    try {
      const config = {
        timeout: 10000,
        headers: {
          Accept: 'application/json',
          'X-BLOBR-KEY': this.apiKey
        }
      }
      const instance = Axios.create()
      if (this.enableLogging) {
        instance.interceptors.request.use(AxiosLogger.requestLogger)
      }
      const response = await instance.get(url, config)
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves chain list
   * @param {string} sort - Sorting type (default is 'name')
   * @param {string} order - Sorting order (default is 'asc')
   * @param {integer} page - Page number (starting from 0)
   * @param {integer} pageSize - Result count per page
   * @returns {Promise<any>} - A promise that resolves to transaction information
   */
  getChainList (sort = 'name', order = 'asc', page = 0, pageSize = 50) {
    const url = `${this.apiAddress}/blockchain?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`
    return this.makeRequest(url)
  }

  /**
   * Retrieves exchanges list.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} sort - Sorting type (default is 'name')
   * @param {string} order - Sorting order (default is 'asc')
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getDexList (
    chain = 'ether',
    sort = 'name',
    order = 'asc',
    page = 0,
    pageSize = 10
  ) {
    const url = `${this.apiAddress}/dex/${chain}?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`
    return this.makeRequest(url)
  }

  /**
   * Get details of a specific DEX factory on a particular blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} factoryAddress - Sorting type (default is 'name')
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getDex (chain = 'ether', factoryAddress) {
    const url = `${this.apiAddress}/dex/${chain}/${factoryAddress}`
    return this.makeRequest(url)
  }

  /**
   * Obtain information about all liquidity pools on a specified blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} sort - Sorting type (default is 'name')
   * @param {string} order - Sorting order (default is 'asc')
   * @param {string} from - From filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {string} to - FromTo filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getPoolList (
    chain = 'ether',
    sort = 'name',
    order = 'asc',
    from,
    to,
    page = 0,
    pageSize = 10
  ) {
    const url = `${this.apiAddress}/pool/${chain}?sort=${sort}&order=${order}&from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`
    return this.makeRequest(url)
  }

  /**
   * Fetch details of a specific liquidity pool on a particular blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - Pool address
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getPool (chain = 'ether', address) {
    const url = `${this.apiAddress}/pool/${chain}/${address}`
    return this.makeRequest(url)
  }

  /**
   * Retrieve liquidity information of a specific pool.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - Pool address
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getPoolLiquidity (chain = 'ether', address) {
    const url = `${this.apiAddress}/pool/${chain}/${address}/liquidity`
    return this.makeRequest(url)
  }

  /**
   * Fetch price information of a specific liquidity pool.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - Pool address
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getPoolPrice (chain = 'ether', address) {
    const url = `${this.apiAddress}/pool/${chain}/${address}/price`
    return this.makeRequest(url)
  }

  /**
   * Get the score of a specific liquidity pool.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - Pool address
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getPoolScore (chain = 'ether', address) {
    const url = `${this.apiAddress}/pool/${chain}/${address}/score`
    return this.makeRequest(url)
  }

  /**
   * Get information about all tokens on a specified blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} sort - Sorting type (default is 'name')
   * @param {string} order - Sorting order (default is 'asc')
   * @param {string} from - From filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {string} to - FromTo filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getTokenList (
    chain = 'ether',
    sort = 'name',
    order = 'asc',
    from,
    to,
    page = 0,
    pageSize = 10
  ) {
    const url = `${this.apiAddress}/token/${chain}?sort=${sort}&order=${order}&from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`
    return this.makeRequest(url)
  }

  /**
   * Retrieve details of a specific token on a particular blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getToken (chain = 'ether', address) {
    const url = `${this.apiAddress}/token/${chain}/${address}`
    return this.makeRequest(url)
  }

  /**
   * Obtain additional information about a specific token.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getTokenInfo (chain = 'ether', address) {
    const url = `${this.apiAddress}/token/${chain}/${address}/info`
    return this.makeRequest(url)
  }

  /**
   * Get lock information of a specific token.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getTokenLocks (chain = 'ether', address) {
    const url = `${this.apiAddress}/token/${chain}/${address}/locks`
    return this.makeRequest(url)
  }  

  /**
   * Fetch information about all liquidity pools associated with a specific token.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @param {string} sort - Sorting type (default is 'name')
   * @param {string} order - Sorting order (default is 'asc')
   * @param {string} from - From filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {string} to - FromTo filter, for date sort filter type (creationTime) must be in ISO format (yyyy-MM-dd’T’HH:mm:ss.SSSXXX), for number based sort filter (creationBlock) type must be a number
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getTokenPools (
    chain = 'ether', 
    address, 
    sort = 'creationTime',
    order = 'asc',
    from,
    to,
    page = 0,
    pageSize = 10
  ) {
    const url = `${this.apiAddress}/token/${chain}/${address}/pools?sort=${sort}&order=${order}&from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`
    return this.makeRequest(url)
  }  

  /**
   * Retrieve price information of a specific token.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getTokenPrice (chain = 'ether', address) {
    const url = `${this.apiAddress}/token/${chain}/${address}/price`
    return this.makeRequest(url)
  }  

  /**
   * Fetch the score of a specific token.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getTokenScore (chain = 'ether', address) {
    const url = `${this.apiAddress}/token/${chain}/${address}/score`
    return this.makeRequest(url)
  }  

  /**
   * Get a list of tokens that have gained the most in value.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getTokensGainers (chain = 'ether') {
    const url = `${this.apiAddress}/ranking/${chain}/gainers`
    return this.makeRequest(url)
  } 
  
  /**
   * Fetch a list of tokens that have lost the most in value.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getTokensLosers (chain = 'ether') {
    const url = `${this.apiAddress}/ranking/${chain}/losers`
    return this.makeRequest(url)
  } 

  /**
   * Retrieve a list of hot liquidity pools on a particular blockchain.
   * @param {string} chain - Chain id (default is 'ether', other values can be received from `getChainList`)
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getHotPools (chain = 'ether') {
    const url = `${this.apiAddress}/ranking/${chain}/hotpools`
    return this.makeRequest(url)
  }   
}

module.exports = DEXToolsApi
