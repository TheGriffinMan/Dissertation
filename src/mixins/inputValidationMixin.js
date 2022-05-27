import notificationMixin from "./notificationMixin.js";

export default {
    mixins: [notificationMixin],
    methods: {
        validateTitle(title) {
            if (
                !title ||
                title.length <= 2 ||
                title.length > 100
            ) {
                this.makeToast(
                    "Error uploading project",
                    "Title length must be between 3 and 100 characters."
                );
                return false;
            }
            return true;
        },
        validateDescription(description) {
            if (description.length > 1000) {
                this.makeToast(
                    "Error uploading project",
                    "Description length must not exceed 1000 characters."
                );
                return false;
            }
            return true;
        },

         

        

        validateFile(file) {

            if (!file || file.length == 0) {
                this.makeToast("Error uploading project", "There was no file uploaded");
                return false;
            }
            return true;
        }
    }

}