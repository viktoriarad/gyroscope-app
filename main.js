const oDOM = DOM();

const oDevice = Device();

const oGame = Game(oDevice.getDefaultSize(), 10);

const oCanvas = Canvas(oDOM.getCanvas(), oDOM.getCtx());

oDOM.setDeviceSizeGetter(oDevice.getDefaultSize);
oDOM.setPauseGameHandler(oGame.pause);
oDOM.setResumeGameHandler(oGame.resume);
oDOM.setAPIPermissionGetter(oDevice.requestSensorsPermission);
oDOM.setStartGameHandler(oGame.start);
oDOM.setRenderer(oCanvas.render);
oDOM.setIsGameStartedGetter(oGame.isStarted);
oDOM.setIsGamePausedGetter(oGame.isPaused);
oDOM.setIsGameOvered(oGame.isGameOvered);
oDOM.setMoveBallBy(oGame.moveBallBy);
oDOM.setLandscapeModeChecker(oDevice.isLandscape);
oDOM.setPortraitModeChecker(oDevice.isPortrait);
oDOM.setOrientationModeGetter(oDevice.getOrientation);

oDevice.setGrantedPermissionAction(oDOM.startGameButtonHandler);

oGame.setOrientationGetter(oDevice.getOrientation);

oCanvas.setBallGetter(oGame.getBall);
oCanvas.setIsGameStartedGetter(oGame.isStarted);


const changeProtocolToHTTP = () => {
    if (location.protocol !== 'https:') {
      location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
};

changeProtocolToHTTP();