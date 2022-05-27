<template>
  <div>
    <DisplayProjects :projects="ownedProjects" :showEdit="true" />
  </div>
</template>

<script>
import DisplayProjects from "../components/DisplayProjects.vue";

export default {
  name: "MyProjects",
  data() {
    return {};
  },
  components: {
    DisplayProjects,
  },
  computed: {
    projectContract() {
      return this.$store.getters["projects/getProjectContract"];
    },
    account() {
      return this.$store.getters["accounts/getAccount"];
    },
    projects() {
      return this.$store.getters["projects/getProjects"];
    },
    ownedProjects() {
      var self = this;
      if (!this.projects || this.projects.length <= 0) {
        return null;
      }
      return this.projects.filter(function (project) {
        return project.owner.toLowerCase() == self.account;
      });
    },
  },
  mounted() {
    if (this.projectContract) {
      this.$store.dispatch("projects/fetchProjects", {
        projectContract: this.projectContract,
      });
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    updateProject(project) {
      this.projectContract.methods
        .changeSalePrice(project.id, this.price)
        .send({ from: this.account })
        .on("transactionHash", () => {
          this.successfulUpload = true;
        })
        .catch((error) => {
          console.log(this.errorMessage, "Error");
          this.errorMessage = error.message;
        });
    },
  },
  watch: {
    projectContract: function (val) {
      if (val) {
        this.$store.dispatch("projects/fetchProjects", {
          projectContract: val,
        });
      }
    },
  },
};
</script>