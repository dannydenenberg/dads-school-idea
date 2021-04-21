<script>
  export let name;
  import { Router, Route } from "svelte-routing";
  import About from "./routes/About.svelte";
  import Survey from "./routes/Survey.svelte";
  import Home from "./routes/Home.svelte";

  export let url = "";
</script>

<main style="display: none;">
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>

<Router {url}>
  <div>
    <!-- <Route path="blog/:id" component={BlogPost} /> -->
    <Route path="survey" component={Survey} />
    <Route path="about" component={About} />
    <Route path="/" component={Home} />
  </div>
</Router>

<nav id="footer-nav">
  <a href="/">home</a>
  <a href="about">about</a>
  <a href="survey">survey</a>
</nav>
