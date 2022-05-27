import Vue from "vue";

const setProjectContract = (state, { data }) => {
    if (data) {
        Vue.set(state, "projectContract", data);
    }
}

const setProjects = (state, { data }) => {
    if (data) {
        Vue.set(state, "projects", data);
    }
}



export default {
    setProjectContract,
    setProjects,
    
}