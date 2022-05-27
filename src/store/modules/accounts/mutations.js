import Vue from "vue";
const setAccount = (state, { data }) => {
    if (data && data.length > 0) {
        Vue.set(state, "account", data);
    }
}
const resetAccount = (state) => {
    Vue.set(state, "account", null);
}

export default {
    setAccount,
    resetAccount
}