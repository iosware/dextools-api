const Axios = require("axios");
const AxiosLogger = require('axios-logger');

class DEXToolsApi {
  /**
   * Initializes the DEXTools API client.
   * @param {string} apiKey - API key string.
   * @param {boolean} enableLogging - Whether to use logging with requests.
   */
  constructor(apiKey, enableLogging = false) {
    this.enableLogging = enableLogging;
    this.apiAddress = "https://api.dextools.io/v1/";

    if (!apiKey || apiKey.length < 25) {
      throw new Error("API key is required.");
    }

    this.apiKey = apiKey;
  }

  /**
   * Make a general request to the specified URL.
   * @param {string} url - The URL to make the request to.
   * @returns {Promise<any>} - A promise that resolves with the response data.
   */
  async makeRequest(url) {
    try {
      const config = {
        timeout: 10000,
        headers: {
          "Accept": "application/json",
          "X-API-Key": this.apiKey
        }
      };      
      const instance = Axios.create();
      if (this.enableLogging) {
        instance.interceptors.request.use(AxiosLogger.requestLogger);
      }
      const response = await instance.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns pair information.
   * @param {string} address - The pair address.
   * @returns {Promise<any>} - A promise that resolves the pair information.
   */
  getPair(address, chain = 'ether') {
    const url = `${this.apiAddress}pair?chain=${chain}&address=${address}`;
    return this.makeRequest(url);
  }

  /**
   * Retrieves token information by its address.
   * @param {string} address - The token address.
   * @returns {Promise<any>} - A promise that resolves token information.
   */
  getToken(address, chain = 'ether') {
    const url = `${this.apiAddress}token?chain=${chain}&address=${address}`;
    return this.makeRequest(url);
  }

  /**
   * Retrieves exchanges list.
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves to address information.
   */
  getExchangeList(chain = 'ether', page = 0, pageSize = 10) {
    const url = `${this.apiAddress}exchange/list?chain=${chain}&page=${page}&pageSize=${pageSize}`;
    return this.makeRequest(url);
  }


  /**
   * Retrieves chain list
   * @param {integer} page - Page number (pagination starts at page 0).
   * @param {integer} pageSize - Page size.
   * @returns {Promise<any>} - A promise that resolves to transaction information.
   */
  getChainList(page = 0, pageSize = 50) {
    const url = `${this.apiAddress}chain/list?page=${page}&pageSize=${pageSize}`;
    return this.makeRequest(url);
  }
}

module.exports = DEXToolsApi;