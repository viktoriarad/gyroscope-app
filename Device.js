const Device = () => {
    let motionPermission = false;
    let onGrantedPermission;

    /**
     * Ustalenie funkcja ktora ma byc wywolana zaraz po otrzymaniu pozwolenia na API sensorow
     * @param {function} functionToSet
     */
    const setGrantedPermissionAction = (functionToSet) => {
        onGrantedPermission = functionToSet;
    };

    /**
     * Funkcja prosi o pozwolenie aby sie korzystac z API sensorow
     * @returns {boolean} True if permission was granted and false if not.
     */
    const requestSensorsPermission = () => {
        if (motionPermission === true) {
            onGrantedPermission();
            return motionPermission;
        }

        if (typeof(DeviceMotionEvent) !== 'undefined' && typeof(DeviceMotionEvent.requestPermission) === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        motionPermission = true;
                        onGrantedPermission();
                    }
                })
                .catch(console.error)
        } else {
            alert('DeviceMotionEvent is not defined. Sorry you can\'t play this game!');
        }

        return motionPermission;
    };

    /**
     * Funkcja zwraca rozmiar ekranu urzadzenia w pixeliach
     * @returns {{width: {number}, height: {number}}} Object with width and height.
     */
    const getDefaultSize = () => {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const width = iOS === true ? screen.width : window.innerWidth;
        const height = iOS === true ? screen.height : window.innerHeight;

        return {width, height};
    };

    /**
     * Funkcja zwraca wlasciwosci dotyczace orientacji urzadzenia
     * @returns {{default: {string}, current: {string}, reversed: {boolean}}} Returns object with three properties
     */
    const getOrientation = () => {
        const size = getDefaultSize();
        const defaultOrientation = size.width > size.height ? 'landscape' : 'portrait';
        const result = {default: defaultOrientation};

        switch (window.orientation) {
            case 0:
                result.current = defaultOrientation;
                break;
            case 90:
                result.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
                break;
            case -90:
                result.current = defaultOrientation === 'landscape' ? 'portrait' : 'landscape';
                if (result.default === 'portrait') result.reversed = true;
                break;
            default:
                result.current = defaultOrientation;
                break;
        }

        return result;
    };

    /**
     * Funkcja sparwdza czy urzadzenie jest w landscape mode
     * @returns {boolean} True or false
     */
    const isLandscape = () => {
        return getOrientation().current === 'landscape';
    };

    /**
     * Funkcja sparwdza czy urzadzenie jest w portrait mode
     * @returns {boolean} True or false
     */
    const isPortrait = () => {
        return getOrientation().current === 'portrait';
    };

    return {
        requestSensorsPermission,
        getDefaultSize,
        getOrientation,
        isLandscape,
        isPortrait,
        setGrantedPermissionAction
    }
};