<template>
  <div>
    <b-row>
      <b-col cols="6" class="mt-3">
        <div class="container-white-text">
          <h3>How it works</h3>
          <strong><p>Getting started</p></strong>
          <p>
           Use this service in order to promote your projects or 
           find amazing ideas to support. First log into your MetaMask wallet if you
            haven't already. You can download MetaMask
            <a href="https://metamask.io/">here</a>.
          </p>

          <strong><p>Uppload your project</p></strong>
          <p>
            Upload your unique project here and await supporters to take interest
            in it to receive the funding you deserve !!!
          </p>

          <strong><p>View other projects</p></strong>
          <p>
            Click on the browse projects button in order to find a multitude of projects
            which are guaranteed to peek your interest !!
          </p>

          
        </div>
      </b-col>
      <b-col cols="6" class="mt-3">
        <div class="home-header"><h3>Quick Links</h3></div>
        <div class="container-white">
         <!-- <center  v-if="account">-->
           <center>
            <b-button variant="light" block @click="goToUploadProjects()">
              Upload Project
            </b-button>
            <b-button variant="light" block @click="goToBrowseProjects()">
              Browse Projects
            </b-button>
            <b-button variant="light" block @click="goToMyProjects()">
              My Projects
            </b-button>
            
          </center>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    account() {
      var account = this.$store.getters["accounts/getAccount"];
      return account;
    },
  },
  methods: {
    goToUploadProjects() {
      this.$router.push({ name: "UploadProject" });
    },
    goToBrowseProjects() {
      this.$router.push({ name: "BrowseProjects" });
    },
    goToMyPProjects() {
      this.$router.push({ name: "MyProjects" });
    },
    
  },
};
</script>