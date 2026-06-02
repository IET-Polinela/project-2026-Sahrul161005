function renderPage() {

    const app = document.getElementById("app-content");

    let route = window.location.hash.replace("#", "");

    if (!route) {
        route = "login";
    }

    if (!pages[route]) {
        route = "login";
    }

    app.innerHTML = pages[route];

    if (route === "login") {
        if (typeof setupLoginForm === "function") {
            setupLoginForm();
        }
    }
}

window.addEventListener("hashchange", renderPage);
window.addEventListener("load", renderPage);