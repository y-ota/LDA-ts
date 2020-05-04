<template>
  <div class="hello"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LDA } from "../topicmodeling/estimater";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private mounted() {
    const X = [
      [0, 1, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1]
    ];
    new LDA().fit(X);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
