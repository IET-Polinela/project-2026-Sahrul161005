# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\citizen_portal.spec.js >> Modul 5: Interaktivitas UI (UI-01 through UI-06) >> UI-03: Pagination Feed Kota — maks 10 kartu, kontrol pagination muncul
- Location: tests\e2e\citizen_portal.spec.js:837:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#listContainer')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#listContainer')

```

```yaml
- navigation:
  - link " IET City Portal Smart City Citizen Reporting System":
    - /url: "#"
  - link " Login":
    - /url: "#login"
  - link " Daftar":
    - /url: "#register"
- main:
  - heading "Smart City Citizen Portal" [level=1]
  - paragraph: Laporkan masalah kota secara cepat, transparan, dan real-time.
  - text: 🚦 Pelaporan Infrastruktur 🛣️ Monitoring Status Laporan 📍 Pelacakan Lokasi Masalah 🔔 Update Progress Real-Time 
  - heading "Login Citizen" [level=2]
  - paragraph: Masuk ke akun Anda
  - text: Username
  - textbox "Masukkan username": citi
  - text: Password
  - textbox "Masukkan password"
  - button "Login"
  - text: Belum punya akun?
  - link "Daftar":
    - /url: "#register"
- contentinfo: © 2026 IET City Portal | Smart City Citizen Reporting System
```

# Test source

```ts
  834  |     //   app.js baris 69: totalPages = Math.ceil(count / 10) || 1;
  835  |     //   app.js baris 230-264: renderPagination() → membuat navigasi halaman
  836  |     // =========================================================================
  837  |     test('UI-03: Pagination Feed Kota — maks 10 kartu, kontrol pagination muncul', async ({ page }) => {
  838  |         // -------------------------------------------------------------------
  839  |         // LANGKAH 1: Siapkan environment (navigasi ke SPA dan setup mock)
  840  |         // -------------------------------------------------------------------
  841  |         await page.goto(SPA_URL);
  842  |         await mockSPAApiUrl(page);
  843  | 
  844  |         // -------------------------------------------------------------------
  845  |         // LANGKAH 2: Simulasi login dengan menyimpan token
  846  |         // -------------------------------------------------------------------
  847  |         // Untuk test ini, kita perlu berada dalam state "login" agar bisa
  848  |         // mengakses dashboard. Kita gunakan mock API untuk token dan data.
  849  |         // -------------------------------------------------------------------
  850  | 
  851  |         // Hapus route interceptor sebelumnya
  852  |         await page.unroute('http://103.151.63.71:8013/api/**');
  853  | 
  854  |         // Buat data mock: 25 laporan dummy untuk simulasi pagination
  855  |         const mockReports = [];
  856  |         for (let i = 1; i <= 25; i++) {
  857  |             mockReports.push({
  858  |                 id: i,
  859  |                 title: `Laporan Test #${i}`,
  860  |                 description: `Deskripsi laporan pengujian nomor ${i}`,
  861  |                 category: i % 2 === 0 ? 'Infrastruktur' : 'Kebersihan',
  862  |                 location: `Lokasi Test ${i}`,
  863  |                 status: ['REPORTED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED'][i % 4],
  864  |                 reporter_name: 'testwarga',
  865  |                 is_owner: false,
  866  |                 updated_at: new Date().toISOString()
  867  |             });
  868  |         }
  869  | 
  870  |         // Mock API endpoint untuk report list (feed tab, halaman 1)
  871  |         await page.route('**/api/report/**', async (route) => {
  872  |             const url = route.request().url();
  873  | 
  874  |             if (url.includes('tab=feed') || url.includes('tab=my_reports')) {
  875  |                 // Ambil nomor halaman dari URL (default: 1)
  876  |                 const pageMatch = url.match(/page=(\d+)/);
  877  |                 const pageNum = pageMatch ? parseInt(pageMatch[1]) : 1;
  878  | 
  879  |                 // Hitung subset data untuk halaman ini (10 per halaman)
  880  |                 const pageSize = 10;
  881  |                 const startIdx = (pageNum - 1) * pageSize;
  882  |                 const endIdx = startIdx + pageSize;
  883  |                 const pageData = mockReports.slice(startIdx, endIdx);
  884  | 
  885  |                 await route.fulfill({
  886  |                     status: 200,
  887  |                     contentType: 'application/json',
  888  |                     body: JSON.stringify({
  889  |                         count: mockReports.length,   // Total: 25
  890  |                         results: pageData,            // 10 per halaman
  891  |                         next: endIdx < mockReports.length ? 'next_page_url' : null,
  892  |                         previous: pageNum > 1 ? 'prev_page_url' : null
  893  |                     })
  894  |                 });
  895  |             } else {
  896  |                 // Untuk endpoint lain, kembalikan respons kosong
  897  |                 await route.fulfill({
  898  |                     status: 200,
  899  |                     contentType: 'application/json',
  900  |                     body: JSON.stringify({ count: 0, results: [] })
  901  |                 });
  902  |             }
  903  |         });
  904  | 
  905  |         // Simpan token valid ke localStorage agar bisa akses dashboard
  906  |         await setupAuthTokens(page, VALID_ACCESS_TOKEN, EXPIRED_REFRESH_TOKEN);
  907  | 
  908  |         // Handle alert dialog (jika muncul)
  909  |         page.on('dialog', async (dialog) => await dialog.accept());
  910  | 
  911  |         // -------------------------------------------------------------------
  912  |         // LANGKAH 3: Navigasi ke dashboard
  913  |         // -------------------------------------------------------------------
  914  |         await page.goto(`${SPA_URL}#dashboard`);
  915  |         await page.waitForSelector('#btnBukaModal', { state: 'visible', timeout: 10000 });
  916  | 
  917  |         // -------------------------------------------------------------------
  918  |         // LANGKAH 4: Klik tab "Feed Kota (Publik)"
  919  |         // -------------------------------------------------------------------
  920  |         // Tab ini ada di router.js (template #dashboard), id='tabFeedKota'
  921  |         const tabFeedKota = page.locator('#tabFeedKota');
  922  |         await expect(tabFeedKota).toBeVisible();
  923  |         await tabFeedKota.click();
  924  | 
  925  |         // Tunggu data dimuat (AJAX call + render)
  926  |         await page.waitForTimeout(2000);
  927  | 
  928  |         // -------------------------------------------------------------------
  929  |         // LANGKAH 5: Hitung jumlah kartu laporan di listContainer
  930  |         // -------------------------------------------------------------------
  931  |         // Setiap laporan dirender sebagai <div class="col"> di dalam #listContainer
  932  |         // (lihat app.js renderList() baris 109: card.className = 'col')
  933  |         const listContainer = page.locator('#listContainer');
> 934  |         await expect(listContainer).toBeVisible();
       |                                     ^ Error: expect(locator).toBeVisible() failed
  935  | 
  936  |         const reportCards = listContainer.locator('.col');
  937  |         const cardCount = await reportCards.count();
  938  | 
  939  |         // Assertion: jumlah kartu tidak boleh lebih dari 10
  940  |         expect(cardCount).toBeLessThanOrEqual(10);
  941  |         expect(cardCount).toBeGreaterThan(0);
  942  | 
  943  |         console.log(`[UI-03] Jumlah kartu di Feed Kota: ${cardCount} (maks 10)`);
  944  | 
  945  |         // -------------------------------------------------------------------
  946  |         // LANGKAH 6: Verifikasi kontrol pagination muncul
  947  |         // -------------------------------------------------------------------
  948  |         // Karena ada 25 laporan dan 10 per halaman, harus ada 3 halaman.
  949  |         // renderPagination() (app.js baris 230) akan membuat navigasi halaman.
  950  |         const paginationContainer = page.locator('#paginationContainer');
  951  |         await expect(paginationContainer).toBeVisible();
  952  | 
  953  |         // Verifikasi ada tombol navigasi halaman (page numbers, prev, next)
  954  |         const paginationButtons = paginationContainer.locator('.page-item');
  955  |         const paginationCount = await paginationButtons.count();
  956  | 
  957  |         // Harus ada minimal 3 tombol: Sebelumnya, 1, 2, 3, Selanjutnya = 5 tombol
  958  |         expect(paginationCount).toBeGreaterThanOrEqual(3);
  959  | 
  960  |         console.log(`[UI-03] ✅ Pagination terverifikasi: ${cardCount} kartu, ${paginationCount} tombol navigasi`);
  961  |     });
  962  | 
  963  |     // =========================================================================
  964  |     // TEST CASE: UI-04
  965  |     // =========================================================================
  966  |     // JUDUL:
  967  |     //   Modal Dialog: Tombol "Buat Laporan Baru" membuka modal #reportModal
  968  |     //
  969  |     // SKENARIO:
  970  |     //   Login ke SPA, navigasi ke #dashboard, klik tombol #btnBukaModal,
  971  |     //   dan verifikasi bahwa modal Bootstrap #reportModal muncul (visible).
  972  |     //
  973  |     // REFERENSI KODE:
  974  |     //   - app.js baris 282-292: setupDashboardEvents() → pasang event listener
  975  |     //     btnBukaModal.addEventListener('click', function() {
  976  |     //         reportModalInstance.show();
  977  |     //     });
  978  |     //   - index.html baris 31: <div class="modal fade" id="reportModal">
  979  |     //
  980  |     // KONSEP TEKNIS:
  981  |     //   - Bootstrap Modal: overlay dialog yang dimunculkan dengan JS
  982  |     //   - Class 'show' ditambahkan ke modal saat ditampilkan
  983  |     //   - Modal instance dibuat dengan: new bootstrap.Modal(element)
  984  |     // =========================================================================
  985  |     test('UI-04: Klik tombol Buat Laporan → modal #reportModal muncul', async ({ page }) => {
  986  |         // -------------------------------------------------------------------
  987  |         // LANGKAH 1: Setup state login dan mock API
  988  |         // -------------------------------------------------------------------
  989  |         await page.goto(SPA_URL);
  990  | 
  991  |         // Hapus route interceptor sebelumnya
  992  |         await page.unroute('http://103.151.63.71:8013/api/**');
  993  | 
  994  |         // Mock semua API calls agar tidak gagal
  995  |         await page.route('**/api/**', async (route) => {
  996  |             // Untuk endpoint report, kembalikan data kosong
  997  |             await route.fulfill({
  998  |                 status: 200,
  999  |                 contentType: 'application/json',
  1000 |                 body: JSON.stringify({ count: 0, results: [] })
  1001 |             });
  1002 |         });
  1003 | 
  1004 |         // Simpan token agar bisa akses dashboard
  1005 |         await setupAuthTokens(page, VALID_ACCESS_TOKEN, EXPIRED_REFRESH_TOKEN);
  1006 | 
  1007 |         // Handle dialog alert (jika muncul)
  1008 |         page.on('dialog', async (dialog) => await dialog.accept());
  1009 | 
  1010 |         // -------------------------------------------------------------------
  1011 |         // LANGKAH 2: Navigasi ke dashboard
  1012 |         // -------------------------------------------------------------------
  1013 |         await page.goto(`${SPA_URL}#dashboard`);
  1014 | 
  1015 |         // Tunggu tombol "Buat Laporan Baru" muncul
  1016 |         const btnBukaModal = page.locator('#btnBukaModal');
  1017 |         await expect(btnBukaModal).toBeVisible({ timeout: 10000 });
  1018 | 
  1019 |         // -------------------------------------------------------------------
  1020 |         // LANGKAH 3: Verifikasi modal belum terlihat sebelum diklik
  1021 |         // -------------------------------------------------------------------
  1022 |         const reportModal = page.locator('#reportModal');
  1023 | 
  1024 |         // Modal awalnya memiliki class "modal fade" (tanpa "show")
  1025 |         // Sehingga tidak terlihat oleh pengguna
  1026 |         await expect(reportModal).not.toBeVisible();
  1027 | 
  1028 |         // -------------------------------------------------------------------
  1029 |         // LANGKAH 4: Klik tombol "Buat Laporan Baru"
  1030 |         // -------------------------------------------------------------------
  1031 |         await btnBukaModal.click();
  1032 | 
  1033 |         // -------------------------------------------------------------------
  1034 |         // LANGKAH 5: Tunggu dan verifikasi modal muncul
```