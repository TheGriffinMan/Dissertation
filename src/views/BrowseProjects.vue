<template>
  <div>
    <DisplayProjectsBrowsing
      :projects="projects"
      :baseBuyProject="buyProject"
      
    />

    

   
  </div>
</template>

<script>
import Web3 from "web3";
import DisplayProjectsBrowsing from "../components/DisplayProjectsBrowsing.vue";

export default {
  name: "BrowseProjects",
  data() {
    return {
      projectWaiting: null,
      lockedProjects: [],
    };
  },
  components: {
    DisplayProjectsBrowsing,
  },
  
  computed: {
    account() {
      return this.$store.getters["accounts/getAccount"];
    },
    projectContract() {
      return this.$store.getters["projects/getProjectContract"];
    },
    projects() {
      var projects = this.$store.getters["projects/getProjects"];
      if (!projects || projects.length <= 0) {
        return null;
      }
      var self = this;
      return projects.filter(function (project) {
        return project.owner.toLowerCase() != self.account;
      });
    },
    licenses() {
      return this.$store.getters["projects/getLicenses"];
    },
    ownedLicenses() {
      var self = this;
      if (!this.licenses || this.licenses.length <= 0) {
        return null;
      }
      return this.licenses.filter(function (license) {
        return license.buyer.toLowerCase() == self.account;
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
    removeLockedProject(projectId) {
      const index = this.lockedProjects.indexOf(projectId);
      if (index > -1) {
        this.lockedProjects.splice(index, 1);
      }
    },
    buyProject(project) {
      if (this.lockedProjects.includes(project.id)) {
        
        return;
      }
      this.lockedProjects.push(project.id);
      this.projectContract.methods
        .buyProject(project.id)
        .send({
          from: this.account,
          value: Web3.utils.toWei(String(project.price.salePrice), "ether"),
        })
        .on("transactionHash", () => {
          window.location.reload();
          
        })
        .catch(() => {
          window.location.reload();
          
        })
        .finally(() => {
          this.removeLockedProject(project.id);
        });
    },
    buyLicenseWithCheck(project) {
      var alreadyBought = false;
      var ownsForPeriod = false;
      if (this.ownedLicenses && this.ownedLicenses.length > 0) {
        this.ownedLicenses.forEach((license) => {
          if (license.ipfsHash == project.ipfsHash) {
            if (license.expiryDate == -1) {
              alreadyBought = true;
            } else {
              ownsForPeriod = true;
              this.existingLicense = license;
            }
          }
        });
      }
      if (alreadyBought) {
        return;
      } else if (ownsForPeriod) {
        this.projectWaiting = project;
        this.$root.$emit("bv::show::modal", "rebuyModalLifetime");
      } else {
        this.buyLicense(project);
      }
    },
    buyLicense(project) {
      if (this.lockedProjects.includes(project.id)) {
        
        return;
      }
      this.lockedProjects.push(project.id);
      var dateBought = new Date().getTime();
      var expiryDate = -1;
      var years = 0;
      this.projectContract.methods
        .buyLicense(project.id, dateBought, expiryDate, years)
        .send({
          from: this.account,
          value: Web3.utils.toWei(String(project.price.licensePrice), "ether"),
        })
        .on("transactionHash", () => {
          window.location.reload();
          
        })
        .catch(() => {
          window.location.reload();
          
        })
        .finally(() => {
          this.removeLockedProject(project.id);
        });
    },
    buyTimedLicenseWithCheck(project, years) {
      var ownsForLifetime = false;
      var ownsForPeriod = false;
      if (this.ownedLicenses && this.ownedLicenses.length > 0) {
        this.ownedLicenses.forEach((license) => {
          if (license.ipfsHash == project.ipfsHash) {
            if (license.expiryDate == -1) {
              ownsForLifetime = true;
            } else {
              this.existingLicense = license;
              ownsForPeriod = true;
            }
          }
        });
      }
      if (ownsForLifetime) {
        return;
      } else if (ownsForPeriod) {
        this.projectWaiting = project;
        this.selectedYears = years;
        this.$root.$emit("bv::show::modal", "rebuyModal");
      } else {
        this.buyTimedLicense(project, years);
      }
    },
    buyTimedLicense(project, years) {
      if (this.lockedProjects.includes(project.id)) {
        
        return;
      }
      this.lockedProjects.push(project.id);
      var dateBought = new Date();
      var expiryDate = new Date(
        dateBought.getFullYear() + years,
        dateBought.getMonth(),
        dateBought.getDate() + 1
      );
      this.projectContract.methods
        .buyLicense(
          project.id,
          dateBought.getTime(),
          expiryDate.getTime(),
          years
        )
        .send({
          from: this.account,
          value: Web3.utils.toWei(
            String(project.price.licenseTimedPrice * years),
            "ether"
          ),
        })
        .on("transactionHash", () => {
          window.location.reload();
          
        })
        .catch(() => {
          window.location.reload();
          
        })
        .finally(() => {
          this.removeLockedProject(project.id);
        });
    },
    extendLicenseDuration(project, license, years) {
      if (this.lockedProjects.includes(project.id)) {
        
        return;
      }
      this.lockedProjects.push(project.id);
      var currentExpiryDate = new Date(license.expiryDate);
      var expiryDate = new Date(
        currentExpiryDate.getFullYear() + years,
        currentExpiryDate.getMonth(),
        currentExpiryDate.getDate()
      );
      this.projectContract.methods
        .extendLicenseDuration(
          project.id,
          license.id,
          expiryDate.getTime(),
          years
        )
        .send({
          from: this.account,
          value: Web3.utils.toWei(
            String(project.price.licenseTimedPrice * years),
            "ether"
          ),
        })
        .on("transactionHash", () => {
          window.location.reload();
          
        })
        .catch(() => {
          window.location.reload();
          
        })
        .finally(() => {
          this.removeLockedProject(project.id);
        });
    },
    extendLicenseDurationLifetime(project, license) {
      if (this.lockedProjects.includes(project.id)) {
        
        return;
      }
      this.lockedProjects.push(project.id);
      var expiryDate = -1;
      this.projectContract.methods
        .extendLicenseDurationLifetime(project.id, license.id, expiryDate)
        .send({
          from: this.account,
          value: Web3.utils.toWei(String(project.price.licensePrice), "ether"),
        })
        .on("transactionHash", () => {
          window.location.reload();
          
        })
        .catch(() => {
          window.location.reload();
          
        })
        .finally(() => {
          this.removeLockedProject(project.id);
        });
    },
    handleOkForTimed() {
      this.extendLicenseDuration(
        this.projectWaiting,
        this.existingLicense,
        this.selectedYears
      );
    },
    handleOkForLifetime() {
      this.extendLicenseDurationLifetime(
        this.projectWaiting,
        this.existingLicense
      );
    },
  },
  watch: {
    projectContract: function (val) {
      if (val) {
        this.$store.dispatch("projects/fetchProjects", {
          projectContract: val,
        });
        this.$store.dispatch("projects/fetchLicenses", {
          projectContract: val,
        });
      }
    },
  },
};
</script>