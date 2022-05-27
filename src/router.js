import Vue from 'vue';
import Router from 'vue-router';

import Home from "@/views/Home.vue";
import UploadProject from "@/views/UploadProject";
import BrowseProjects from "@/views/BrowseProjects";
import MyProjects from "@/views/MyProjects";



Vue.use(Router);
const router = new Router({
    mode: "history",
    hash: false,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/uploadProject",
            name: "UploadProject",
            component: UploadProject,
        },
        {
            path: "/browseProjects",
            name: "BrowseProjects",
            component: BrowseProjects,
        },
        {
            path: "/myProjects",
            name: "MyProjects",
            component: MyProjects,
        },
        
        
    ]
});


export default router;