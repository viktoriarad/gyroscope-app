const Canvas = (canvasParam, ctxParam) => {
    const canvas = canvasParam;
    const ctx = ctxParam;
    let getBallProperties;
    let IsGameStarted;

    const setBallGetter = (functionToSet) => {
        getBallProperties = functionToSet;
    };

    const setIsGameStartedGetter = (functionToSet) => {
        IsGameStarted = functionToSet;
    };

    /**
     * Function that is responsible for rendering of the canvas
     * @returns {boolean} True if canvas was rendered or false if not
     */
    const render = () => {
        if (IsGameStarted === false) return false;

        const ball = getBallProperties();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00135d";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = "#c9c9c9";
        ctx.fill();
        ctx.closePath();

        return true;
    };

    return {
        setBallGetter,
        setIsGameStartedGetter,
        render
    }
};