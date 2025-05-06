---
layout: base
title: Snake
permalink: /snake/
---

<style>
    body {}
    .wrap {
        margin-left: auto;
        margin-right: auto;
    }

    canvas {
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: #FFFFFF;
    }

    canvas:focus {
        outline: none;
    }

    #gameover p, #setting p, #menu p {
        font-size: 20px;
    }

    #gameover a, #setting a, #menu a {
        font-size: 30px;
        display: block;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover {
        cursor: pointer;
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before {
        content: ">";
        margin-right: 10px;
    }

    #menu {
        display: block;
    }

    #gameover {
        display: none;
    }

    #setting {
        display: none;
    }

    #setting input {
        display: none;
    }

    #setting label {
        cursor: pointer;
    }

    #setting input:checked + label {
        background-color: #FFF;
        color: #000;
    }
</style>

<h2>Snake Game</h2>
<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Score: <span id="score_value">0</span></p>
        <p class="fs-5">High Score: <span id="high_score_value">0</span></p>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="setting_menu1" class="link-alert">settings</a>
        </div>
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">new game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35"/>
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>
        </div>
    </div>
</div>

<script>
(function(){
    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");

    const SCREEN_SNAKE = 0;
    const screen_snake = document.getElementById("snake");
    const ele_score = document.getElementById("score_value");
    const ele_high_score = document.getElementById("high_score_value");
    const speed_setting = document.getElementsByName("speed");
    const wall_setting = document.getElementsByName("wall");

    const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
    const screen_menu = document.getElementById("menu");
    const screen_game_over = document.getElementById("gameover");
    const screen_setting = document.getElementById("setting");

    const button_new_game = document.getElementById("new_game");
    const button_new_game1 = document.getElementById("new_game1");
    const button_new_game2 = document.getElementById("new_game2");
    const button_setting_menu = document.getElementById("setting_menu");
    const button_setting_menu1 = document.getElementById("setting_menu1");

    const BLOCK = 10;
    let SCREEN = SCREEN_MENU;
    let snake;
    let snake_dir;
    let snake_next_dir;
    let snake_speed;
    let food = {x: 0, y: 0};
    let score;
    let wall;
    let highScore = localStorage.getItem("high_score") || 0;
    ele_high_score.innerHTML = String(highScore);

    let showScreen = function(screen_opt){
        SCREEN = screen_opt;
        screen_snake.style.display = (screen_opt === SCREEN_SNAKE || screen_opt === SCREEN_GAME_OVER) ? "block" : "none";
        screen_menu.style.display = screen_opt === SCREEN_MENU ? "block" : "none";
        screen_setting.style.display = screen_opt === SCREEN_SETTING ? "block" : "none";
        screen_game_over.style.display = screen_opt === SCREEN_GAME_OVER ? "block" : "none";
    }

    window.onload = function(){
        button_new_game.onclick = function(){newGame();};
        button_new_game1.onclick = function(){newGame();};
        button_new_game2.onclick = function(){newGame();};
        button_setting_menu.onclick = function(){showScreen(SCREEN_SETTING);};
        button_setting_menu1.onclick = function(){showScreen(SCREEN_SETTING);};

        setSnakeSpeed(150);
        for(let i = 0; i < speed_setting.length; i++){
            speed_setting[i].addEventListener("click", function(){
                for(let i = 0; i < speed_setting.length; i++){
                    if(speed_setting[i].checked){
                        setSnakeSpeed(speed_setting[i].value);
                    }
                }
            });
        }

        setWall(1);
        for(let i = 0; i < wall_setting.length; i++){
            wall_setting[i].addEventListener("click", function(){
                for(let i = 0; i < wall_setting.length; i++){
                    if(wall_setting[i].checked){
                        setWall(wall_setting[i].value);
                    }
                }
            });
        }

        window.addEventListener("keydown", function(evt) {
            if(evt.code === "Space" && SCREEN !== SCREEN_SNAKE)
                newGame();
        }, true);
    }

    let mainLoop = function(){
        let _x = snake[0].x;
        let _y = snake[0].y;
        snake_dir = snake_next_dir;

        switch(snake_dir){
            case 0: _y--; break;
            case 1: _x++; break;
            case 2: _y++; break;
            case 3: _x--; break;
        }

        snake.pop();
        snake.unshift({x: _x, y: _y});

        if(wall == 1){
            if (_x < 0 || _x === canvas.width / BLOCK || _y < 0 || _y === canvas.height / BLOCK){
                showScreen(SCREEN_GAME_OVER);
                return;
            }
        } else {
            for(let i = 0; i < snake.length; i++){
                if(snake[i].x < 0) snake[i].x += canvas.width / BLOCK;
                if(snake[i].x === canvas.width / BLOCK) snake[i].x -= canvas.width / BLOCK;
                if(snake[i].y < 0) snake[i].y += canvas.height / BLOCK;
                if(snake[i].y === canvas.height / BLOCK) snake[i].y -= canvas.height / BLOCK;
            }
        }

        for(let i = 1; i < snake.length; i++){
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                showScreen(SCREEN_GAME_OVER);
                return;
            }
        }

        if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
            snake[snake.length] = {x: snake[0].x, y: snake[0].y};
            altScore(++score);
            addFood();
            activeDot(food.x, food.y);
        }

        ctx.beginPath();
        ctx.fillStyle = "royalblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < snake.length; i++){
            activeDot(snake[i].x, snake[i].y);
        }

        activeDot(food.x, food.y);
        setTimeout(mainLoop, snake_speed);
    }

    let newGame = function(){
        showScreen(SCREEN_SNAKE);
        screen_snake.focus();
        score = 0;
        altScore(score);
        snake = [];
        snake.push({x: 0, y: 15});
        snake_next_dir = 1;
        addFood();
        canvas.onkeydown = function(evt) {
            changeDir(evt.keyCode);
        }
        mainLoop();
    }

    let changeDir = function(key){
        switch(key) {
            case 37: if (snake_dir !== 1) snake_next_dir = 3; break;
            case 38: if (snake_dir !== 2) snake_next_dir = 0; break;
            case 39: if (snake_dir !== 3) snake_next_dir = 1; break;
            case 40: if (snake_dir !== 0) snake_next_dir = 2; break;
        }
    }

    let activeDot = function(x, y){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
    }

    let addFood = function(){
        food.x = Math.floor(Math.random() * ((canvas.width / BLOCK) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / BLOCK) - 1));
        for(let i = 0; i < snake.length; i++){
            if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                addFood();
            }
        }
    }

    let checkBlock = function(x, y, _x, _y){
        return (x === _x && y === _y);
    }

    let altScore = function(score_val){
        ele_score.innerHTML = String(score_val);
        if(score_val > highScore){
            highScore = score_val;
            localStorage.setItem("high_score", highScore);
            ele_high_score.innerHTML = String(highScore);
        }
    }

    let setSnakeSpeed = function(speed_value){
        snake_speed = speed_value;
    }

    let setWall = function(wall_value){
        wall = wall_value;
        screen_snake.style.borderColor = wall == 0 ? "#606060" : "#FFFFFF";
    }
})();
</script>
