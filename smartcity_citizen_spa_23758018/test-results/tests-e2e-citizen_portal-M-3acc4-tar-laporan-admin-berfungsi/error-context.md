# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2e\citizen_portal.spec.js >> Modul 5: Interaktivitas UI (UI-01 through UI-06) >> UI-02: Live Search pada daftar laporan admin berfungsi
- Location: tests\e2e\citizen_portal.spec.js:732:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#searchInput')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('#searchInput')

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
- heading " Login CivicTrack" [level=4]
- text: Username 
- textbox "Masukkan username"
- text: Password 
- textbox "Masukkan password"
- button
- button " Login"
- text: Belum punya akun?
- link "Register":
  - /url: /register/
- contentinfo: © 2026 CivicTrack Smart City System
```

# Test source

```ts
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
  699 |         await expect(page.locator('#reportedTable')).toBeVisible();
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
> 752 |         await expect(searchInput).toBeVisible({ timeout: 10000 });
      |                                   ^ Error: expect(locator).toBeVisible() failed
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
  800 | 
  801 |         // Hitung jumlah baris setelah pencarian
  802 |         const filteredRowCount = await tableBody.locator('tr').count();
  803 |         console.log(`[UI-02] Jumlah baris setelah filter: ${filteredRowCount}`);
  804 | 
  805 |         // Verifikasi: jumlah baris setelah filter harus sesuai dengan data respons
  806 |         // Jika ada hasil, baris harus > 0
  807 |         if (responseData.results && responseData.results.length > 0) {
  808 |             expect(filteredRowCount).toBeGreaterThan(0);
  809 |             expect(filteredRowCount).toBe(responseData.results.length);
  810 |         }
  811 | 
  812 |         console.log('[UI-02] ✅ Live search berfungsi: input → AJAX → tabel terupdate');
  813 |     });
  814 | 
  815 |     // =========================================================================
  816 |     // TEST CASE: UI-03
  817 |     // =========================================================================
  818 |     // JUDUL:
  819 |     //   Pagination: Daftar laporan publik (Feed Kota) dibatasi maks 10 item
  820 |     //
  821 |     // SKENARIO:
  822 |     //   Dengan asumsi ada 25+ laporan di database, navigasi ke SPA #dashboard,
  823 |     //   klik tab "Feed Kota (Publik)", hitung jumlah kartu laporan di
  824 |     //   #listContainer, dan pastikan tidak lebih dari 10. Juga verifikasi
  825 |     //   bahwa kontrol pagination ada di #paginationContainer.
  826 |     //
  827 |     // KONSEP TEKNIS:
  828 |     //   - Pagination server-side: API mengembalikan data terpaginasi
  829 |     //   - app.js menggunakan page_size=10 sebagai default
  830 |     //   - totalPages dihitung dari: Math.ceil(count / 10)
  831 |     //
  832 |     // REFERENSI KODE:
  833 |     //   app.js baris 64: const response = await requestAPI(`/report/?tab=${tab}&page=${page}`)
  834 |     //   app.js baris 69: totalPages = Math.ceil(count / 10) || 1;
  835 |     //   app.js baris 230-264: renderPagination() → membuat navigasi halaman
  836 |     // =========================================================================
  837 |     test('UI-03: Pagination Feed Kota — maks 10 kartu, kontrol pagination muncul', async ({ page }) => {
  838 |         // -------------------------------------------------------------------
  839 |         // LANGKAH 1: Siapkan environment (navigasi ke SPA dan setup mock)
  840 |         // -------------------------------------------------------------------
  841 |         await page.goto(SPA_URL);
  842 |         await mockSPAApiUrl(page);
  843 | 
  844 |         // -------------------------------------------------------------------
  845 |         // LANGKAH 2: Simulasi login dengan menyimpan token
  846 |         // -------------------------------------------------------------------
  847 |         // Untuk test ini, kita perlu berada dalam state "login" agar bisa
  848 |         // mengakses dashboard. Kita gunakan mock API untuk token dan data.
  849 |         // -------------------------------------------------------------------
  850 | 
  851 |         // Hapus route interceptor sebelumnya
  852 |         await page.unroute('http://103.151.63.71:8013/api/**');
```