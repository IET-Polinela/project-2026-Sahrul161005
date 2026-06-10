function setupLoginForm() {

    const form = document.getElementById("login-form");

    if (!form) return;

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const response = await requestAPI(
            "/api/token/",
            "POST",
            {
                username: username,
                password: password
            }
        );

        if (response.status === 200) {

    localStorage.setItem(
        "access_token",
        response.data.access
    );

    localStorage.setItem(
        "refresh_token",
        response.data.refresh
    );

    renderNavbar();

    alert("Login berhasil!");

    window.location.hash =
        "#dashboard";

} else {

            alert("Username atau Password salah!");

        }

    });
}

function logout() {

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );

    renderNavbar();

    alert("Logout berhasil!");

    window.location.hash =
        "#login";

}

async function setupRegisterForm() {

    const form =
        document.getElementById(
            "register-form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const username =
                document.getElementById(
                    "registerUsername"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const password2 =
                document.getElementById(
                    "registerPassword2"
                ).value;

            if (password !== password2) {

                alert(
                    "Konfirmasi password tidak cocok!"
                );

                return;

            }

            const response =
                await requestAPI(
                    "/api/register/",
                    "POST",
                    {
                        username: username,
                        password: password
                    }
                );

            if (
                response.status === 201
            ) {

                alert(
                    "Registrasi berhasil! Silakan login."
                );

                window.location.hash =
                    "#login";

            } else {

                console.log(
                    response.data
                );

                alert(
                    "Registrasi gagal!"
                );

            }

        }
    );

}