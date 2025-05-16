---
layout: base
title: Platformer
description: Incorporate student lessons. Gameplay includes enemies, platforms, parallax backgrounds, settings with local storage, etc. This revision introduces Settings, Leaderboard and Multiplayer.
image: /images/platformer/backgrounds/home.png
permalink: /game
---

<!-- Sidebar Panels -->
<div id="sidebar" class="sidebar" style="z-index: 9999"></div>
<div id="leaderboardDropDown" class="leaderboardDropDown" style="z-index: 9999"></div>

<!-- Audio Elements -->
<audio id="Mushroom" src="{{ '/assets/audio/Mushroom.mp3' | relative_url }}" preload="auto"></audio>
<audio id="goombaDeath" src="{{ '/assets/audio/goomba-death.mp3' | relative_url }}" preload="auto"></audio>
<audio id="PlayerJump" src="{{ '/assets/audio/mario-jump.mp3' | relative_url }}" preload="auto"></audio>
<audio id="PlayerDeath" src="{{ '/assets/audio/MarioDeath.mp3' | relative_url }}" preload="auto"></audio>
<audio id="coin" src="{{ '/assets/audio/coin.mp3' | relative_url }}" preload="auto"></audio>
<audio id="stomp" src="{{ '/assets/audio/stomp2-93279.mp3' | relative_url }}" preload="auto"></audio>
<audio id="boing" src="{{ '/assets/audio/boing-101318.mp3' | relative_url }}" preload="auto"></audio>
<audio id="flush" src="{{ '/assets/audio/toilet-flushing.mp3' | relative_url }}" preload="auto"></audio>
<audio id="laserSound" src="{{ '/assets/audio/laser.mp3' | relative_url }}" preload="auto"></audio>
<audio id="laserCharge" src="{{ '/assets/audio/charging-laser.mp3' | relative_url }}" preload="auto"></audio>

<!-- Game UI -->
<div id="canvasContainer">
  <div class="submenu">
    <div id="score">
      Timer: <span id="timeScore">0</span>
    </div>
    <div id="score">
      Coins: <span id="coinScore">0</span>
    </div>
    <div id="gameBegin" hidden>
      <button id="startGame">Start Game</button>
    </div>
    <div id="gameOver" hidden>
      <button id="restartGame">Restart</button>
    </div>
    <div id="settings">
      <button id="settings-button">Settings</button>
    </div>
    <div id="leaderboard">
      <button id="leaderboard-button">Leaderboard</button>
    </div>
  </div>
</div>

<div id="container">
  <header class="fun_facts">
    <p id="num">Fun Fact #0</p>
    <h3 id="fun_fact">Mario is named after the frustrated landlord, Mario Segale, of the Nintendo of America building.</h3>
  </header>
</div>

<footer id="cut-story"></footer>

<!-- Game Logic -->
<script type="module">
  import GameSetup from '{{ "/assets/js/platformer3x/GameSetup.js" | relative_url }}';
  import GameControl from '{{ "/assets/js/platformer3x/GameControl.js" | relative_url }}';
  import SettingsControl from '{{ "/assets/js/platformer3x/SettingsControl.js" | relative_url }}';
  import GameEnv from '{{ "/assets/js/platformer3x/GameEnv.js" | relative_url }}';
  import Leaderboard from '{{ "/assets/js/platformer3x/Leaderboard.js" | relative_url }}';
  import startCutstory from '{{ "/assets/js/platformer3x/Cutstory.js" | relative_url }}';
  import RandomEvent from '{{ "/assets/js/platformer3x/RandomEvent.js" | relative_url }}';

  // Game initialization
  GameSetup.initLevels("{{ site.baseurl }}");
  GameControl.gameLoop();
  SettingsControl.initialize();
  Leaderboard.initializeLeaderboard();
  startCutstory();
  RandomEvent();

  window.addEventListener('resize', GameEnv.resize);

  // Sound Playback on First User Interaction
  let soundPlayed = false;
  function playMushroomSoundOnce() {
    if (!soundPlayed) {
      const mushroom = document.getElementById('Mushroom');
      if (mushroom) {
        mushroom.currentTime = 0;
        mushroom.volume = 1.0;
        mushroom.play().catch(err => {
          console.warn("Sound play failed:", err);
        });
        soundPlayed = true;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('click', playMushroomSoundOnce, { once: true });
    window.addEventListener('keydown', playMushroomSoundOnce, { once: true });
  });
</script>
