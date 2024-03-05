function setStoreDevValue() {
    localStorage.setItem("dev", "true");
}

function getStoreDevValue() {
    alert(localStorage.getItem("dev"));
}

function removeStoreDevValue() {
    localStorage.removeItem("dev");
}
