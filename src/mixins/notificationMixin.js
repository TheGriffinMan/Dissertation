export default {
    methods: {
      makeToast(
        title = "Error",
        message = "",
        variant = "danger",
        toaster = "b-toaster-top-center",
        append = false
      ) {
        this.$bvToast.toast(message, {
          title: title,
          variant: variant,
          appendToast: append,
          noAutoHide: false,
          autoHideDelay: 4000,
          toaster: toaster,
          solid: false,
        });
      }
    }
  
  }