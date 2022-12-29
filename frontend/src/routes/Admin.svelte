<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { code } from "../lib/AuthStore";
  import { counter } from "../lib/CounterStore";
  import { baseLink } from "../lib/apiLinks";

  let counterValue = 0;
  let error, succes;

  onMount(() => {
    if ($code == "") navigate("/login");
  });

  const setCounter = async () => {
    counter.set(counterValue);

    const res = await fetch(baseLink + "/counter/set", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCounter: $counter,
        code: $code,
      }),
    });

    if (res.status == 200) {
      succes.style.display = "block";
      error.style.display = "none";
    } else {
      succes.style.display = "none";
      error.style.display = "block";
    }
  };

  const logout = async () => {
    code.set("");
    navigate("/");
  };
</script>

<div class="background">
  <span>Set Counter</span>
  <input type="text" bind:value={counterValue} />
  <button on:click={setCounter}>Set Counter</button>
  <button on:click={logout}>Log Out</button>
  <span class="error" bind:this={error}>Something went wrong...</span>
  <span class="succes" bind:this={succes}>Counter updated!</span>
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

  .error,
  .succes {
    font-size: 1rem;
  }

  .error {
    color: #f25f5c;
    display: none;
  }

  .succes {
    color: #0cce6b;
    display: none;
  }
</style>
