let editingReportId = null;
const pages = {

    login: `
        <div class="row justify-content-center">
            <div class="col-md-4">

                <div class="card shadow border-0">
                    <div class="card-body p-4">

                        <h3 class="text-center mb-4 fw-bold">
                            <i class="bi bi-person-circle me-2"></i>
                            Login Citizen
                        </h3>

                        <form id="login-form">

                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    placeholder="Masukkan username"
                                    required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Masukkan password"
                                    required>
                            </div>

                            <button
                                type="submit"
                                class="btn btn-primary w-100 fw-semibold">
                                Login
                            </button>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    `,

    dashboard: `
        <div class="row g-3">

            <div class="col-12 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">
                            <i class="bi bi-person-fill me-2"></i>
                            Citizen Menu
                        </h5>

                        <div class="d-grid gap-2">
                            <button id="btnOpenReportModal"
                                class="btn btn-outline-primary text-start">
                                <i class="bi bi-plus-circle me-2"></i>Buat Laporan
                            </button>
                            <button id="btnMyReports"
                                class="btn btn-outline-secondary w-100">
                                <i class="bi bi-card-list"></i>Riwayat Laporan
                            </button>
                            <button id="btnFeed"
                                class="btn btn-outline-info w-100">
                                <i class="bi bi-globe"></i> Feed Publik
                            </button>
                            <button class="btn btn-outline-danger text-start">
                                <i class="bi bi-box-arrow-right me-2"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="card shadow-sm border-0 mb-3">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <div>
                                <h3 class="fw-bold mb-1">Dashboard</h3>
                                <p class="text-muted mb-0">Selamat datang di Smart City Citizen Portal.</p>
                            </div>
                            <i class="bi bi-buildings-fill fs-1 text-primary"></i>
                        </div>

                        <div class="alert alert-primary mb-0">
                            Portal ini digunakan untuk mengirim laporan warga secara online.
                        </div>
                        <div id="report-list-container" class="mt-3"></div>
                    </div>
                </div>

                <div class="row g-3">

    <div class="col-12 col-md-4">
        <div class="card shadow-sm border-0 h-100 text-center">
            <div class="card-body">

                <i class="bi bi-file-earmark-text fs-1 text-primary"></i>

                <h5
                    id="totalReports"
                    class="fw-bold mt-2 mb-1">
                    0
                </h5>

                <small class="text-muted">
                    Total Laporan
                </small>

            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="card shadow-sm border-0 h-100 text-center">
            <div class="card-body">

                <i class="bi bi-hourglass-split fs-1 text-warning"></i>

                <h5
                    id="reportedReports"
                    class="fw-bold mt-2 mb-1">
                    0
                </h5>

                <small class="text-muted">
                    Reported
                </small>

            </div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="card shadow-sm border-0 h-100 text-center">
            <div class="card-body">

                <i class="bi bi-check-circle-fill fs-1 text-success"></i>

                <h5
                    id="draftReports"
                    class="fw-bold mt-2 mb-1">
                    0
                </h5>

                <small class="text-muted">
                    Draft
                </small>

            </div>
        </div>
    </div>

</div>

            <div class="col-12 col-lg-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">
                            <i class="bi bi-bell-fill me-2"></i>
                            Informasi
                        </h5>
                        <div class="small text-muted">
                            <p class="mb-2">• Gunakan menu untuk membuat laporan baru.</p>
                            <p class="mb-2">• Cek status laporan secara berkala.</p>
                            <p class="mb-0">• Login tetap tersimpan selama token masih aktif.</p>
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

    if (!btn) return;

    btn.addEventListener("click", () => {

        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    "reportModal"
                )
            );

        modal.show();

        // Tombol Draft
        const btnDraft =
            document.getElementById("btnDraft");

        if (btnDraft) {

            btnDraft.onclick = function () {
                createDraftReport();
            };

        }

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

    });

    // Riwayat Laporan
    const btnMyReports =
        document.getElementById(
            "btnMyReports"
        );

    if (btnMyReports) {

        btnMyReports.onclick = function () {
            loadMyReports();
        };

    }

    // Feed Publik
    const btnFeed =
        document.getElementById(
            "btnFeed"
        );

    if (btnFeed) {

        btnFeed.onclick = function () {
            loadFeed();
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
            "/api/reports/?tab=my_reports"
        );

        console.log(response);

        const container =
            document.getElementById(
                "report-list-container"
            );

        if (!container) return;

        let html = `
            <div class="card shadow-sm border-0">
                <div class="card-body">

                    <h5 class="fw-bold mb-3">
                        Riwayat Laporan Saya
                    </h5>
        `;

        response.data.results.forEach(report => {

            let badgeColor = "secondary";

            if (report.status === "DRAFT") {
                badgeColor = "warning";
            }

            if (report.status === "REPORTED") {
                badgeColor = "primary";
            }

            if (report.status === "VERIFIED") {
                badgeColor = "success";
            }

            html += `
                <div class="border rounded p-3 mb-3">

                    <h6 class="fw-bold">
                        ${report.title}
                    </h6>

                    <p class="mb-2">
                        ${report.description}
                    </p>

                    <span class="badge bg-${badgeColor}">
                        ${report.status}
                    </span>

                    ${
                        report.status === "DRAFT"
                        ?
                        `
                        <div class="mt-3">

                            <button
                                class="btn btn-sm btn-warning me-2"
                                onclick="editReport(${report.id})">

                                Edit

                            </button>

                            <button
                                class="btn btn-sm btn-danger"
                                onclick="deleteReport(${report.id})">

                                Hapus

                            </button>

                        </div>
                        `
                        :
                        ""
                    }

                </div>
            `;

        });

        html += `
                </div>
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
            "/api/reports/?tab=feed"
        );

        const container =
            document.getElementById(
                "report-list-container"
            );

        if (!container) return;

        let html = `
            <div class="card shadow-sm border-0">
                <div class="card-body">

                    <h5 class="fw-bold mb-3">
                        Feed Laporan Publik
                    </h5>
        `;

        response.data.results.forEach(report => {

            let badgeColor = "secondary";

            if (report.status === "REPORTED")
                badgeColor = "primary";

            if (report.status === "VERIFIED")
                badgeColor = "success";

            if (report.status === "IN_PROGRESS")
                badgeColor = "info";

            if (report.status === "RESOLVED")
                badgeColor = "dark";

            html += `
                <div class="border rounded p-3 mb-3">

                    <h6 class="fw-bold">
                        ${report.title}
                    </h6>

                    <p class="mb-2">
                        ${report.description}
                    </p>

                    <span class="badge bg-${badgeColor}">
                        ${report.status}
                    </span>

                </div>
            `;

        });

        html += `
                </div>
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

        const reports =
            response.data.results;

        const total =
            reports.length;

        const draft =
            reports.filter(
                r => r.status === "DRAFT"
            ).length;

        const reported =
            reports.filter(
                r =>
                    r.status === "REPORTED" ||
                    r.status === "VERIFIED" ||
                    r.status === "IN_PROGRESS" ||
                    r.status === "RESOLVED"
            ).length;

        document.getElementById(
            "totalReports"
        ).innerText = total;

        document.getElementById(
            "draftReports"
        ).innerText = draft;

        document.getElementById(
            "reportedReports"
        ).innerText = reported;

    } catch (error) {

        console.error(error);

    }

}