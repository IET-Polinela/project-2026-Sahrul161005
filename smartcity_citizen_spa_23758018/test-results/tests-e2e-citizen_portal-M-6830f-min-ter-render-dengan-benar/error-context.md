# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\citizen_portal.spec.js >> Modul 5: Interaktivitas UI (UI-01 through UI-06) >> UI-01: Chart.js di Dashboard Admin ter-render dengan benar
- Location: tests\e2e\citizen_portal.spec.js:636:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#reportedTable')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#reportedTable')

```

```yaml
- navigation:
  - link "🌆 CivicTrack":
    - /url: /
  - list:
    - listitem:
      - link "Login":
        - /url: /login/
    - listitem:
      - link "Register":
        - /url: /register/
- heading "📊 Dashboard Statistik" [level=2]
- heading "103" [level=3]
- paragraph: Total Laporan
- heading "21" [level=3]
- paragraph: Dalam Proses
- heading "25" [level=3]
- paragraph: Selesai
- heading "78" [level=3]
- paragraph: Aktif
- text: Distribusi Status Laporan Distribusi Kategori
- separator
- heading "📌 Laporan Terbaru" [level=4]
- text: 🔴 REPORTED
- list:
  - listitem: "Trotoar Rusak #99"
  - listitem: "Trotoar Rusak #95"
  - listitem: "Lampu Jalan Mati #91"
  - listitem: "Drainase Tersumbat #88"
  - listitem: "Sampah Menumpuk #84"
- text: 🟢 RESOLVED
- list:
  - listitem: "Jalan Berlubang #98"
  - listitem: "Kemacetan Lalu Lintas #90"
  - listitem: "Lampu Jalan Mati #87"
  - listitem: "Jalan Berlubang #86"
  - listitem: "Drainase Tersumbat #80"
- contentinfo: © 2026 CivicTrack Smart City System
```

# Test source

```ts
  599 | // #############################################################################
  600 | 
  601 | test.describe('Modul 5: Interaktivitas UI (UI-01 through UI-06)', () => {
  602 |     // =========================================================================
  603 |     // PENGANTAR MODUL
  604 |     // =========================================================================
  605 |     // Test UI memverifikasi bahwa elemen-elemen antarmuka berfungsi dengan baik
  606 |     // dari perspektif pengguna akhir. Ini mencakup:
  607 |     //
  608 |     // 1. Rendering visual (chart, tabel, modal)
  609 |     // 2. Interaksi pengguna (klik, ketik, scroll)
  610 |     // 3. Respons dinamis (AJAX, filtering, pagination)
  611 |     // 4. Responsive design (tampilan mobile vs desktop)
  612 |     // =========================================================================
  613 | 
  614 |     // =========================================================================
  615 |     // TEST CASE: UI-01
  616 |     // =========================================================================
  617 |     // JUDUL:
  618 |     //   Chart.js Rendering: Grafik statistik dashboard admin ter-render
  619 |     //
  620 |     // SKENARIO:
  621 |     //   Admin login ke portal admin, navigasi ke halaman /dashboard/,
  622 |     //   tunggu Chart.js selesai merender, dan verifikasi bahwa elemen
  623 |     //   canvas chart (statusChart dan categoryChart) ada dan terlihat.
  624 |     //
  625 |     // KONSEP TEKNIS:
  626 |     //   - Chart.js merender grafik ke elemen <canvas> HTML5
  627 |     //   - Dashboard mengambil data dari /dashboard/api/data/ via fetch()
  628 |     //   - Chart diinisialisasi setelah data berhasil di-fetch
  629 |     //
  630 |     // REFERENSI KODE:
  631 |     //   Lihat dashboard.html baris 47-74:
  632 |     //     - <canvas id="statusChart"> → Chart.js doughnut chart
  633 |     //     - <canvas id="categoryChart"> → Chart.js bar chart
  634 |     //     - fetch('/dashboard/api/data/') → data source
  635 |     // =========================================================================
  636 |     test('UI-01: Chart.js di Dashboard Admin ter-render dengan benar', async ({ page }) => {
  637 |         // -------------------------------------------------------------------
  638 |         // LANGKAH 1: Login ke portal admin
  639 |         // -------------------------------------------------------------------
  640 |         // Menggunakan helper function loginAdmin yang sudah kita buat
  641 |         await loginAdmin(page, TEST_ADMIN_USERNAME, TEST_ADMIN_PASSWORD);
  642 | 
  643 |         // -------------------------------------------------------------------
  644 |         // LANGKAH 2: Navigasi ke halaman dashboard
  645 |         // -------------------------------------------------------------------
  646 |         await page.goto(`${BASE_URL}/dashboard/`);
  647 | 
  648 |         // Tunggu halaman selesai dimuat sepenuhnya
  649 |         await page.waitForLoadState('networkidle');
  650 | 
  651 |         // -------------------------------------------------------------------
  652 |         // LANGKAH 3: Tunggu Chart.js selesai merender
  653 |         // -------------------------------------------------------------------
  654 |         // Chart.js merender secara asinkron setelah data di-fetch dari API.
  655 |         // Kita perlu menunggu:
  656 |         //   1. Fetch ke /dashboard/api/data/ selesai
  657 |         //   2. new Chart() dipanggil dan canvas di-render
  658 |         //
  659 |         // Strategi: Tunggu elemen canvas terlihat di viewport
  660 |         // -------------------------------------------------------------------
  661 |         const statusChartCanvas  = page.locator('#statusChart');
  662 |         const categoryChartCanvas = page.locator('#categoryChart');
  663 | 
  664 |         // -------------------------------------------------------------------
  665 |         // LANGKAH 4: Verifikasi elemen canvas ada dan terlihat
  666 |         // -------------------------------------------------------------------
  667 |         // toBeVisible() memeriksa bahwa elemen:
  668 |         //   - Ada di DOM
  669 |         //   - Tidak di-hidden (display:none, visibility:hidden)
  670 |         //   - Memiliki dimensi > 0 (width dan height)
  671 |         //
  672 |         await expect(statusChartCanvas).toBeVisible({ timeout: 15000 });
  673 |         await expect(categoryChartCanvas).toBeVisible({ timeout: 15000 });
  674 | 
  675 |         // -------------------------------------------------------------------
  676 |         // LANGKAH 5: Verifikasi tambahan - cek bahwa canvas sudah di-render
  677 |         //            oleh Chart.js (canvas memiliki konten/grafik)
  678 |         // -------------------------------------------------------------------
  679 |         // Cara mendeteksi Chart.js telah merender: periksa apakah ada
  680 |         // instance Chart yang terkait dengan canvas element.
  681 |         //
  682 |         // Chart.js menyimpan referensi instance di Chart.instances
  683 |         const chartsRendered = await page.evaluate(() => {
  684 |             // Cek apakah Chart (library) tersedia di window global
  685 |             if (typeof Chart === 'undefined') return false;
  686 | 
  687 |             // Chart.instances menyimpan semua chart yang telah dibuat
  688 |             // Di Chart.js v4+, ini adalah objek dengan key = chart id
  689 |             const instances = Object.keys(Chart.instances || {});
  690 |             return instances.length >= 2; // Minimal 2 chart (status + category)
  691 |         });
  692 | 
  693 |         expect(chartsRendered).toBe(true);
  694 | 
  695 |         // -------------------------------------------------------------------
  696 |         // LANGKAH 6: Verifikasi tabel data juga ada
  697 |         // -------------------------------------------------------------------
  698 |         // Dashboard juga menampilkan 2 tabel: reportedTable dan resolvedTable
> 699 |         await expect(page.locator('#reportedTable')).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  700 |         await expect(page.locator('#resolvedTable')).toBeVisible();
  701 | 
  702 |         console.log('[UI-01] ✅ Chart.js statusChart dan categoryChart berhasil ter-render');
  703 |     });
  704 | 
  705 |     // =========================================================================
  706 |     // TEST CASE: UI-02
  707 |     // =========================================================================
  708 |     // JUDUL:
  709 |     //   Live Search: Pencarian di halaman daftar laporan admin
  710 |     //
  711 |     // SKENARIO:
  712 |     //   Admin login, navigasi ke halaman daftar laporan (/reports/),
  713 |     //   ketik keyword pencarian di input #searchInput, dan verifikasi
  714 |     //   bahwa tabel ter-filter sesuai keyword (via AJAX call ke /search/).
  715 |     //
  716 |     // REFERENSI KODE:
  717 |     //   Lihat report_list.html baris 82-103:
  718 |     //     searchInput.addEventListener('keyup', function() {
  719 |     //         fetch(`/search/?q=${this.value}`)
  720 |     //         .then(res => res.json())
  721 |     //         .then(data => {
  722 |     //             tableBody.innerHTML = '';
  723 |     //             data.results.forEach(r => { ... });
  724 |     //         });
  725 |     //     });
  726 |     //
  727 |     // KONSEP TEKNIS:
  728 |     //   - Live Search: setiap keyup di input, AJAX request dikirim
  729 |     //   - page.waitForResponse(): menunggu respons HTTP tertentu
  730 |     //   - Filter dilakukan di server (endpoint /search/?q=...)
  731 |     // =========================================================================
  732 |     test('UI-02: Live Search pada daftar laporan admin berfungsi', async ({ page }) => {
  733 |         // -------------------------------------------------------------------
  734 |         // LANGKAH 1: Login ke portal admin
  735 |         // -------------------------------------------------------------------
  736 |         await loginAdmin(page, TEST_ADMIN_USERNAME, TEST_ADMIN_PASSWORD);
  737 | 
  738 |         // -------------------------------------------------------------------
  739 |         // LANGKAH 2: Navigasi ke halaman daftar laporan (/reports/ via main_app urls)
  740 |         // -------------------------------------------------------------------
  741 |         // Halaman ini berisi tabel semua laporan dan input pencarian.
  742 |         // URL /reports/ didefinisikan di main_app/urls.py
  743 |         await page.goto(`${BASE_URL}/reports/`);
  744 |         await page.waitForLoadState('networkidle');
  745 | 
  746 |         // -------------------------------------------------------------------
  747 |         // LANGKAH 3: Verifikasi elemen pencarian dan tabel ada
  748 |         // -------------------------------------------------------------------
  749 |         const searchInput = page.locator('#searchInput');
  750 |         const tableBody   = page.locator('#reportTableBody');
  751 | 
  752 |         await expect(searchInput).toBeVisible({ timeout: 10000 });
  753 |         await expect(tableBody).toBeVisible({ timeout: 10000 });
  754 | 
  755 |         // Catat jumlah baris awal sebelum pencarian
  756 |         const initialRowCount = await tableBody.locator('tr').count();
  757 |         console.log(`[UI-02] Jumlah baris awal: ${initialRowCount}`);
  758 | 
  759 |         // -------------------------------------------------------------------
  760 |         // LANGKAH 4: Ketik keyword pencarian dan tunggu respons AJAX
  761 |         // -------------------------------------------------------------------
  762 |         // Kita menggunakan Promise.all() untuk menjalankan dua operasi secara
  763 |         // bersamaan (concurrent):
  764 |         //   1. Menunggu respons HTTP dari /search/
  765 |         //   2. Mengetik keyword ke input field
  766 |         //
  767 |         // MENGAPA Promise.all()?
  768 |         // Jika kita ketik dulu baru tunggu response, response mungkin sudah
  769 |         // datang sebelum waitForResponse dipanggil → timeout.
  770 |         const searchKeyword = 'Lampu';
  771 | 
  772 |         // Mulai mendengarkan response spesifik untuk query pencarian 'Lampu'
  773 |         const responsePromise = page.waitForResponse(
  774 |             (response) => response.url().includes(`/search/?q=${searchKeyword}`) && response.status() === 200,
  775 |             { timeout: 15000 }
  776 |         );
  777 | 
  778 |         // Ketik keyword pencarian secara berurutan
  779 |         await searchInput.click();
  780 |         await searchInput.fill('');
  781 |         await searchInput.type(searchKeyword, { delay: 100 });
  782 | 
  783 |         // Tunggu hingga respon AJAX selesai diterima
  784 |         const searchResponse = await responsePromise;
  785 | 
  786 |         // -------------------------------------------------------------------
  787 |         // LANGKAH 5: Verifikasi respons AJAX berhasil
  788 |         // -------------------------------------------------------------------
  789 |         expect(searchResponse.status()).toBe(200);
  790 | 
  791 |         // Parse data JSON dari respons
  792 |         const responseData = await searchResponse.json();
  793 |         console.log(`[UI-02] Hasil pencarian "${searchKeyword}": ${responseData.results?.length || 0} item`);
  794 | 
  795 |         // -------------------------------------------------------------------
  796 |         // LANGKAH 6: Tunggu tabel diperbarui dan verifikasi
  797 |         // -------------------------------------------------------------------
  798 |         // Beri waktu untuk DOM update setelah data diterima
  799 |         await page.waitForTimeout(1000);
```