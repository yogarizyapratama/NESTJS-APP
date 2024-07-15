Penjelasan Script Prisma
prisma:generate

Perintah: npx prisma generate
Deskripsi: Menghasilkan Prisma Client berdasarkan skema di schema.prisma.
prisma:migrate

Perintah: npx prisma migrate dev --name init
Deskripsi: Membuat dan menjalankan migrasi di lingkungan pengembangan dengan nama init.
prisma:migrate:deploy

Perintah: npx prisma migrate deploy
Deskripsi: Menerapkan semua migrasi yang tertunda di lingkungan produksi.
prisma:migrate:reset

Perintah: npx prisma migrate reset
Deskripsi: Menghapus semua data dari database dan menjalankan kembali semua migrasi dari awal. Biasanya digunakan dalam pengembangan.
prisma:migrate:status

Perintah: npx prisma migrate status
Deskripsi: Memeriksa status migrasi yang diterapkan dan tertunda di database.
prisma:studio

Perintah: npx prisma studio
Deskripsi: Meluncurkan Prisma Studio, antarmuka pengguna grafis untuk mengelola data Anda.
prisma:db:push

Perintah: npx prisma db push
Deskripsi: Memperbarui skema database Anda agar sesuai dengan skema Prisma tanpa menggunakan migrasi. Cocok untuk pengembangan awal dan eksperimen.
prisma:db:pull

Perintah: npx prisma db pull
Deskripsi: Menarik skema database yang ada dan memperbarui file schema.prisma Anda. Berguna untuk bekerja dengan database yang sudah ada.# NESTJS-APP
