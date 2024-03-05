function setStoreDevValue() {
    localStorage.setItem("dev", "true");
}

function getStoreDevValue() {
    return localStorage.getItem("dev");
}

function removeStoreDevValue() {
    localStorage.removeItem("dev");
}

function isInProduction() {
    return getNodeEnv() === "production";
}

function getNodeEnv() {
    fetch('/node-env')
        .then(response => response.json())
        .then(data => {
            console.log('NODE_ENV:', data.nodeEnv);
            // Now you can use data.nodeEnv in your client-side code
        });
    /*
    return app.get('/', (req, res) => {
        res.render('index', { nodeEnv: process.env.NODE_ENV });
    });*/
    return "dev";
}
