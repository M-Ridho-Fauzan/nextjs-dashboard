# Catatan

## Folder structure

- **`/app`** : Berisi semua rute, komponen, dan logika untuk aplikasi Anda. Di sinilah sebagian besar pekerjaan Anda akan dilakukan.
- **`/app/lib`** : Berisi fungsi yang digunakan dalam aplikasi Anda, seperti fungsi utilitas yang dapat digunakan kembali dan fungsi pengambilan data.
- **`/app/ui`** : Berisi semua komponen UI untuk aplikasi Anda, seperti kartu, tabel, dan formulir. Untuk menghemat waktu, kami telah menyiapkan gaya komponen-komponen ini untuk Anda.
- **`/public`** : Berisi semua aset statis untuk aplikasi Anda, seperti gambar.
- **Berkas Konfigurasi** : Anda juga akan melihat berkas konfigurasi seperti `next.config.ts` di root aplikasi Anda. Sebagian besar berkas ini dibuat dan dikonfigurasikan sebelumnya saat Anda memulai proyek baru menggunakan `create-next-app`. Anda tidak perlu mengubahnya dalam kursus ini.

## Data tempat penampung (Handling Data from DB)

- Saat Anda membangun antarmuka pengguna, ada baiknya memiliki beberapa data pengganti. Jika database atau API belum tersedia, Anda dapat:
- Gunakan data placeholder dalam format JSON atau sebagai objek JavaScript.
  Gunakan layanan pihak ketiga seperti [mockAPI](https://mockapi.io/).

> proyek ini, kami telah menyediakan beberapa data placeholder di `app/lib/placeholder-data.ts`. Setiap objek JavaScript dalam file tersebut mewakili sebuah tabel di database Anda.

> Jika Anda seorang pengembang TypeScript:
>
> - Kami mendeklarasikan tipe data secara manual, tetapi untuk keamanan tipe yang lebih baik, kami merekomendasikan [`Prisma`](https://www.prisma.io/) atau [`Drizzle`](https://orm.drizzle.team/), yang secara otomatis menghasilkan tipe berdasarkan skema basis data Anda.
> - **Next.js** mendeteksi apakah proyek Anda menggunakan TypeScript dan secara otomatis menginstal paket dan konfigurasi yang diperlukan. **Next.js** juga dilengkapi dengan plugin TypeScript.untuk editor kode Anda, untuk membantu pelengkapan otomatis dan keamanan tipe.

---

Alat daring yang bagus untuk mengoptimalkan SVG adalah [SVGOMG](https://jakearchibald.github.io/svgomg/) . Untuk PNG, ada [ImageOptim daring](https://imageoptim.com/online) atau [Squoosh](https://squoosh.app/) (Bisa juga untuk format JPEG, konversi ke AVIF) .

> `<Link>` memungkinkan Anda melakukan navigasi sisi klien dengan JavaScript.

---

Mengambil data dengan Komponen Server merupakan pendekatan yang relatif baru dan ada beberapa manfaat penggunaannya:

- Komponen Server mendukung JavaScript Promises, menyediakan solusi untuk tugas asinkron seperti pengambilan data secara native. Anda dapat menggunakan `async`/`await` sintaksis tanpa perlu `useEffect`, `useState` atau pustaka pengambilan data lainnya.
- Komponen Server berjalan di server, jadi Anda dapat menyimpan pengambilan data dan logika yang mahal di server, dan hanya mengirimkan hasilnya ke klien.
- Karena Komponen Server berjalan di server, Anda dapat langsung mengakses database tanpa lapisan API tambahan. Ini menghemat waktu Anda karena tidak perlu menulis dan memelihara kode tambahan.

---

### Pola Pengambilan data

ada banyak pola pengambilan data, dan default (karena tidak di sengaja) dari pengambilan data itu adalah waterfal, atau menunggu fetch sebelum nya untuk memulai fetch selanjut nya

**Akar masalah berasal dari logic ini:**

- Permintaan data secara tidak sengaja memblokir satu sama lain, sehingga menciptakan permintaan air terjun .
- Secara default, Next.js melakukan pra-render rute untuk meningkatkan performa, yang disebut Rendering Statis . Jadi, jika data Anda berubah, perubahan tersebut tidak akan terlihat di dasbor Anda.

Ini adalah salah satu contoh waterfall fetching:

```tsx
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

Tapi itu bakan selalu buruk, karena bisa saja pola tersebut memang yang di inginkan

#### Pengambilan data Paralel

Cara umum untuk menghindari waterfall adalah dengan memulai semua permintaan data secara bersamaan - secara paralel.

Dalam JavaScript, Anda dapat menggunakan `Promise.all()` atau `Promise.allSettled()` fungsi untuk memulai semua janji secara bersamaan. Misalnya, dalam `data.ts`, kita menggunakan `Promise.all()` fungsi `fetchCardData()`:

```tsx
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([  <----- ini
      invoiceCountPromise, <---------------- ini
      customerCountPromise, <--------------- ini
      invoiceStatusPromise, <--------------- ini
    ]);  <---------------------------------- ini
    // ...
  }
}
```

Dengan menggunakan pola tersebut, Anda dapat:

- Mulailah menjalankan semua pengambilan data pada saat yang sama, yang lebih cepat daripada menunggu setiap permintaan selesai dalam bentuk waterfall.
- Gunakan pola JavaScript asli yang dapat diterapkan ke pustaka atau kerangka kerja apa pun.

> **Tapi masih ada masalah yaitu:** Apa yang terjadi jika satu permintaan data lebih lambat daripada yang lainnya?

## Apa itu rendering statis dan dinamis

### Apa itu rendering statis?

Dengan rendering statis, pengambilan dan rendering data terjadi di server pada waktu pembuatan (ketika Anda menyebarkan) atau ketika melakukan validasi ulang data .
Setiap kali pengguna mengunjungi aplikasi Anda, hasil yang di-cache akan ditampilkan. dan kelebihan lain nya adalah:

- Situs web lebih cepat
- beban server lebih rendah
- SEO

> **Rendering statis berguna untuk UI tanpa data atau data yang dibagikan antar pengguna** , seperti postingan blog statis atau halaman produk. Rendering statis mungkin kurang cocok untuk dasbor yang memiliki data personalisasi dan diperbarui secara berkala.

### Apa itu rendering dinamis?

Dengan rendering dinamis, konten dirender di server untuk setiap pengguna pada waktu yang diminta (ketika pengguna mengunjungi halaman). Ada beberapa manfaat rendering dinamis:

- **Data Real-Time** - Rendering dinamis memungkinkan aplikasi Anda menampilkan data real-time atau yang sering diperbarui. Ini ideal untuk aplikasi yang datanya sering berubah.
- **Konten Khusus Pengguna** - Lebih mudah untuk menyajikan konten yang dipersonalisasi, seperti dasbor atau profil pengguna, dan memperbarui data berdasarkan interaksi pengguna.
- **Permintaan Informasi Waktu** - Rendering dinamis memungkinkan Anda mengakses informasi yang hanya dapat diketahui pada waktu permintaan, seperti cookie atau parameter pencarian URL.

---

> Dengan `(overview)` folder, loading hanya spesifik ke page utama saja dari parent `(overview)` itu.

ada yang dinamanakan:

- Apa itu Partial Prerendering.
- Cara kerja Pra-rendering Sebagian.

> Suspense digunakan sebagai pembatas antara kode statis dan dinamis.

Untuk konfigurasi prarender, [klik ini](https://nextjs.org/learn/dashboard-app/partial-prerendering#implementing-partial-prerendering).

### `defaultValue` vs. `value` / (Terkendali) vs. (Tidak Terkendali)

- Jika Anda menggunakan status untuk mengelola nilai input, Anda akan menggunakan `value` atribut tersebut untuk menjadikannya komponen terkontrol. Ini berarti React akan mengelola status input tersebut.
- Namun, karena Anda tidak menggunakan status, Anda dapat menggunakan `defaultValue`. Ini berarti input asli akan mengelola statusnya sendiri. Hal ini tidak masalah karena Anda menyimpan kueri penelusuran ke URL, bukan status.

### Cara Kerja Debouncing:

- **Peristiwa Pemicu** : Saat suatu peristiwa yang seharusnya di-debounce (seperti penekanan tombol pada kotak pencarian) terjadi, penghitung waktu dimulai.
- **Tunggu** : Jika kejadian baru terjadi sebelum waktu berakhir, waktu akan diatur ulang.
- **Eksekusi** : Jika penghitung waktu mencapai akhir hitungan mundurnya, fungsi debounced dieksekusi.
