const getProjectContract = (state) => {
    if (state.projectContract) {
        return state.projectContract;
    }

    return null;
}

const getProjects = (state) => {
    if (state.projects && state.projects.length > 0) {
        return state.projects;
    }

    return null;
}

const getProjectById = (state) => ({ id }) => {
    var foundProject = null;
    if (state.projects && state.projects.length > 0) {
        state.projects.forEach((project) => {
            if (project.id == id) {
                foundProject = project;
            }
        })
    }

    return foundProject;
}



export default {
    getProjectContract,
    getProjects,
    getProjectById,
    
}





