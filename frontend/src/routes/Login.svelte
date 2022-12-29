<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { baseLink } from "../lib/apiLinks";
  import { code } from "../lib/AuthStore";

  let codeInput = "";
  let error;

  const login = async () => {
    const res = await fetch(baseLink + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: codeInput,
      }),
    });

    if (res.status == 200) {
      error.style.opacity = 100;
      code.set(codeInput);
      navigate("/admin");
    } else {
      error.style.opacity = 100;
    }
  };

  onMount(() => {
    document.title = "MentaalAchtergesteld | Login";
  });
</script>

<div class="background">
  <span>Login</span>
  <input type="text" placeholder="Code" bind:value={codeInput} />
  <button on:click={login}>Login</button>
  <span class="error" bind:this={error}>Wrong code.</span>
</div>

<style>
  .background {
    min-width: 100vw;
    min-height: 100vh;
    background: linear-gradient(
      109.6deg,
      rgba(119, 44, 232, 0.68) 11.5%,
      rgb(119, 44, 232) 91.2%
    );
    background-size: 200%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
    gap: 8px;
  }

  input,
  button {
    width: 8rem;
    height: 2rem;
    border-radius: 8px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
    background: linear-gradient(
      to right,
      rgb(242, 112, 156),
      rgb(255, 148, 114)
    );
    background-position: left;
    background-size: 400%;
    color: white;
    box-shadow: 0px 5px 10px 2px rgb(0, 0, 0, 0.25);
    transition: background-position 0.5s ease;
  }

  button:hover {
    background-position: right;
  }

  .error {
    font-size: 1rem;
    color: #f25f5c;
    opacity: 0;
  }
</style>
