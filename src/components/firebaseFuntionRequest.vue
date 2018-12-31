<template>

    <ul id="example-1" v-if="!!history">
        <li v-for="(item, index) in history" v-bind:key="item.id" v-if="(index >0)">
            <div>
                <div>
                    {{item.timestamp | moment("DD/MM/YYYY") }}:
                    {{history[index].walletBalance /100000000}}

                    <span> ({{item.amount/10000000}})</span>
                </div>
            </div>
        </li>
    </ul>

</template>

<script>
  import axios from "axios";

  export default {
    name: "historyTrades",
    data: () => ({
      history: ""

    }),

    /**
     *
     * @return {Promise<void>}
     */
    async mounted() {
      const token  = await this.$auth.getToken();
      const res    = await axios.get("https://<frirebase-url>/../<function-get>", {
        headers: { Authorization: "Bearer " + token }
      });
      this.history = res.data;
    }
  };
</script>

<style scoped>

</style>
