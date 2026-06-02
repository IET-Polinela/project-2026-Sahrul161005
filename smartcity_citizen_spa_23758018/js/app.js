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
                            <button class="btn btn-outline-primary text-start">
                                <i class="bi bi-plus-circle me-2"></i>Buat Laporan
                            </button>
                            <button class="btn btn-outline-secondary text-start">
                                <i class="bi bi-journal-text me-2"></i>Riwayat Laporan
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
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <div class="card shadow-sm border-0 h-100 text-center">
                            <div class="card-body">
                                <i class="bi bi-file-earmark-text fs-1 text-primary"></i>
                                <h5 class="fw-bold mt-2 mb-1">12</h5>
                                <small class="text-muted">Total Laporan</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div class="card shadow-sm border-0 h-100 text-center">
                            <div class="card-body">
                                <i class="bi bi-hourglass-split fs-1 text-warning"></i>
                                <h5 class="fw-bold mt-2 mb-1">3</h5>
                                <small class="text-muted">Menunggu Verifikasi</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div class="card shadow-sm border-0 h-100 text-center">
                            <div class="card-body">
                                <i class="bi bi-check-circle-fill fs-1 text-success"></i>
                                <h5 class="fw-bold mt-2 mb-1">9</h5>
                                <small class="text-muted">Selesai</small>
                            </div>
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