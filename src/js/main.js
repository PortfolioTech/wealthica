const DevEnvironmentFlag = "DEV31620240503";

function setDevEnvironmentFlag() {
    localStorage.setItem(DevEnvironmentFlag, "true");
}

function getDevEnvironmentFlag() {
    return localStorage.getItem(DevEnvironmentFlag);
}

function alertDevEnvironmentFlag() {
    return alert(getDevEnvironmentFlag());
}

function removeDevEnvironmentFlag() {
    localStorage.removeItem(DevEnvironmentFlag);
}

function isDevEnvironment(domain) {
    return !domain.includes('github');
}

function redirectToDevEnvironment(domain) {
    return domain.includes('github') && getStoreDevValue();
}