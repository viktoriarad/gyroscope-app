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

    /**
     * Zmienna przechowuje w siebie pozycje i radius pilki
     * @type {{x: number, y: number, radius: number}}
     */
    const ball = {
        x: 0,
        y: 0,
        radius: ballSize
    };

    /**
     * Zmienna przechowuje w siebie wszystkie dziury (czerwone pulapki i zielony finisz)
     * @type {{traps: {x: number, y: number, radius: number}[], finish: {x: number, y: number, radius: number}}}
     */
    const holes = {
        finish: {x: 0, y: 0, radius: ballSize * 1.5},
        traps: [
            {x: 0, y: 0, radius: 0}
        ]
    };

    let level = 0;
    let isStart = false;
    let isPause = false;
    let isGameOver = false;
    let isGameWon = false;
    let getOrientation;

    const setOrientationGetter = (functionToSet) => {
        getOrientation = functionToSet;
    };

    const getHoles = () => holes;

    /**
     * Funkcja startuje gre
     * @param {boolean} restart True if restart is needed or false if not
     * @returns {void}
     */
    const start = (restart) => {
        isStart = true;
        isPause = false;
        isGameOver = false;
        isGameWon = false;
        if (restart) level = 1;
        else level++;
        generateBallPosition();
        generateFinishHolePosition();
        generateTrapHoles();
    };

    /**
     * Funkcja generuje wszystkie czerwone pulapki
     * @void
     */
    const generateTrapHoles = () => {
        const trapHoles = [];
        const holeAmount = 5 + level * 2;
        const radius = 15 + level;

        for (let i = 0 ; i <= holeAmount; i++) {
            const hole = generateHole(radius, trapHoles);
            trapHoles.push(hole);
        }

        holes.traps = trapHoles;
    };

    /**
     * Funkcja generuje pulapke i sprawdza aby sie nie znajdowala zablisko obok innej
     * @void
     */
    const generateHole = (radius, trapHoles) => {
        const x = Math.floor(Math.random() * (canvasSize.width - radius*2) + radius);
        const y = Math.floor(Math.random() * (canvasSize.height - radius*2) + radius);

        const trapCrossing = trapHoles.some(hole => {
            const nearX = Math.abs(hole.x - x) - hole.radius - radius <= 0;
            const nearY = Math.abs(hole.y - y) - hole.radius - radius <= 0;
            return nearX && nearY;
        });

        const ballCrossing = (
            Math.abs(ball.x - x) - ball.radius - radius <= radius
            && Math.abs(ball.y - y) - ball.radius - radius <= radius
        );
        const finishCrossing = (
            Math.abs(holes.finish.x - x) - holes.finish.radius - radius <= 0
            && Math.abs(holes.finish.y - y) - holes.finish.radius - radius <= 0
        );

        if (trapCrossing || ballCrossing || finishCrossing) return generateHole(radius, trapHoles);
        return {x, y, radius}
    };

    /**
     * Funkcja generuje pozycje pilki
     * @void
     */
    const generateBallPosition = () => {
        const x = Math.floor((canvasSize.width * 0.8) + Math.random() * (canvasSize.width * 0.2) - ballSize);
        const y = Math.floor(Math.random() * (canvasSize.height - ballSize*2) + ballSize);

        ball.x = x;
        ball.y = y;
    };

    /**
     * Funkcja generuje pozycje zielonej dziury (finisz)
     * @void
     */
    const generateFinishHolePosition = () => {
        const x = Math.floor(Math.random() * (canvasSize.width * 0.2) + holes.finish.radius);
        const y = Math.floor(Math.random() * (canvasSize.height - holes.finish.radius*2) + holes.finish.radius);

        holes.finish.x = x;
        holes.finish.y = y;
    };

    /**
     * Funkcja sprawdza czy gra sie wystartowala
     * @returns {boolean} True or false
     */
    const isStarted = () => {
        return isStart;
    };

    /**
     * Funkcja sprawdza czy gra jest w pauzie
     * @returns {boolean} True or false
     */
    const isPaused = () => {
        return isPause;
    };

    /**
     * Funkcja sprawdza czy gra jest przegrana
     * @returns {boolean} True or false
     */
    const isGameOvered = () => {
        return isGameOver;
    };

    /**
     * Funkcja sprawdza czy gra jest wygrana
     * @returns {boolean} True or false
     */
    const isWin = () => {
        return isGameWon;
    };

    /**
     * Funkcja ustawia gre na pauze
     * @returns {void}
     */
    const pause = () => {
        if (isStart) isPause = true;
    };

    /**
     * Funkcja kontynuje gre jesli ta byla na pauzie
     * @returns {void}
     */
    const resume = () => {
        if (isStart) isPause = false;
    };

    /**
     * Funkcja konczy gre z przegranym wynikiem
     * @returns {void}
     */
    const gameOver = () => {
        isGameOver = true;
        isStart = false;
        isPause = false;
    };

    /**
     * Funkcja konczy gre z wygranym wynikiem
     * @returns {void}
     */
    const getWin = () => {
        isGameOver = false;
        isStart = false;
        isPause = false;
        isGameWon = true;
    };

    /**
     * Funkcja zwraca aktualny level gry
     * @returns {number} Current level of the game
     */
    const getCurrentLevel = () => level;

    /**
     * Funkcja zwraca wlascisoci pilki (pozycje i radius)
     * @returns {x: number, y: number, radius: number} object The ball's properties
     */
    const getBall = () => ball;

    /**
     * Funkcja przesuwa pilke na odpowiednia ilosc pixeli
     * @param {number} forX The pixels amount by which the ball should be moved horizontally.
     * @param {number} forY The pixels amount by which the ball should be moved vertically.
     * @returns {void}
     */
    const moveBallBy = (forX, forY) => {
        const multiplier = getOrientation().reversed ? -1 : 1;

        ball.x -= forX * multiplier * level * 0.5;
        ball.y -= forY * multiplier * level * 0.5;

        if (gotInTrap() === true) return gameOver();
        if (gotFinish() === true) return getWin();
    };

    /**
     * Funkcja sprawdza czy pilka nie trafila do czerwonej pulapki
     * @returns {boolean} True or false
     */
    const gotInTrap = () => {
        return holes.traps.some(trap => {
            const x = Math.abs(trap.x - ball.x) - trap.radius <= 0;
            const y = Math.abs(trap.y - ball.y) - trap.radius <= 0;
            return x && y;
        });
    };

    /**
     * Funkcja sprawdza czy pilka nie trafila do zielonej dziury (finiszu)
     * @returns {boolean} True or false
     */
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
        isStarted,
        isPaused,
        isGameOvered,
        isWin,
        setOrientationGetter,
        getHoles,
        getCurrentLevel
    };
};