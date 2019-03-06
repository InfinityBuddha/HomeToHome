(function () {
    // Inputs, Commands
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let myGame = {
        counter: 0,
        stopMain: null,
        x: 0,
        y: 0
    };

    function update (tFrame) {
        myGame.stopMain = tFrame;
        myGame.x += 1;
        myGame.y += 1;
    }

    function render () {
        ctx.beginPath();
        ctx.arc(myGame.x, myGame.y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function main(tFrame) {
        myGame.stopMain = window.requestAnimationFrame(main);
        // main loop content
        update(tFrame);
        render()
    };
    main(); // start the cycle
})();

