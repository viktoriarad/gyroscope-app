const Device = () => {
    let motionPermission = false;
    let onGrantedPermission;

    /**
     * Setting of function which is called after sensors permission was granted
     * @param {function} functionToSet
     */
    const setGrantedPermissionAction = (functionToSet) => {
        onGrantedPermission = functionToSet;
    };

    /**
     * Function asks for permission to get device sensors API
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
     * Function gets pixels size of device screen.
     * @returns {{width: {number}, height: {number}}} Object with width and height.
     */
    const getDefaultSize = () => {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const width = iOS === true ? screen.width : window.innerWidth;
        const height = iOS === true ? screen.height : window.innerHeight;

        return {width, height};
    };

    /**
     * Function gets orientation properties of device.
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
     * Function checks if device is in landscape mode
     * @returns {boolean} True or false
     */
    const isLandscape = () => {
        return getOrientation().current === 'landscape';
    };

    /**
     * Function checks if device is in portrait mode
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