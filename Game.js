/**
 *
 * @param {object} gameSize The object which contains game sizes {width: number, height: number}.
 * @param {number} ballSize The radius of ball.
 * @returns {object} The object with methods.
 */
const Game = (gameSize, ballSize) => {
    const canvasSize = {
        width: gameSize.width > gameSize.height ? gameSize.width : gameSize.height,
        height: gameSize.width > gameSize.height ? gameSize.height : gameSize.width
    };

    const ball = {
        x: 0,
        y: 0,
        radius: ballSize
    };

    const holes = {
        finish: {x: 0, y: 0, radius: 0},
        traps: [
            {x: 0, y: 0, radius: 0}
        ]
    };

    let level = 0;
    let isStart = false;
    let isPause = false;
    let isGameOver = false;
    let getOrientation;

    const setOrientationGetter = (functionToSet) => {
        getOrientation = functionToSet;
    };

    const getHoles = () => holes;

    /**
     * Function starts the game
     * @returns {void}
     */
    const start = () => {
        isStart = true;
        isPause = false;
        level++;
        ball.x = canvasSize.width / 2;
        ball.y = canvasSize.height / 2;
        generateHoles();
    };

    const generateHoles = () => {
        const trapHoles = [];
        const finishHole = {};
        const holeAmount = 5 + level * 2;
        const radius = 15 + level * 2;

        for (let i=0 ; i <= holeAmount; i++) {
            const x = Math.floor(Math.random() * (canvasSize.width - radius*2) + radius);
            const y = Math.floor(Math.random() * (canvasSize.height - radius*2) + radius);
            trapHoles.push({x, y, radius});
        }

        holes.traps = trapHoles;
        holes.finish = generateFinishHole(trapHoles);
    };

    const generateFinishHole = (trapHoles) => {
        const radius = 15;
        const x = Math.floor(Math.random() * (canvasSize.width - radius*2) + radius);
        const y = Math.floor(Math.random() * (canvasSize.height - radius*2) + radius);

        const regenerate = trapHoles.some(hole => {
            return Math.abs(hole.x - x) - hole.radius - radius <= radius;
        });

        if (regenerate) return generateFinishHole(trapHoles);
        return {x, y, radius};
    };

    /**
     * Function returns game state
     * @returns {string} start, pause or gameover
     */
    const getState = () => {
        if (isStart) return 'start';
        if (isPause) return 'pause';
        if (isGameOver) return 'gameover';
    };

    const isStarted = () => {
        return isStart;
    };

    const isPaused = () => {
        return isPause;
    };

    const isGameOvered = () => {
        return isGameOver;
    };

    /**
     * Function pauses the game if it has been started
     * @returns {void}
     */
    const pause = () => {
        if (isStart) isPause = true;
    };

    /**
     * Function resume the game if it has been started
     * @returns {void}
     */
    const resume = () => {
        if (isStart) isPause = false;
    };

    /**
     * Function stops the game
     * @returns {void}
     */
    const gameOver = () => {
        isGameOver = true;
        isStart = false;
        isPause = false;
    };

    /**
     * Function returns ball's properties.
     * @returns {x: number, y: number, radius: number} object The ball's properties
     */
    const getBall = () => ball;

    /**
     * Function moves the ball by the specified number of pixels.
     * @param {number} forX The pixels amount by which the ball should be moved horizontally.
     * @param {number} forY The pixels amount by which the ball should be moved vertically.
     * @returns {void}
     */
    const moveBallBy = (forX, forY) => {
        const multiplier = getOrientation().reversed ? -1 : 1;

        ball.x -= forX * multiplier;
        ball.y -= forY * multiplier;

        if (gotInTrap() === true) return gameOver();
        if (gotFinish() === true) return window.alert('WINNER!');
    };

    const gotInTrap = () => {
        return holes.traps.some(trap => {
            const x = Math.abs(trap.x - ball.x) - trap.radius <= 0;
            const y = Math.abs(trap.y - ball.y) - trap.radius <= 0;
            return x && y;
        });
    };

    const gotFinish = () => {
        const x = Math.abs(holes.finish.x - ball.x) - holes.finish.radius <= 0;
        const y = Math.abs(holes.finish.y - ball.y) - holes.finish.radius <= 0;
        return x && y;
    };

    return {
        start,
        pause,
        resume,
        getBall,
        moveBallBy,
        gameOver,
        getState,
        isStarted,
        isPaused,
        isGameOvered,
        setOrientationGetter,
        getHoles
    };
};