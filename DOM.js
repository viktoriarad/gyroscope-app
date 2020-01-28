const DOM = () => {
    const startGameBtn = document.querySelector('.start-game');
    const rotateMsg = document.querySelector('.rotate-msg');
    const pauseMsg = document.querySelector('.pause-msg');
    const gameoverMsg = document.querySelector('.gameover-msg');
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

    const onLoad = () => {
        const device = getDeviceSize();
        canvas.width = device.width > device.height ? device.width : device.height;
        canvas.height = device.width > device.height ? device.height : device.width;

        ifPortrait();
    };

    const deviceMotionHandler = (e) => {
        if (isGameStarted() && isGamePaused()) return;
        if (isGameOvered()) return;

        const x = e.accelerationIncludingGravity.x.toFixed(1);
        const y = e.accelerationIncludingGravity.y.toFixed(1);

        moveBallBy(y, x);
        render();
        if (isGameOvered()) {
            gameoverMsg.classList.remove('invisible');
        }
    };

    const startGameButtonHandler = () => {
        startGame();
        render();
        startGameBtn.classList.add('invisible');

        window.addEventListener('devicemotion', deviceMotionHandler);

    };

    const onOrientationChange = () => {
        pauseGame();
        ifPortrait();
        ifLandscape();

        if (isGamePaused()) {
            render();
        }
    };

    const ifPortrait = () => {
        const isPortrait = isPortraitMode();
        if (isPortrait) {
            rotateMsg.classList.remove('invisible');
            gameoverMsg.classList.add('invisible');
        } else {
            rotateMsg.classList.add('invisible');
        }
    };

    const ifLandscape = () => {
        const landscape = isLandscapeMode();
        const gameStart = isGameStarted();
        const gamePause = isGamePaused();
        const gameOver = isGameOvered();

        if (gameStart && gamePause && landscape) {
            pauseMsg.classList.remove('invisible');
        } else {
            pauseMsg.classList.add('invisible');
        }

        if (gameOver && landscape) gameoverMsg.classList.remove('invisible');
    };

    startGameBtn.addEventListener('click', () => getAPIPermission());

    window.addEventListener("orientationchange", onOrientationChange);
    pauseMsg.addEventListener('click', () => {
        resumeGame();
        pauseMsg.classList.add('invisible');
    });

    gameoverMsg.addEventListener('click', () => {
        startGame(true);
        gameoverMsg.classList.add('invisible');
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
        setMoveBallBy,
        setLandscapeModeChecker,
        setPortraitModeChecker,
        setOrientationModeGetter,
        startGameButtonHandler
    }
};