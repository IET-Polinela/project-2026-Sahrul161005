const API_BASE_URL = "http://103.151.63.71:8001";

async function requestAPI(
    endpoint,
    method = "GET",
    bodyData = null
) {

    const token =
        localStorage.getItem("access_token");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {

        headers["Authorization"] =
            `Bearer ${token}`;

    }

    const config = {
        method,
        headers
    };

    if (bodyData) {

        config.body =
            JSON.stringify(bodyData);

    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        config
    );

    let data = null;

    try {

        const text = await response.text();

        if (text) {

            data = JSON.parse(text);

        }

    } catch (error) {

        data = null;

    }
if (response.status === 401) {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    window.location.hash = "#login";

    return {
        status: 401,
        data: null
    };
}
    return {
        status: response.status,
        data
    };
}