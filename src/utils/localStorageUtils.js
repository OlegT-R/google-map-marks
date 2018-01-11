function clear() {
    localStorage.clear();
}

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        return null;
    }
}

function setData(data, key) {
    try {
        const serial = JSON.stringify(data);
        localStorage.setItem(key, serial);
    } catch (err) {
        if (err === 'QUOTA_EXCEEDED_ERR') {
            clear();
            const serial = JSON.stringify(data);
            localStorage.setItem(key, serial);
        }
    }
}

export default {
    clear,
    getData,
    setData
}