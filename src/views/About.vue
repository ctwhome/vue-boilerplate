<template>
    <div>
        <h1>About page</h1>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        info: null
      };
    },
    mounted() {
      axios
        .get("bitmex/API/announcement")
        .then(response => {
          this.info = response;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };
</script>
