<template>
  <div>
    <b-list-group v-if="projects && projects.length > 0">
      <b-list-group-item
        v-for="project in projects"
        :key="project.id"
        class="list-item"
      >
        <div>
          <b-row class="border-b">
            <b-col>
              <h5>Project {{ project.id }}</h5>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="6">
              <b-row>
                <b-col cols="6"> Title: </b-col>
                <b-col>{{ project.title }}</b-col>
              </b-row>

              <b-row>
                <b-col cols="6"> Description: </b-col>
                <b-col style="word-wrap: break-word; width: auto">
                  {{
                    project.description
                      ? project.description
                      : "No description provided."
                  }}
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6"> Sale Price: </b-col>
                <b-col>{{ project.price.salePrice }} Eth</b-col>
              </b-row>
              <b-row>
                <b-col cols="6"> License Price: </b-col>
                <b-col> {{ project.price.licensePrice }} Eth</b-col>
              </b-row>

              <b-row>
                <b-col cols="6"> License Price Per Year: </b-col>
                <b-col> {{ project.price.licenseTimedPrice }} Eth</b-col>
              </b-row>
            </b-col>
            <b-col cols="6">
              <b-row>
                <b-button
                  variant="light"
                  :disabled="!project.price.availableForSale"
                  @click="buyProject(project)"
                  block
                >
                  Buy project
                </b-button>
              </b-row>

              <b-row>
                <b-button
                  variant="light"
                  :disabled="!project.price.availableForLicense"
                  @click="buyLicense(project)"
                  block
                >
                  Buy license
                </b-button>
              </b-row>
              <b-row>
                <b-dropdown
                  block
                  split
                  split-variant="light"
                  variant="light"
                  :text="splitDropdownText"
                  style="width: 100%"
                  @click="buyTimedLicense(project)"
                  :disabled="!project.price.allowTimedLicense"
                >
                  <b-dropdown-item @click="changeSelectedTime(1)">
                    1 year
                  </b-dropdown-item>
                  <b-dropdown-item @click="changeSelectedTime(2)">
                    2 years
                  </b-dropdown-item>
                  <b-dropdown-item @click="changeSelectedTime(3)">
                    3 years
                  </b-dropdown-item>
                  <b-dropdown-item @click="changeSelectedTime(4)">
                    4 years
                  </b-dropdown-item>
                  <b-dropdown-item @click="changeSelectedTime(5)">
                    5 years
                  </b-dropdown-item>
                </b-dropdown>
              </b-row>

              <b-row>
                <b-button
                  block
                  variant="light"
                  :href="ipfsLink(project)"
                  target="_blank"
                >
                  <strong> See project </strong>
                </b-button>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-list-group-item>
    </b-list-group>
    <center v-else>
      <h5 class="mt-5">There are no projects to display</h5>
      <b-button
        v-if="!projects || projects.length == 0"
        @click="goToUploadProject()"
      >
        Upload Project
      </b-button>
    </center>
  </div>
</template>

<script>
export default {
  name: "DisplayProjects",
  data() {
    return { selectedLicensingTime: 1 };
  },
  props: ["projects", "baseBuyProject"],
  computed: {
    splitDropdownText() {
      return `Buy license for ${this.selectedLicensingTime} ${
        this.selectedLicensingTime == 1 ? "year" : "years"
      }`;
    },
  },
  methods: {
    ipfsLink(project) {
      return `https://ipfs.infura.io/ipfs/${project.ipfsHash}`;
    },
    buyProject(project) {
      this.baseBuyProject(project);
    },
    buyLicense(project) {
      this.baseBuyLicense(project);
    },
    buyTimedLicense(project) {
      this.baseBuyTimedLicense(project, this.selectedLicensingTime);
    },
    goToUploadProject() {
      this.$router.push({ name: "UploadProject" });
    },
    changeSelectedTime(newTime) {
      this.selectedLicensingTime = newTime;
    },
  },
};
</script>