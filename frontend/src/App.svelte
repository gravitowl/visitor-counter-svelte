<script lang="ts">
import { Router, Route } from "svelte-routing";
import Home from "./routes/Home.svelte";
import Login from "./routes/Login.svelte";
import Admin from "./routes/Admin.svelte";
import NotFound from "./routes/NotFound.svelte";
</script>

<Router>
  <Route path="/" component="{Home}" />
  <Route path="/login" component="{Login}" />
  <Route path="/admin" component="{Admin}" />
  <Route component="{NotFound}" />
</Router>
