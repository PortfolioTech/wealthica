function setStoreDevValue() {
    localStorage.setItem("dev", "true");
}

function getStoreDevValue() {
    return localStorage.getItem("dev");
}

function alertStoreDevValue() {
    return alert(getStoreDevValue());
}

function removeStoreDevValue() {
    localStorage.removeItem("dev");
}

function isDevMode(domain) {
    return domain.includes('github') ? getStoreDevValue() : true;
}

function redirectToDevEnv(domain) {
    console.log('github', domain.includes('github'));
    console.log('DevValue', getStoreDevValue());
    console.log('Redirect', domain.includes('github') && getStoreDevValue());
    return domain.includes('github') && getStoreDevValue();
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
