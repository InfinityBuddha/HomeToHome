(function () {
    // Inputs, Commands
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let dy = 4;
    let dx = 4;

    let game = {
        stopMain: null,
        ballRadius: 10,
        x: 10,
        y: 10,
        paddleHeight: 10,
        paddleWidth: 100
    };

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (game.x + dx > canvas.width - game.ballRadius || game.x + dx < game.ballRadius) {
            dx = -dx;
        }

        if (game.y + dy > canvas.height - game.ballRadius || game.y + dy < game.ballRadius) {
            dy = -dy;
        }
        game.x += dx;
        game.y += dy;
    }

    function render() {
        drawTheBall();
        drawThePaddle();
    }

    function drawTheBall() {
        ctx.beginPath();
        ctx.arc(game.x, game.y, game.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawThePaddle() {
        ctx.beginPath();
        ctx.rect((canvas.width - game.paddleWidth) / 2, canvas.height - game.paddleHeight, game.paddleWidth, game.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function main(tFrame) {
        game.stopMain = window.requestAnimationFrame(main);
        // main loop content
        update(tFrame);
        render()
    }
    main(); // start the cycle
})();

