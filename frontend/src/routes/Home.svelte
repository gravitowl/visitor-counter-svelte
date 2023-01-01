<script lang="ts">
  import Icon from "svelte-awesome";
  import {
    faDiscord,
    faTwitch,
    faTwitter,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";
  import { onMount } from "svelte";
  import { counter, hasIncremented } from "../lib/CounterStore";
  import { baseLink } from "../lib/apiLinks";

  let wrapper;

  onMount(async () => {
    if (!$hasIncremented) {
      await fetch(baseLink + "/counter/increment");
    }
    const res = await fetch(baseLink + "/counter/get");

    if (res.status == 200) {
      const json = await res.json();
      counter.set(json.res);
      hasIncremented.set(true);
    }

    wrapper.style.opacity = 100;

    document.title = "MentaalAchtergesteld | Home";
  });
</script>

<div class="background">
  <div class="wrapper" bind:this={wrapper}>
    <span class="title">Je bent bezoeker nummer</span>
    <span class="counter">{$counter}</span>
    <span class="disclaimer">(inclusief bots)</span>
    <div class="icons">
      <a href="https://twitter.com/Achtergesteld">
        <Icon data={faTwitter} scale="2.5" />
      </a>
      <a href="https://discord.gg/x5JuQsDU">
        <Icon data={faDiscord} scale="2.5" />
      </a>
      <a href="https://twitch.tv/MentaalAchtergesteld">
        <Icon data={faTwitch} scale="2.5" />
      </a>
      <a href="https://github.com/gravitowl">
        <Icon data={faGithub} scale="2.5" />
      </a>
    </div>
  </div>
  <div class="woffle" />
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
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    opacity: 0;
    transition: opacity 1s ease;
    color: white;
  }

  .title {
    font-size: min(5vh, 5vw);
  }

  .counter {
    font-size: min(10vh, 10vw);
    font-weight: 700;

    background-image: linear-gradient(
      to right,
      rgb(242, 112, 156),
      rgb(255, 148, 114)
    );

    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-top: 8px;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .disclaimer {
    font-size: 1rem;
  }

  .woffle {
    background-image: url("https://cdn.discordapp.com/avatars/704030169010274334/b8bbc7a7dc1270497eced148257eb410.png?size=1024");
    height: 7.5vh;
    border-radius: 50%;
    background-size: contain;
    aspect-ratio: 1/1;

    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(60px);
  }

  .woffle:hover {
    animation: woffleAnimation 3s forwards;
  }

  @keyframes woffleAnimation {
    0% {
      transform: translateY(60px);
    }
    100% {
      transform: translateY(30px);
    }
  }
</style>
