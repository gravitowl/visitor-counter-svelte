<script lang="ts">
  import { navigate } from "svelte-routing";
</script>

<div class="background">
  <span>404 Not Found</span>
  <button on:click={() => navigate("/")}>Home</button>
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

  button {
    width: 8rem;
    height: 2rem;
    border-radius: 8px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1rem;
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
</style>
