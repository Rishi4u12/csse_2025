---
layout: base
title: Snake
permalink: /snake/
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Realistic Snake Game</title>
    <style>
        body { font-family: sans-serif; background-color: #111; color: #FFF; }
        .container { width: 400px; margin: 0 auto; text-align: center; }
        canvas { background-color: #000; border: 10px solid #FFF; display: block; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Snake Game</h2>
        <p>Score: <span id="score_value">0</span> | High Score: <span id="high_score_value">0</span></p>
        <canvas id="snake" width="320" height="320" tabindex="1"></canvas>
        <p>Press <strong>Space</strong> to Start/Restart | Arrow Keys to Move</p>
        <audio id="eat" src="https://www.soundjay.com/button/sounds/button-16.mp3"></audio>
        <audio id="die" src="https://www.soundjay.com/button/sounds/button-10.mp3"></audio>
    </div>

    <script>
    (function(){
        const canvas = document.getElementById("snake");
        const ctx = canvas.getContext("2d");
        const scoreDisplay = document.getElementById("score_value");
        const highScoreDisplay = document.getElementById("high_score_value");
        const eatSound = document.getElementById("eat");
        const dieSound = document.getElementById("die");

        const BLOCK = 20;
        let snake, direction, nextDirection, food, score, speed, highScore, obstacles;

        function resetGame() {
            snake = [{x: 5, y: 5}];
            direction = 1; // right
            nextDirection = 1;
            score = 0;
            speed = 120;
            food = {};
            obstacles = [];
            addFood();
            updateScore();
            loop();
        }

        function updateScore() {
            scoreDisplay.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("snake_high_score", highScore);
                highScoreDisplay.textContent = highScore;
            }
        }

        function addFood() {
            food.x = Math.floor(Math.random() * (canvas.width / BLOCK));
            food.y = Math.floor(Math.random() * (canvas.height / BLOCK));
            if (snake.some(s => s.x === food.x && s.y === food.y)) addFood();
        }

        function addObstacle() {
            const obs = {
                x: Math.floor(Math.random() * (canvas.width / BLOCK)),
                y: Math.floor(Math.random() * (canvas.height / BLOCK))
            };
            if (!snake.some(s => s.x === obs.x && s.y === obs.y) && (obs.x !== food.x || obs.y !== food.y)) {
                obstacles.push(obs);
            }
        }

        function loop() {
            let head = { ...snake[0] };
            direction = nextDirection;
            switch(direction) {
                case 0: head.y--; break;
                case 1: head.x++; break;
                case 2: head.y++; break;
                case 3: head.x--; break;
            }

            if (head.x < 0 || head.y < 0 || head.x >= canvas.width / BLOCK || head.y >= canvas.height / BLOCK || snake.some(p => p.x === head.x && p.y === head.y) || obstacles.some(o => o.x === head.x && o.y === head.y)) {
                dieSound.play();
                return;
            }

            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                eatSound.play();
                score++;
                updateScore();
                addFood();
                if (score % 5 === 0) addObstacle();
                speed = Math.max(30, speed - 2);
            } else {
                snake.pop();
            }

            draw();
            setTimeout(loop, speed);
        }

        function draw() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw food
            ctx.beginPath();
            ctx.arc(food.x * BLOCK + BLOCK/2, food.y * BLOCK + BLOCK/2, BLOCK/2, 0, 2 * Math.PI);
            ctx.fillStyle = "#FF0000";
            ctx.fill();

            // draw snake
            for (let i = 0; i < snake.length; i++) {
                let part = snake[i];
                let isHead = i === 0;
                const gradient = ctx.createLinearGradient(part.x * BLOCK, part.y * BLOCK, (part.x + 1) * BLOCK, (part.y + 1) * BLOCK);
                gradient.addColorStop(0, isHead ? "#00FF00" : "#ADFF2F");
                gradient.addColorStop(1, "#006400");
                ctx.fillStyle = gradient;
                ctx.fillRect(part.x * BLOCK, part.y * BLOCK, BLOCK, BLOCK);
            }

            // draw obstacles
            ctx.fillStyle = "#8B4513";
            for (let obs of obstacles) {
                ctx.fillRect(obs.x * BLOCK, obs.y * BLOCK, BLOCK, BLOCK);
            }
        }

        window.addEventListener("keydown", e => {
            switch(e.keyCode) {
                case 37: if (direction !== 1) nextDirection = 3; break;
                case 38: if (direction !== 2) nextDirection = 0; break;
                case 39: if (direction !== 3) nextDirection = 1; break;
                case 40: if (direction !== 0) nextDirection = 2; break;
                case 32: resetGame(); break; // space
            }
        });

        highScore = parseInt(localStorage.getItem("snake_high_score")) || 0;
        highScoreDisplay.textContent = highScore;
    })();
    </script>
</body>
</html>
