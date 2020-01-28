const DOM = () => {
    const startGameBtn = document.querySelector('.start-game');
    const rotateMsg = document.querySelector('.rotate-msg');
    const pauseMsg = document.querySelector('.pause-msg');
    const gameoverMsg = document.querySelector('.gameover-msg');
    const nextlevelMsg = document.querySelector('.nextlevel-msg');
    const nextlevelNmbr = document.querySelector('.nextlevel-nmbr');
    const canvas = document.getElementById('gameCanvas');

    let getDeviceSize;
    let pauseGame;
    let resumeGame;
    let getAPIPermission;
    let startGame;
    let render;
    let isGameStarted;
    let isGamePaused;
    let isGameOvered;
    let isWin;
    let getCurrentLevel;
    let moveBallBy;
    let isLandscapeMode;
    let isPortraitMode;
    let getOrientationMode;

    const setLandscapeModeChecker = (functionToSet) => {
        isLandscapeMode = functionToSet;
    };

    const setPortraitModeChecker = (functionToSet) => {
        isPortraitMode = functionToSet;
    };

    const setIsGameStartedGetter = (functionToSet) => {
        isGameStarted = functionToSet;
    };

    const setIsGamePausedGetter = (functionToSet) => {
        isGamePaused = functionToSet;
    };

    const setIsGameOvered = (functionToSet) => {
        isGameOvered = functionToSet;
    };

    const setIsWin = (functionToSet) => {
        isWin = functionToSet;
    };

    const setCurrentLevelGetter = (functionToSet) => {
        getCurrentLevel = functionToSet;
    };

    const setOrientationModeGetter = (functionToSet) => {
        getOrientationMode = functionToSet;
    };

    const setMoveBallBy = (functionToSet) => {
        moveBallBy = functionToSet;
    };

    const setPauseGameHandler = (functionToSet) => {
        pauseGame = functionToSet;
    };

    const setResumeGameHandler = (functionToSet) => {
        resumeGame = functionToSet;
    };

    const setDeviceSizeGetter = (functionToSet) => {
        getDeviceSize = functionToSet;
    };

    const setAPIPermissionGetter = (functionToSet) => {
        getAPIPermission = functionToSet;
    };

    const setStartGameHandler = (functionToSet) => {
        startGame = functionToSet;
    };

    const setRenderer = (functionToSet) => {
        render = functionToSet;
    };

    const getCanvas = () => canvas;
    const getCtx = () => canvas.getContext("2d");

    /**
     * Funkcja ktora obluguje window load event i sprawdza
     * w ktorym modzie (portrait lub landscape) urzadzenie sie znajduje.
     * @void
     */
    const onLoad = () => {
        const device = getDeviceSize();
        canvas.width = device.width > device.height ? device.width : device.height;
        canvas.height = device.width > device.height ? device.height : device.width;

        ifPortrait();
        ifLandscape();
    };

    /**
     * Funkcja obluguje eventy sensorow urzadzenia
     * @param {object} e Event sensorow
     */
    const deviceMotionHandler = (e) => {
        const start = isGameStarted();
        const pause = isGamePaused();
        const gameover = isGameOvered();
        const win = isWin();

        if (start && pause || gameover || win) return;

        const x = e.accelerationIncludingGravity.x.toFixed(1);
        const y = e.accelerationIncludingGravity.y.toFixed(1);

        moveBallBy(y, x);
        render();
        if (isGameOvered()) {
            gameoverMsg.classList.remove('invisible');
        } else if (isWin()) {
            nextlevelMsg.classList.remove('invisible');
            nextlevelNmbr.innerHTML = getCurrentLevel() + 1;
        }
    };

    /**
     * Funkcja obluguje event klikniecia na przycisk "Start Game"
     * @void
     */
    const startGameButtonHandler = () => {
        startGame();
        render();
        startGameBtn.classList.add('invisible');

        window.addEventListener('devicemotion', deviceMotionHandler);

    };

    /**
     * Funkcja obluguje event zmiany orientacji urzadzenia
     * @void
     */
    const onOrientationChange = () => {
        pauseGame();
        ifPortrait();
        ifLandscape();

        if (isGamePaused()) {
            render();
        }
    };

    /**
     * Funkcja dodaje i usuwa popupy z komunikatami w zaleznosci od tego
     * czy urzadzenie sie znajduje w portrait mode czy nie.
     * @void
     */
    const ifPortrait = () => {
        const isPortrait = isPortraitMode();
        if (isPortrait) {
            rotateMsg.classList.remove('invisible');
            gameoverMsg.classList.add('invisible');
            nextlevelMsg.classList.add('invisible');
        } else {
            rotateMsg.classList.add('invisible');
        }
    };

    /**
     * Funkcja dodaje i usuwa popupy z komunikatami w zaleznosci od tego
     * czy urzadzenie sie znajduje w landscape mode czy nie.
     * @void
     */
    const ifLandscape = () => {
        const landscape = isLandscapeMode();
        const gameStart = isGameStarted();
        const gamePause = isGamePaused();
        const gameOver = isGameOvered();
        const win = isWin();

        if (gameStart && gamePause && landscape) {
            pauseMsg.classList.remove('invisible');
        } else {
            pauseMsg.classList.add('invisible');
        }

        if (gameOver && landscape) gameoverMsg.classList.remove('invisible');
        if (win && landscape) {
            nextlevelNmbr.innerHTML = getCurrentLevel() + 1;
            nextlevelMsg.classList.remove('invisible');
        }
    };

    /* Dodawanie nasluchiwan na DOM elementy */

    startGameBtn.addEventListener('click', () => getAPIPermission());

    window.addEventListener("orientationchange", onOrientationChange);

    pauseMsg.addEventListener('click', () => {
        resumeGame();
        pauseMsg.classList.add('invisible');
    });

    gameoverMsg.addEventListener('click', () => {
        const restart = true;

        startGame(restart);
        gameoverMsg.classList.add('invisible');
    });

    nextlevelMsg.addEventListener('click', () => {
        startGame();
        nextlevelMsg.classList.add('invisible');
    });

    window.addEventListener('load', onLoad);

    return {
        getCanvas,
        getCtx,
        setDeviceSizeGetter,
        setPauseGameHandler,
        setResumeGameHandler,
        setAPIPermissionGetter,
        setStartGameHandler,
        setRenderer,
        setIsGameStartedGetter,
        setIsGamePausedGetter,
        setIsGameOvered,
        setIsWin,
        setCurrentLevelGetter,
        setMoveBallBy,
        setLandscapeModeChecker,
        setPortraitModeChecker,
        setOrientationModeGetter,
        startGameButtonHandler
    }
};