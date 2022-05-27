const fetchAccounts = async ({ commit }) => {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        commit('setAccount', { data: accounts[0] })
    } catch (error) {
        commit('setAccount', { data: null })
        if (error.code === 4001) {
            throw new Error("User rejected the request. Please connect your accounts to MetaMask.");
        }
        else {
            throw new Error(error.message);
        }
    }
}

const resetAccounts = async ({ commit }) => {
    commit('resetAccount');

}

export default {
    fetchAccounts,
    resetAccounts
}