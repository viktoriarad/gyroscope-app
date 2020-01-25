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

    let isStart = false;
    let isPause = false;
    let isGameOver = false;
    let getOrientation;

    const setOrientationGetter = (functionToSet) => {
        getOrientation = functionToSet;
    };

    /**
     * Function starts the game
     * @returns {void}
     */
    const start = () => {
        isStart = true;
        isPause = false;
        ball.x = canvasSize.width / 2;
        ball.y = canvasSize.height / 2;
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
        setOrientationGetter
    };
};