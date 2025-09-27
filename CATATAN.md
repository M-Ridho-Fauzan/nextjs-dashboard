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
