const DevEnvironmentFlag = "DEV31620240503";
const DevEnvironmentUrl = "https://investify.simple-url.com:8085/investify.html"
const InvestifySettingsUrl = "https://portfoliotech.github.io/wealthica/settings.html";


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
    return domain.includes('github') && getDevEnvironmentFlag();
}

function getVersion() {
    return fetch('/version.json')
        .then(response => response.json())
        .then(data => {
            return {
                version: data.version,
                commited: data.commited,
                saved: data.saved
            }
        });
}

function format_version_data(version_data) {
    return "version " + version_data.version + " (" + version_data.commited + ")";
}

function format_version_saved(version_data) {
    return "saved on: " + version_data.saved;
}
