const Canvas = (canvasParam, ctxParam) => {
    const canvas = canvasParam;
    const ctx = ctxParam;
    let getBallProperties;
    let IsGameStarted;
    let getHoles;

    const setBallGetter = (functionToSet) => {
        getBallProperties = functionToSet;
    };

    const setHolesGetter = (functionToSet) => {
        getHoles = functionToSet;
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
        const holes = getHoles();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00135d";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        holes.traps.forEach(trap => {
            ctx.beginPath();
            ctx.arc(trap.x, trap.y, trap.radius, 0, Math.PI*2);
            ctx.fillStyle = "#c90c0b";
            ctx.fill();
            ctx.closePath();
        });

        ctx.beginPath();
        ctx.arc(holes.finish.x, holes.finish.y, holes.finish.radius, 0, Math.PI*2);
        ctx.fillStyle = "#2bc932";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = "#c9c9c9";
        ctx.fill();
        ctx.closePath();

        return true;
    };

    return {
        setBallGetter,
        setHolesGetter,
        setIsGameStartedGetter,
        render
    }
};