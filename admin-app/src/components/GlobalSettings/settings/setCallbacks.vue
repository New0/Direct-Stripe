<template>
<div>
    <hr/>
    <v-layout row wrap>
        <v-flex md3 xs12>
            <h3>{{text.bubbleMessages}}</h3>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex md2 xs12>
            <label for="successBubble">{{text.successBubble}}</label>
        </v-flex>
        <v-flex md4 xs12>
            <v-textarea
                    v-on:change="saveSetting('direct_stripe_success_message', $event)"
                    v-bind:name="allData.direct_stripe_success_message"
                    v-bind:placeholder="allData.direct_stripe_success_message"
                    v-bind:value="allData.direct_stripe_success_message"
                    id="successBubble"
                    solo
            ></v-textarea>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex md2 xs12>
            <label for="errorBubble">{{text.errorBubble}}</label>
        </v-flex>
        <v-flex md4 xs12>
            <v-textarea
                    v-on:change="saveSetting('direct_stripe_error_message', $event)"
                    v-bind:name="allData.direct_stripe_error_message"
                    v-bind:placeholder="allData.direct_stripe_error_message"
                    v-bind:value="allData.direct_stripe_error_message"
                    solo
                    id="errorBubble"
            ></v-textarea>
        </v-flex>
    </v-layout>
    <br/>
</div>
</template>

<script>
  import axios from 'axios';

  const SETTINGS = ds_admin_app_vars.api.settings;
  const strings = ds_admin_app_vars.strings;

  export default {
    name: 'setCallbacks',
    data () {
      return {
        text: strings,
        allData: ''
      }
    },
    mounted () {
      axios
        .get(SETTINGS)
        .then(response => (
          this.allData = response.data
        ))
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>

</style>