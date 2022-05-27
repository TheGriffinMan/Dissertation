<template>
  <b-row>
    <div class="container-white mt-3" style="width: 100%">
      <b-row class="border-b">
        <b-col cols="11"><h5>Document Uploader</h5> </b-col>
        <b-col cols="1">
          <b-button class="clear" @click="goBack" size="sm"> Back </b-button>
        </b-col>
      </b-row>

      <b-form @submit="onSubmit">
        <b-row align-v="center">
          <b-col>
            <b-form-group label="Project Title:">
              <b-form-input
                v-model="form.title"
                placeholder="Title.."
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Description:">
              <b-form-input
                v-model="form.description"
                placeholder="Description.."
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="center">
          
          <b-col>
            <b-form-checkbox v-model="form.projectPrice.availableForSale">
              Register for sale
            </b-form-checkbox>
          </b-col>
        </b-row>

        <b-row align-v="center">
          <b-col>
            <b-form-group
              :disabled="!form.projectPrice.availableForLicense"
              label="License Price:"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0"
                v-model="form.projectPrice.licensePrice"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              :disabled="!form.projectPrice.availableForSale"
              label="Custom Price:"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0"
                v-model="form.projectPrice.customPrice"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="center">
          <b-col>
            <b-form-checkbox v-model="form.projectPrice.allowTimedLicense">
              Allow Timed License
            </b-form-checkbox>
          </b-col>
          <b-col>
            <b-form-group
              :disabled="!form.projectPrice.availableForSale"
              label="Base Price:"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0"
                v-model="form.projectPrice.baseSalePrice"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row align-v="center">
          <b-col>
            <b-form-group
              :disabled="!form.projectPrice.allowTimedLicense"
              label="License Price Per Year:"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0"
                v-model="form.projectPrice.licenseTimedPrice"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              :disabled="!form.projectPrice.availableForSale"
              label="Price per license sold:"
            >
              <b-form-input
                type="number"
                step="0.01"
                min="0"
                v-model="form.projectPrice.additiveLicenseValue"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group label="Select your project:">
          <div class="mb-3">
            <b-form-file
              v-model="selectedFile"
              :state="Boolean(selectedFile)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </div>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </b-row>
</template>

<script>


const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
import inputValidationMixin from "@/mixins/inputValidationMixin";
import notificationMixin from "../mixins/notificationMixin";
export default {
  name: "UploadProject",
  data: function () {
    return {
      selectedFile: null,
      form: {
        title: "My Project",
        description: "",
        projectPrice: {
          customPrice: "0",
          baseSalePrice: "0",
          additiveLicenseValue: "0",
          salePrice: "0",
          licensePrice: "0",
          licenseTimedPrice: "0",
          availableForSale: false,
          availableForLicense: false,
          allowTimedLicense: false,
        },
        file: [],
      },
    };
  },
  mixins:[inputValidationMixin, notificationMixin],
 
  computed: {
    projectContract() {
      return this.$store.getters["projects/getProjectContract"];
    },
    account() {
      return this.$store.getters["accounts/getAccount"];
    },
  },
  
  methods: {
    goBack() {
      this.$router.push({ name: "Home" });
    },
    onSubmit(event) {
      event.preventDefault();
      if (!this.verifyForm()) {
        return;
      }
      ipfs
        .add({ content: this.form.file, mode: String })
        .then((result) => {
          this.projectContract.methods
            .uploadProject(
              result.path,
              this.form.title,
              this.form.description,
              this.convertProjectPriceToWei({ ...this.form.projectPrice })
            )
            .send({ from: this.account })
            .on("transactionHash", () => {
              
              
            })
            .catch((error) => {
              if (error.code === 4001) {
                this.makeToast(
                  "Error uploading project",
                  "User rejected transaction."
                );
              } else {
                this.makeToast("Error uploading projectt", error.message);
              }
            });
        })
        .catch((error) => {
          this.makeToast("Error Uploading projectt", error.message);
        });
    },
    verifyForm() {
      
      if (!this.validateDescription(this.form.description)) {
        return false;
      }
      
      
      if (!this.validateFile(this.form.file)) {
        return false;
      }
      return true;
    },
  },
  watch: {
    selectedFile: function (val) {
      var reader = new window.FileReader();
      if (!val) {
        
        this.form.file = [];
        return;
      }
      try {
        reader.readAsArrayBuffer(val);
        reader.onloadend = () => {
          this.form.file = Buffer(reader.result);
        };
      } catch (e) {
        this.form.file = [];
       
      }
    },
  },
};
</script>