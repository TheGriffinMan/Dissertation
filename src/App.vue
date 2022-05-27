<template>
  <div id="app">
   
    <router-view />
  </div>
</template>

<script>
import FundingAbi from "./abis/Funding.json";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";


export default {
  name: "App",
  data: function () {
    return {};
  },
  
  computed: {
    currentAccount() {
      return this.$store.getters["accounts/getAccount"];
    },
  },
  mounted() {
    this.loadEthereumProvider()
      .then(() => {
        this.loadBlockchainData()
          .then(() => {
            localStorage.setItem("currentAccount", this.currentAccount);
          })
          .catch(() => {
            localStorage.removeItem("currentAccount");
            this.$router.push({ name: "Home" });
           
          });
      })
      .catch(() => {
        localStorage.removeItem("currentAccount");
        this.$router.push({ name: "Home" });
        
      });
  },
  methods: {
    async loadEthereumProvider() {
      const provider = await detectEthereumProvider();
      if (provider) {
        // Initialize your app
        await this.startApp(provider).catch((error) => {
          throw new Error(error.message);
        });
      } else {
        throw new Error("Please install MetaMask!");
      }
    },
    async loadBlockchainData() {
      if (!window.ethereum) {
        throw new Error("Please try using metamask");
      }
      await this.updateAccount().catch((error) => {
        throw new Error(error.message);
      });
      await this.$store
        .dispatch("projects/fetchProjectContract", {
          web3: new Web3(window.ethereum),
          contractAbi: FundingAbi,
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    },
    async startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        throw new Error("Do you have multiple wallets installed?");
      }
      window.ethereum.on("chainChanged", this.handleChainChanged);
      window.ethereum.on("accountsChanged", this.handleAccountsChanged);
    },
    handleChainChanged() {
      window.location.reload();
    },
    async handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        
        this.$store.dispatch("accounts/resetAccounts");
        localStorage.removeItem("currentAccount");
      } else if (accounts[0] !== this.currentAccount) {
        this.updateAccount()
          .then(() => {
            localStorage.setItem("currentAccount", this.currentAccount);
          })
          .catch(() => {
            
           
            localStorage.removeItem("currentAccount");
          });
      }
    },
    async updateAccount() {
      await this.$store.dispatch("accounts/fetchAccounts").catch((error) => {
        throw new Error(error.message);
      });
    },
  },
};
</script>

<style>
</style>