import priceConverterMixin from "../../../mixins/priceConverterMixin.js";

const fetchProjectContract = async ({ commit }, { web3 = web3, contractAbi = contractAbi }) => {
    console.log("aici");
    const networkId = await window.ethereum.request({
        method: "net_version",
    });

    if (!networkId) {
        throw new Error("There is no existing network");
    }
    console.log("aici2");
    var networkData = contractAbi.networks[networkId];

    if (!networkData) {
        throw new Error("Project Contract not deployed to detected network.")
    }
    console.log("aici3");
    var contract = new web3.eth.Contract(
        contractAbi.abi,
        networkData.address
    );
console.log(contract);
console.log("aici");
    commit("setProjectContract", { data: contract });
    return contract;
}

const fetchProjects = async ({ commit }, { projectContract = projectContract }) => {
    const projectsCount = await projectContract.methods.projectCount().call();
    var projects = []
    for (var i = 0; i < projectsCount; i++) {
        var project = await projectContract.methods.projects(i + 1).call();
        projects[i] = {
            id: project.id,
            title: project.title,
            description: project.description,
            author: project.author,
            owner: project.owner,
            ipfsHash: project.ipfsHash,
            price: project.price,
            licensesSold: project.licensesSold,
        };
        projects[i].price = priceConverterMixin.methods.convertWeiPriceToProject({ ...projects[i].price });
        priceConverterMixin.methods.getDisplayPrice(projects[i]);
    }
    commit("setProjects", { data: projects });
}
export default {
    fetchProjectContract,
    fetchProjects
    
}
