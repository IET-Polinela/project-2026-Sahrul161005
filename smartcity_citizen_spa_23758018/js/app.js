let editingReportId = null;
let currentPage = 1;
let currentTab = "my_reports";
const pages = {

    login: `
<div class="container">

    <div class="row align-items-center min-vh-75">

        <div class="col-lg-6 d-none d-lg-block">

            <div class="pe-5">

                <h1 class="hero-title mb-3">
                    Smart City Citizen Portal
                </h1>

                <p class="hero-subtitle mb-4">

                    Laporkan masalah kota secara cepat,
                    transparan, dan real-time.

                </p>

                <div class="feature-item">
                    🚦 Pelaporan Infrastruktur
                </div>

                <div class="feature-item">
                    🛣️ Monitoring Status Laporan
                </div>

                <div class="feature-item">
                    📍 Pelacakan Lokasi Masalah
                </div>

                <div class="feature-item">
                    🔔 Update Progress Real-Time
                </div>

            </div>

        </div>

        <div class="col-lg-6">

            <div class="card login-card">

                <div class="card-body p-5">

                    <div class="text-center mb-4">

                        <i class="bi bi-person-circle fs-1 text-primary"></i>

                        <h2 class="fw-bold mt-2">
                            Login Citizen
                        </h2>

                        <p class="text-muted">
                            Masuk ke akun Anda
                        </p>

                    </div>

                    <form id="login-form">

                        <div class="mb-3">

                            <label class="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="username"
                                placeholder="Masukkan username"
                                required>

                        </div>

                        <div class="mb-4">

                            <label class="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Masukkan password"
                                required>

                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary w-100 py-3 fw-bold">

                            Login

                        </button>

                    </form>

                    <div class="text-center mt-4">

                        Belum punya akun?

                        <a href="#register"
                           class="fw-bold text-decoration-none">

                            Daftar

                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`,

    register: `
<div class="container">

    <div class="row justify-content-center">

        <div class="col-lg-6">

            <div class="card login-card">

                <div class="card-body p-5">

                    <div class="text-center mb-4">

                        <i class="bi bi-person-plus-fill fs-1 text-success"></i>

                        <h2 class="fw-bold mt-2">
                            Daftar Citizen
                        </h2>

                        <p class="text-muted">
                            Buat akun baru
                        </p>

                    </div>

                    <form id="register-form">

                        <div class="mb-3">

                            <label class="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="registerUsername"
                                placeholder="Masukkan username">

                        </div>

                        <div class="mb-3">

                            <label class="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                class="form-control"
                                id="registerPassword"
                                placeholder="Masukkan password">

                        </div>

                        <div class="mb-4">

                            <label class="form-label">
                                Konfirmasi Password
                            </label>

                            <input
                                type="password"
                                class="form-control"
                                id="registerPassword2"
                                placeholder="Ulangi password">

                        </div>

                        <button
                            type="submit"
                            class="btn btn-success w-100 py-3 fw-bold">

                            Daftar Sekarang

                        </button>

                    </form>

                    <div class="text-center mt-4">

                        Sudah punya akun?

                        <a href="#login"
                           class="fw-bold text-decoration-none">

                            Login

                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`,

    dashboard: `
        <div class="row g-3">

            <div class="col-12 col-lg-3">

    <div class="card border-0 sidebar-premium">

        <div class="card-body">

            <button
                id="btnOpenReportModal"
                class="btn btn-primary w-100 py-3 fw-bold mb-4">

                <i class="bi bi-plus-circle me-2"></i>
                Buat Laporan Baru

            </button>

            <h6 class="fw-bold mb-4">

    <i class="bi bi-bar-chart-line-fill me-2"></i>
    Ringkasan Status

</h6>

<div class="status-card mb-3">

    <div class="d-flex justify-content-between">

        <span>
            <i class="bi bi-pencil-square text-secondary me-2"></i>
            Draft
        </span>

        <span
            id="sidebarDraft"
            class="badge bg-secondary">

            0

        </span>

    </div>

</div>

<div class="status-card mb-3">

    <div class="d-flex justify-content-between">

        <span>
            <i class="bi bi-send-fill text-warning me-2"></i>
            Diajukan
        </span>

        <span
            id="sidebarReported"
            class="badge bg-warning text-dark">

            0

        </span>

    </div>

</div>

        <div class="status-card mb-3">

            <div class="d-flex justify-content-between">
            <span>
                <i class="bi bi-patch-check-fill text-info me-2"></i>
                Diverifikasi
            </span>

            <span id="sidebarVerified" class="badge bg-info"> 0 </span>

        </div>

    </div>

        <div class="status-card mb-3">
            <div class="d-flex justify-content-between">
        <span>
            <i class="bi bi-gear-fill text-primary me-2"></i>
            Diproses
        </span>

        <span id="sidebarProgress" class="badge bg-primary"> 0</span>

    </div>

</div>

<div class="status-card">

    <div class="d-flex justify-content-between">

        <span>
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            Selesai
        </span>

        <span id="sidebarResolved" class="badge bg-success"> 0

        </span>

    </div>

</div>

            <hr>

            <button
    id="btnLogout"
    class="btn btn-outline-danger w-100">

    <i class="bi bi-box-arrow-right me-2"></i>
    Logout

</button>
        </div>

    </div>

</div>

            <div class="col-12 col-lg-7">

    <div class="card shadow-sm border-0">

        <div class="card-body">
            <div class="mb-4">

    <div class="d-flex align-items-center">

        <div
            class="
                bg-primary-subtle
                rounded-circle
                d-flex
                align-items-center
                justify-content-center
                me-3
            "
            style="
                width:60px;
                height:60px;
            ">

            <i
                class="
                    bi bi-person-fill
                    fs-3
                    text-primary
                ">
            </i>

        </div>

        <div>
            <h3 class="fw-bold mb-1">
                Selamat Datang 👋
            </h3>

            <p class="text-muted mb-0">
                Kelola laporan warga dan
                pantau perkembangan secara real-time.
            </p>

        </div>

    </div>

</div>
            <ul class="nav nav-tabs mb-4">  

                <li class="nav-item">

                    <button class="nav-link active" id="btnMyReportsTab">
                        <i class="bi bi-folder-fill me-2"></i>
                        Laporan Saya
                    </button>

                </li>

                <li class="nav-item">
                    <button class="nav-link" id="btnFeedTab">
                        <i class="bi bi-globe-americas me-2"></i>
                        Feed Kota (Publik)
                    </button>
                </li>
            </ul>

            <div id="report-list-container">
                <div class="text-center py-5">

        <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle mb-4 "
            style=" width:100px; height:100px;">

            <i class=" bi bi-folder2-open text-primary " style=" font-size:3rem;"></i>
        </div>

        <h4 class="fw-bold">
            Belum Ada Data Ditampilkan
        </h4>

        <p class=" text-muted mx-auto "
            style=" max-width:450px; ">

            Pilih menu
            <strong>Laporan Saya</strong>
            untuk melihat laporan pribadi
            atau buka
            <strong>Feed Kota</strong>
            untuk melihat laporan publik.

        </p>

        <div class="mt-4">

            <button
                class="btn btn-primary me-2"
                id="btnMyReportsHome">

                <i class="bi bi-folder-fill me-2"></i>
                Laporan Saya

            </button>

            <button
                class="btn btn-outline-primary"
                id="btnFeedHome">

                <i class="bi bi-globe-americas me-2"></i>
                Feed Kota

            </button>

        </div>

    </div>

</div>

        </div>

    </div>

    <div class="row g-3 mt-1">

        <div class="col-12 col-md-4">

            <div class="card stat-card h-100">

    <div class="card-body">

        <div
            class="
                d-flex
                justify-content-between
                align-items-center
            ">

            <div>

                <div class="stat-label">
                    Total Laporan
                </div>

                <div
                    id="totalReports"
                    class="stat-number">

                    0

                </div>

            </div>

            <div
                class="stat-icon bg-primary-subtle">

                <i
                    class="
                        bi bi-file-earmark-text
                        text-primary
                    ">
                </i>

            </div>

        </div>

    </div>

</div>

        </div>

        <div class="col-12 col-md-4">

            <div class="card stat-card h-100">

    <div class="card-body">

        <div
            class="
                d-flex
                justify-content-between
                align-items-center
            ">

            <div>

                <div class="stat-label">
                    Diajukan
                </div>

                <div
                    id="reportedReports"
                    class="stat-number">

                    0

                </div>

            </div>

            <div
                class="stat-icon bg-warning-subtle">

                <i
                    class="
                        bi bi-hourglass-split
                        text-warning
                    ">
                </i>

            </div>

        </div>

    </div>

</div>

        </div>

        <div class="col-12 col-md-4">

            <div class="card stat-card h-100">

    <div class="card-body">

        <div
            class="
                d-flex
                justify-content-between
                align-items-center
            ">

            <div>

                <div class="stat-label">
                    Draft
                </div>

                <div
                    id="draftReports"
                    class="stat-number">

                    0

                </div>

            </div>

            <div
                class="stat-icon bg-success-subtle">

                <i
                    class="
                        bi bi-check-circle-fill
                        text-success
                    ">
                </i>

            </div>

        </div>

    </div>

</div>

        </div>

    </div>

</div>


        </div>
    `
};

function setupReportModal() {

    const btn =
        document.getElementById(
            "btnOpenReportModal"
        );

    if (btn) {

        btn.addEventListener("click", () => {

            const modal =
                new bootstrap.Modal(
                    document.getElementById(
                        "reportModal"
                    )
                );

            modal.show();

            const btnDraft =
                document.getElementById(
                    "btnDraft"
                );

            if (btnDraft) {

                btnDraft.onclick =
                    function () {

                        createDraftReport();

                    };

            }

            const btnSubmit =
                document.getElementById(
                    "btnSubmitReport"
                );

            if (btnSubmit) {

                btnSubmit.onclick =
                    function () {

                        submitReport();

                    };

            }

        });

    }

// Tab Laporan Saya
const btnMyReportsTab =
    document.getElementById(
        "btnMyReportsTab"
    );

if (btnMyReportsTab) {

    btnMyReportsTab.onclick =
        function () {

            currentTab = "my_reports";
            currentPage = 1;

            loadMyReports();

        };

}

// Tab Feed Publik
const btnFeedTab =
    document.getElementById(
        "btnFeedTab"
    );

if (btnFeedTab) {

    btnFeedTab.onclick =
        function () {

            currentTab = "feed";
            currentPage = 1;

            loadFeed();

        };

}

    // Logout
    const btnLogout =
        document.getElementById(
            "btnLogout"
        );

    if (btnLogout) {

        btnLogout.onclick =
            function () {

                logout();

            };

    }

}


// ==========================
// SIMPAN DRAFT
// ==========================

async function createDraftReport() {

    const title =
        document.getElementById("reportTitle").value;

    const category =
        document.getElementById("reportCategory").value;

    const description =
        document.getElementById("reportDescription").value;

    const reportLocation =
        document.getElementById("reportLocation").value;

    try {

        let response;

        if (editingReportId) {

            response = await requestAPI(
                `/api/reports/${editingReportId}/`,
                "PATCH",
                {
                    title,
                    category,
                    description,
                    location: reportLocation
                }
            );

        } else {

            response = await requestAPI(
                "/api/reports/",
                "POST",
                {
                    title,
                    category,
                    description,
                    location: reportLocation,
                    status: "DRAFT"
                }
            );

        }

        if (
            response.status === 200 ||
            response.status === 201
        ) {

            alert(
                editingReportId
                    ? "Draft berhasil diperbarui!"
                    : "Draft berhasil disimpan!"
            );

            editingReportId = null;

            window.location.reload();

        } else {

            alert("Gagal menyimpan draft!");

        }

    } catch (error) {

        console.error(error);

        alert("Terjadi error!");

    }

}


// ==========================
// AJUKAN LAPORAN
// ==========================

async function submitReport() {

    console.log("Tombol Ajukan Diklik");

    const title =
        document.getElementById("reportTitle").value;

    const category =
        document.getElementById("reportCategory").value;

    const description =
        document.getElementById("reportDescription").value;

    const reportLocation =
        document.getElementById("reportLocation").value;

    try {

        let response;

        if (editingReportId) {

            // Jika berasal dari Draft → update draft menjadi REPORTED
            response = await requestAPI(
                `/api/reports/${editingReportId}/`,
                "PATCH",
                {
                    title,
                    category,
                    description,
                    location: reportLocation,
                    status: "REPORTED"
                }
            );

        } else {

            // Jika laporan baru
            response = await requestAPI(
                "/api/reports/",
                "POST",
                {
                    title,
                    category,
                    description,
                    location: reportLocation,
                    status: "REPORTED"
                }
            );

        }

        console.log(response);

        if (
            response.status === 200 ||
            response.status === 201
        ) {

            alert("Laporan berhasil diajukan!");

            editingReportId = null;

            window.location.reload();

        } else {

            alert("Gagal mengajukan laporan!");

        }

    } catch (error) {

        console.error(error);

        alert("Terjadi error!");

    }

}

async function loadMyReports() {

    try {

        const response = await requestAPI(
            `/api/reports/?tab=my_reports&page=${currentPage}`
        );

        const container =
            document.getElementById(
                "report-list-container"
            );

        if (!container) return;

        let html = `
            <h3 class="fw-bold mb-4">
                Riwayat Laporan Saya
            </h3>

            <div class="row g-3">
        `;

        response.data.results.forEach(report => {

            let badgeColor = "secondary";
            let progressBarColor = "secondary";
            let progress = 25;

            if (report.status === "DRAFT") {
                badgeColor = "secondary";
                progressBarColor = "secondary";
                progress = 10;
            }

            if (report.status === "REPORTED") {
                badgeColor = "warning";
                progressBarColor = "warning";
                progress = 25;
            }

            if (report.status === "VERIFIED") {
                badgeColor = "info";
                progressBarColor = "info";
                progress = 50;
            }

            if (report.status === "IN_PROGRESS") {
                badgeColor = "primary";
                progressBarColor = "primary";
                progress = 75;
            }

            if (report.status === "RESOLVED") {
                badgeColor = "success";
                progressBarColor = "success";
                progress = 100;
            }

            html += `

            <div class="col-12 col-lg-6">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between">

                            <span class="badge bg-${badgeColor}">
                                ${report.status}
                            </span>

                            <small class="text-muted">
                                ${report.category}
                            </small>

                        </div>

                        <h4 class="fw-bold mt-3">
                            ${report.title}
                        </h4>

                        <p class="text-muted">
                            ${report.description}
                        </p>

                        <hr>

                        <div>
                            <strong>Lokasi:</strong>
                            ${report.location}
                        </div>

                        <div>
                            <strong>Oleh:</strong>
                            ${report.reporter}
                        </div>

                        <div class="mt-3">

                            <small class="fw-bold">
                                Progress Laporan
                            </small>

                            <div class="progress mt-2">

                                <div
                                    class="progress-bar bg-${progressBarColor}"
                                    style="width:${progress}%">
                                </div>

                            </div>

                            <div class="text-end mt-1">

                                <small
                                    class="text-primary fw-bold">

                                    ${report.status}
                                    (${progress}%)

                                </small>

                            </div>

                        </div>

                        ${
                            report.status === "DRAFT"
                            ?
                            `
                            <div class="mt-3">

                                <button
                                    class="btn btn-warning btn-sm me-2"
                                    onclick="editReport(${report.id})">

                                    Edit

                                </button>

                                <button
                                    class="btn btn-danger btn-sm"
                                    onclick="deleteReport(${report.id})">

                                    Hapus

                                </button>

                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            </div>
            `;

        });

        html += `
            </div>

            <div class="d-flex justify-content-center align-items-center py-4">

                <button
                    class="btn btn-outline-secondary me-3"
                    onclick="prevPage()"
                    ${!response.data.previous ? "disabled" : ""}>

                    <i class="bi bi-chevron-left"></i>
                    Previous

                </button>

                <span class="badge bg-primary fs-6">

                    Halaman ${currentPage}

                </span>

                <button
                    class="btn btn-outline-primary ms-3"
                    onclick="nextPage()"
                    ${!response.data.next ? "disabled" : ""}>

                    Next
                    <i class="bi bi-chevron-right"></i>

                </button>

            </div>
        `;

        container.innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function editReport(id) {

    try {

        editingReportId = id;

        const response = await requestAPI(
            `/api/reports/${id}/`
        );

        const report = response.data;

        document.getElementById("reportTitle").value =
            report.title;

        document.getElementById("reportCategory").value =
            report.category;

        document.getElementById("reportDescription").value =
            report.description;

        document.getElementById("reportLocation").value =
            report.location;

        document.getElementById("btnDraft").innerText =
            "Update Draft";

        // Tombol Update Draft
        document.getElementById("btnDraft").onclick =
            createDraftReport;

        // Tombol Ajukan
        const btnSubmit =
            document.getElementById(
                "btnSubmitReport"
            );

        if (btnSubmit) {

            btnSubmit.onclick = function () {
                submitReport();
            };

        }

        const modal = new bootstrap.Modal(
            document.getElementById(
                "reportModal"
            )
        );

        modal.show();

    } catch (error) {

        console.error(error);

        alert("Gagal mengambil data laporan!");

    }

}

async function deleteReport(id) {

    const konfirmasi = confirm(
        "Yakin ingin menghapus laporan ini?"
    );

    if (!konfirmasi) return;

    try {

        const response = await requestAPI(
            `/api/reports/${id}/`,
            "DELETE"
        );

        console.log(response);

        if (
            response.status === 204 ||
            response.status === 200
        ) {

            alert(
                "Laporan berhasil dihapus!"
            );

            loadMyReports();

        } else {

            alert(
                "Gagal menghapus laporan!"
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "Terjadi error saat menghapus!"
        );

    }

}

async function loadFeed() {

    try {

        const response = await requestAPI(
            `/api/reports/?tab=feed&page=${currentPage}`
        );

        const container =
            document.getElementById(
                "report-list-container"
            );

        if (!container) return;

        let html = `
            <h3 class="fw-bold mb-4">
                Feed Kota (Publik)
            </h3>

            <div class="row g-3">
        `;

        response.data.results.forEach(report => {

            let badgeColor = "warning";
            let progressBarColor = "warning";
            let progress = 25;

            if (report.status === "VERIFIED") {
                badgeColor = "info";
                progressBarColor = "info";
                progress = 50;
            }

            if (report.status === "IN_PROGRESS") {
                badgeColor = "primary";
                progressBarColor = "primary";
                progress = 75;
            }

            if (report.status === "RESOLVED") {
                badgeColor = "success";
                progressBarColor = "success";
                progress = 100;
            }

            html += `

            <div class="col-12 col-lg-6">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body p-3">

                        <div class="d-flex justify-content-between align-items-center">

                            <span class="badge bg-${badgeColor}">
                                ${report.status}
                            </span>

                            <small class="text-muted">
                                ${report.category}
                            </small>

                        </div>

                        <h5 class="fw-bold mt-2 mb-2">
                            ${report.title}
                        </h5>

                        <p class="text-muted small mb-2">

                            ${
                                report.description.length > 60
                                ? report.description.substring(0, 60) + "..."
                                : report.description
                            }

                        </p>

                        <hr class="my-2">

                        <div class="small">
                            <strong>Lokasi:</strong>
                            ${report.location}
                        </div>

                        <div class="small mb-2">
                            <strong>Oleh:</strong>
                            ${report.reporter}
                        </div>

                        <small class="fw-bold">
                            Progress
                        </small>

                        <div
                            class="progress mt-1"
                            style="height:8px;">

                            <div
                                class="progress-bar bg-${progressBarColor}"
                                style="width:${progress}%">
                            </div>

                        </div>

                        <div class="text-end">

                            <small
                                class="text-primary fw-bold">

                                ${progress}%

                            </small>

                        </div>

                    </div>

                </div>

            </div>
            `;

        });

        html += `

            </div>

            <div class="d-flex justify-content-center align-items-center py-4">

                <button
                    class="btn btn-outline-secondary me-3"
                    onclick="prevPage()"
                    ${!response.data.previous ? "disabled" : ""}>

                    <i class="bi bi-chevron-left"></i>
                    Previous

                </button>

                <span class="badge bg-primary fs-6">

                    Halaman ${currentPage}

                </span>

                <button
                    class="btn btn-outline-primary ms-3"
                    onclick="nextPage()"
                    ${!response.data.next ? "disabled" : ""}>

                    Next
                    <i class="bi bi-chevron-right"></i>

                </button>

            </div>
        `;

        container.innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

async function loadStatistics() {

    try {

        const response =
            await requestAPI(
                "/api/reports/?tab=my_reports"
            );

        console.log("STAT RESPONSE:", response);
        console.log("STAT DATA:", response.data);

        const reports =
            response.data.results || [];

        console.log("REPORTS:", reports);

        const total =
            reports.length;

        const draft =
            reports.filter(
                r => r.status === "DRAFT"
            ).length;

        const reported =
            reports.filter(
                r => r.status === "REPORTED"
            ).length;

        const verified =
            reports.filter(
                r => r.status === "VERIFIED"
            ).length;

        const progress =
            reports.filter(
                r => r.status === "IN_PROGRESS"
            ).length;

        const resolved =
            reports.filter(
                r => r.status === "RESOLVED"
            ).length;

        // Card statistik

        if (document.getElementById("totalReports")) {
            document.getElementById("totalReports").innerText = total;
        }

        if (document.getElementById("draftReports")) {
            document.getElementById("draftReports").innerText = draft;
        }

        if (document.getElementById("reportedReports")) {
            document.getElementById("reportedReports").innerText = reported;
        }

        // Sidebar statistik

        if (document.getElementById("sidebarDraft")) {
            document.getElementById("sidebarDraft").innerText = draft;
        }

        if (document.getElementById("sidebarReported")) {
            document.getElementById("sidebarReported").innerText = reported;
        }

        if (document.getElementById("sidebarVerified")) {
            document.getElementById("sidebarVerified").innerText = verified;
        }

        if (document.getElementById("sidebarProgress")) {
            document.getElementById("sidebarProgress").innerText = progress;
        }

        if (document.getElementById("sidebarResolved")) {
            document.getElementById("sidebarResolved").innerText = resolved;
        }

    } catch (error) {

        console.error("LOAD STATISTICS ERROR:", error);

    }

}

function nextPage() {

    currentPage++;

    if (currentTab === "my_reports") {

        loadMyReports();

    } else {

        loadFeed();

    }

}

function prevPage() {

    if (currentPage > 1) {

        currentPage--;

    }

    if (currentTab === "my_reports") {

        loadMyReports();

    } else {

        loadFeed();

    }

}

function renderNavbar() {

    const token =
        localStorage.getItem(
            "access_token"
        );

    const navMenu =
        document.getElementById(
            "nav-menu"
        );

    if (!navMenu) return;

    if (!token) {

        navMenu.innerHTML = `

            <a
                href="#login"
                class="btn btn-outline-light btn-sm me-2">

                <i class="bi bi-box-arrow-in-right me-1"></i>
                Login

            </a>

            <a
                href="#register"
                class="btn btn-light btn-sm">

                <i class="bi bi-person-plus me-1"></i>
                Daftar

            </a>

        `;

    } else {

        navMenu.innerHTML = "";

    }

}

window.addEventListener(
    "load",
    renderNavbar
);

const btnMyReportsHome =
    document.getElementById(
        "btnMyReportsHome"
    );

if (btnMyReportsHome) {

    btnMyReportsHome.onclick =
        function () {

            loadMyReports();

        };

}

const btnFeedHome =
    document.getElementById(
        "btnFeedHome"
    );

if (btnFeedHome) {

    btnFeedHome.onclick =
        function () {

            loadFeed();

        };

}
