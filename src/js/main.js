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
    console.log('github', domain.includes('github'));
    console.log('DevFlag', getDevEnvironmentFlag());
    console.log('Redirect?', domain.includes('github') && getDevEnvironmentFlag());
    return domain.includes('github') && getDevEnvironmentFlag();
}