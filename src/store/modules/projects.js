import actions from "./projects/actions";
import getters from "./projects/getters";
import mutations from "./projects/mutations";

export default {
    state: {
        projectContract: null,
        projectCount: null,
        projects: [],
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