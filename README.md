<p align="center">
    <img src="https://raw.githubusercontent.com/stiacs/dextools-api/main/img/dextools_logo_full_dark.svg" width="300" alt="dextools api">
    <p align="center">
        <a href="https://github.com/stiacs/dextools-api"><img alt="Total Hits" src="https://hits.dwyl.com/stiacs/dextools-api.svg?style=flat-square"></a>
        <a href="https://github.com/stiacs/dextools-api"><img alt="Downloads" src="https://img.shields.io/npm/dt/dextools-api"></a>
        <a href="https://www.npmjs.com/package/@stiacs/dextools-api"><img alt="Version" src="https://img.shields.io/npm/v/dextools-api?logo=npm&style=flat-square"></a>
        <a href="https://github.com/stiacs/dextools-api"><img alt="License" src="https://img.shields.io/github/license/stiacs/dextools-api"></a>
    </p>
</p>

------
**DEXTools-api** is a nodejs module for DEXTools.io API. This library provides support for many blockchains with promise support for smooth integration into your NodeJs project.

🌟 Key Features:
- ⚡️ High Performance: Enjoy super-fast access to blockchain data.
- ⛓️ Multi-chain support: Choose between different chains (default is ethereum).
- 📄 Requests logging: You can see logs for all requests done
- ✨ Promise Support: Simplify asynchronous operations with built-in promises.

## 📦 Install

```sh
npm i dextools-api
```

### Usage

```js
const DEXToolsApi = require('dextools-api');

// Create an instance of DEXtoolsApi with your API key
const apiClient = new DEXToolsApi(apiKey); 

// or with logging enabled
// const apiClient = new DEXToolsApi(apiKey, true);

// Get information about the DEXT/WETH pair using its address
try {
    const pairInformation = await apiClient.getPair('0xa43fe16908251ee70ef74718545e4fe6c5ccec9f');
    console.log('PEPE/WETH pair Information:\n');
    console.log(JSON.stringify(pairInformation, null, 2));
} catch (error) {
    console.error(`Error fetching pair information: ${error}`);
}

// Chain list to be used with DEXToolsApi
try {
    const chains = await apiClient.getChainList();
    console.log('Chain list:\n');
    console.log(JSON.stringify(chains, null, 2));
} catch (error) {
    console.error('Error fetching chain list', error);
}

```
More examples can be found in tests.js

### Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests as well.

### License
This project is licensed under the **[MIT license](https://opensource.org/licenses/MIT)**.


## Contacts

Feel free to contact me for any project-related queries or collaborations. I'd be happy to discuss ideas!

[<img align="left" alt="Telegram" width="32px" src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" />](https://t.me/stiacs)
