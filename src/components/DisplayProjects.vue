<template>
  <div>
    <b-list-group v-if="projects && projects.length > 0">
      <b-list-group-item
        v-for="project in projects"
        :key="project.id"
        class="list-item"
      >
        <b-row class="border-b">
          <b-col cols="11">
            <h5>Project {{ project.id }}</h5>
          </b-col>
          <b-col cols="1">
            <b-button
              v-if="showEdit"
              @click="goToUpdateProject(project)"
              size="sm"
              class="clear"
            >
              Edit
            </b-button>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-row>
              <b-col cols="6" class="bold"> Title: </b-col>
              <b-col>{{ project.title }}</b-col>
            </b-row>

            <b-row>
              <b-col cols="6" class="bold"> Description: </b-col>
              <b-col style="word-wrap: break-word; width: auto">
                {{
                  project.description
                    ? project.description
                    : "No description provided."
                }}
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6" class="bold"> Registered for sale? </b-col>
              <b-col>
                {{ project.price.availableForSale ? "Yes" : "No" }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="bold"> Sale Price: </b-col>
              <b-col>{{ project.price.salePrice }} Eth</b-col>
            </b-row>
            <b-row>
              <a :href="ipfsLink(project)" target="_blank">
                <strong> See project here</strong>
              </a>
            </b-row>
          </b-col>
          <b-col cols="6">
            <b-row>
              <b-col cols="6" class="bold"> Registered for lincese? </b-col>
              <b-col>
                {{ project.price.availableForLicense ? "Yes" : "No" }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="bold"> License Price: </b-col>
              <b-col> {{ project.price.licensePrice }} Eth</b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="bold"> Allow timed license? </b-col>
              <b-col>
                {{ project.price.allowTimedLicense ? "Yes" : "No" }}
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="bold"> License Price Per Year: </b-col>
              <b-col> {{ project.price.licenseTimedPrice }} Eth</b-col>
            </b-row>
            <b-row v-if="showEdit">
              <b-col cols="6" class="bold"> Licenses Sold: </b-col>
              <b-col> {{ project.licensesSold }} </b-col>
            </b-row>
          </b-col>
        </b-row>
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
  props: ["projects", "showEdit"],
  methods: {
    ipfsLink(project) {
      return `https://ipfs.infura.io/ipfs/${project.ipfsHash}`;
    },
    goToUpdateProject(project) {
      this.$router.push({
        name: "UpdateProject",
        params: { projectId: project.id, project: project },
      });
    },
    goToUploadProject() {
      this.$router.push({ name: "UploadProject" });
    },
  },
};
</script>