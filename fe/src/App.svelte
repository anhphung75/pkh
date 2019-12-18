<script>
  import Header from "./Header.svelte";
  import Hoso from "./hoso/App.svelte";
</script>

<style>
  #webapp {
    display: grid;
    grid-template-rows: auto 5fr 1px;
    grid-template-columns: 1px 5fr 1px;
    grid-template-areas:
      "header header header"
      "nav main aside"
      "footer footer footer";
    grid-gap: 0.75em;
    height: 100%;
    width: 100%;
  }
  #webapp > header {
    grid-area: header;
    background-color: lightgreen;
  }
  #webapp > nav {
    grid-area: nav;
    background-color: tomato;
  }
  #webapp > main {
    grid-area: main;
    background-color: transparent;
  }
  #webapp > aside {
    grid-area: aside;
    background-color: orange;
  }
  #webapp > footer {
    grid-area: footer;
    background-color: teal;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<div id="webapp">
  <header>
    <svelte:component this={Header} />
  </header>
  <nav />
  <main>
    <svelte:component this={Hoso} />
  </main>
  <aside />
  <footer />
</div>
