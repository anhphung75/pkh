<script>
  //import { kho } from "./stores.js";
  import App from "./App.svelte";
  import Header from "./Header.svelte";
</script>

<style>
  .webapp {
    display: grid;
    grid-template-rows: 1fr 5fr 1fr;
    grid-template-columns: 1px 5fr 1px;
    grid-template-areas:
      "header header header"
      "nav main aside"
      "footer footer footer";
    grid-gap: 0.75em;
    height: 100vh;
    width: calc(100vw-10px);
  }
  header {
    grid-area: header;
    background-color: teal;
  }
  nav {
    grid-area: nav;
    background-color: tomato;
  }
  main {
    grid-area: main;
  }
  aside {
    grid-area: aside;
    background-color: orange;
  }
  footer {
    grid-area: footer;
    background-color: lightgreen;
  }
</style>

<div class="webapp">
  <header>
    <svelte:component this={Header} />
  </header>
  <nav />
  <main>
    <svelte:component this={App} />
  </main>
  <aside />
  <footer />
</div>
