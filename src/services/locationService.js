const errors = {
    notSupported: 'NOT_SUPPORTED',
    permissionDenied: 'PERMISSION_DENIED',
    positionUnavailable: 'POSITION_UNAVAILABLE',
    timeout: 'TIMEOUT',
    unknown: 'UNKNOWN_ERR',
    userDenied: 1,
};

const errorsMessages = {
    [errors.notSupported]: 'Не поддерживается браузером',
    [errors.permissionDenied]: 'Доступ к локации заблокирован',
    [errors.permissionDenied]: 'Координаты не доступны',
    [errors.timeout]: 'Истекло время ожидания',
    [errors.userDenied]: 'Запрет пользователем получения локации',
    [errors.unknown]: 'Не опознанная ошибка',
};

const resultObj = {
    lng: null,
    lat: null,
    error: null,
};

async function getUserLocation() {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    resultObj.lat = position.coords.latitude;
                    resultObj.lng = position.coords.longitude;
                    resolve(resultObj);
                },

                function (error) {
                    resultObj.error = {
                        message: errorsMessages[error.code] || errorsMessages[errors.unknown],
                        original: error.message,
                    };
                    resolve(resultObj);
                }
            );
        }
        else {
            resultObj.error = {
                message: errorsMessages[errors.notSupported],
                original: errors.notSupported,
            };
            resolve(resultObj);
        }
    })
}

export {getUserLocation};