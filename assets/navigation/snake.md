---
layout: base
title: Snake
permalink: /snake/
---

<style>
    body {
    }

    .wrap {
        margin-left: auto;
        margin-right: auto;
    }

    canvas {
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: rgb(8, 12, 245);
    }

    canvas:focus {
        outline: none;
    }

    /* All screens style */
    #gameover p,
    #setting p,
    #menu p {
        font-size: 20px;
    }

    #gameover a,
    #setting a,
    #menu a {
        font-size: 30px;
        display: block;
    }

    #gameover a:hover,
    #setting a:hover,
    #menu a:hover {
        cursor: pointer;
    }

    #menu {
        display: block;
    }

    #gameover,
    #setting {
        display: none;
    }

    #setting input {
        display: none;
    }

    #setting label {
        cursor: pointer;
    }

    #setting input:checked+label {
        background-color: #FFF;
        color: #000;
    }
</style>

<h2>Snake Game</h2>
<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Score: <span id="score_value">0</span></p>
        <p class="fs-4">High Score: <span id="high_score_value">0</span></p>
        <button id="reset_high_score" style="background-color:rgb(0, 204, 255); color: white; padding: 5px 10px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">
            Reset High Score
        </button>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">New Game</a>
            <a id="setting_menu" class="link-alert">Settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">New Game</a>
            <a id="setting_menu1" class="link-alert">Settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">New Game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked />
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75" />
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35" />
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked />
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0" />
                <label for="walloff">Off</label>
            </p>
        </div>
    </div>
</div>

<script>
    (function () {
        /* Game Attributes */
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");

        const SCREEN_MENU = -1, SCREEN_SNAKE = 0, SCREEN_GAME_OVER = 1, SCREEN_SETTING = 2;
        const BLOCK = 10;

        let SCREEN = SCREEN_MENU;
        let snake = [];
        let snake_dir = 1;
        let snake_next_dir = 1;
        let snake_speed = 150;
        let food = { x: 0, y: 0 };
        let score = 0;
        let wall = 1;

        const ele_score = document.getElementById("score_value");
        const ele_high_score = document.getElementById("high_score_value");
        const reset_high_score_button = document.getElementById("reset_high_score");
        const screen_menu = document.getElementById("menu");
        const screen_game_over = document.getElementById("gameover");
        const screen_setting = document.getElementById("setting");
        const screen_snake = document.getElementById("snake");

        const button_new_game = document.getElementById("new_game");
        const button_new_game1 = document.getElementById("new_game1");
        const button_new_game2 = document.getElementById("new_game2");
        const button_setting_menu = document.getElementById("setting_menu");
        const button_setting_menu1 = document.getElementById("setting_menu1");

        /* High Score Logic */
        let highScore = localStorage.getItem("highScore") || 0; // Retrieve high score from localStorage
        ele_high_score.textContent = highScore;

        const updateHighScore = (currentScore) => {
            if (currentScore > highScore) {
                highScore = currentScore;
                localStorage.setItem("highScore", highScore); // Save the new high score to localStorage
                ele_high_score.textContent = highScore; // Update the high score display
            }
        };

        reset_high_score_button.onclick = () => {
            highScore = 0;
            localStorage.setItem("highScore", highScore); // Reset high score in localStorage
            ele_high_score.textContent = highScore; // Update the high score display
        };

        /* Display Control */
        const showScreen = (screen_opt) => {
            SCREEN = screen_opt;
            screen_menu.style.display = screen_opt === SCREEN_MENU ? "block" : "none";
            screen_snake.style.display = screen_opt === SCREEN_SNAKE ? "block" : "none";
            screen_game_over.style.display = screen_opt === SCREEN_GAME_OVER ? "block" : "none";
            screen_setting.style.display = screen_opt === SCREEN_SETTING ? "block" : "none";
        };

        /* Game Initialization */
        const newGame = () => {
            showScreen(SCREEN_SNAKE);
            screen_snake.focus();
            score = 0;
            updateScore(score);
            snake = [{ x: 0, y: 15 }];
            snake_next_dir = 1;
            addFood();
            mainLoop();
        };

        /* Main Game Loop */
        const mainLoop = () => {
            let _x = snake[0].x;
            let _y = snake[0].y;

            // Update direction
            snake_dir = snake_next_dir;
            switch (snake_dir) {
                case 0: _y--; break; // Up
                case 1: _x++; break; // Right
                case 2: _y++; break; // Down
                case 3: _x--; break; // Left
            }

            // Move snake
            snake.pop();
            snake.unshift({ x: _x, y: _y });

            // Check collisions
            if (wall === 1 && (_x < 0 || _x >= canvas.width / BLOCK || _y < 0 || _y >= canvas.height / BLOCK)) {
                showScreen(SCREEN_GAME_OVER);
                return;
            }

            for (let i = 1; i < snake.length; i++) {
                if (_x === snake[i].x && _y === snake[i].y) {
                    showScreen(SCREEN_GAME_OVER);
                    return;
                }
            }

            // Check food collision
            if (checkBlock(_x, _y, food.x, food.y)) {
                snake.push({ x: _x, y: _y });
                updateScore(++score);
                addFood();
            }

            // Render game
            renderGame();
            setTimeout(mainLoop, snake_speed);
        };

        /* Render Game */
       const renderGame = () => {
    ctx.fillStyle = "royalblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(part => drawBlock(part.x, part.y, "lime"));

    // Draw the food in red using RGB
    drawBlock(food.x, food.y, "rgb(255, 0, 0)");
};

        /* Utility Functions */
        const drawBlock = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        };

        const addFood = () => {
            food.x = Math.floor(Math.random() * (canvas.width / BLOCK));
            food.y = Math.floor(Math.random() * (canvas.height / BLOCK));
        };

        const checkBlock = (x, y, _x, _y) => x === _x && y === _y;

        const updateScore = (value) => {
            ele_score.textContent = value;
            updateHighScore(value); // Check and update high score
        };

        /* Event Listeners */
        window.onload = () => {
            button_new_game.onclick = newGame;
            button_new_game1.onclick = newGame;
            button_new_game2.onclick = newGame;
            button_setting_menu.onclick = () => showScreen(SCREEN_SETTING);
            button_setting_menu1.onclick = () => showScreen(SCREEN_SETTING);

            // Add event listener for arrow keys
            window.addEventListener("keydown", (evt) => {
                if (SCREEN !== SCREEN_SNAKE) {
                    if (evt.code === "Space") newGame();
                    return;
                }

                // Update snake direction based on arrow keys
                switch (evt.code) {
                    case "ArrowUp":
                        if (snake_dir !== 2) snake_next_dir = 0; // Up
                        break;
                    case "ArrowRight":
                        if (snake_dir !== 3) snake_next_dir = 1; // Right
                        break;
                    case "ArrowDown":
                        if (snake_dir !== 0) snake_next_dir = 2; // Down
                        break;
                    case "ArrowLeft":
                        if (snake_dir !== 1) snake_next_dir = 3; // Left
                        break;
                }
            });
        };
    })();
</script>