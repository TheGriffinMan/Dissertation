import actions from "./accounts/actions";
import getters from "./accounts/getters";
import mutations from "./accounts/mutations";

export default {
    state: {
        account: "",
    },
    actions: {
        ...actions,
    },
    getters: {
        ...getters,
    },
    mutations: {
        ...mutations,
    },
}
