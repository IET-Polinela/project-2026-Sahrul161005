function renderPage() {

    const app =
        document.getElementById(
            "app-content"
        );

    let route =
        window.location.hash.replace(
            "#",
            ""
        );

    if (!route) {
        route = "login";
    }

    const token =
        localStorage.getItem(
            "access_token"
        );

    if (
        route === "dashboard" &&
        !token
    ) {

        window.location.hash =
            "#login";

        return;

    }

    if (!pages[route]) {
        route = "login";
    }

    app.innerHTML =
        pages[route];

    // Login Page
    if (route === "login") {

        if (
            typeof setupLoginForm ===
            "function"
        ) {

            setupLoginForm();

        }

    }

    // Dashboard Page
    if (route === "dashboard") {

        if (
            typeof setupReportModal ===
            "function"
        ) {

            setupReportModal();

        }

        if (
            typeof loadStatistics ===
            "function"
        ) {

            loadStatistics();

        }

    }

}

window.addEventListener(
    "hashchange",
    renderPage
);

window.addEventListener(
    "load",
    renderPage
);