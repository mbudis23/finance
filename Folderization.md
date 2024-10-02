project-name/
│
├── .github/                # Workflow GitHub Actions dan template issue/pull request
├── docs/                   # Dokumentasi proyek
│   ├── architecture/       # Diagram arsitektur dan desain
│   ├── guides/             # Panduan penggunaan atau kontribusi
│   └── api/                # Dokumentasi API
│
├── frontend/               # Kode Next.js (frontend)
│   ├── components/         # Komponen UI
│   ├── pages/              # Halaman untuk routing
│   ├── public/             # File publik seperti favicon, images
│   ├── styles/             # File styling (misal Tailwind atau CSS module)
│   ├── utils/              # Fungsi utility dan helper
│   ├── next.config.js      # Konfigurasi Next.js
│   └── package.json        # Dependensi frontend
│
├── backend/                # Kode Express.js (backend)
│   ├── controllers/        # Logika endpoint API
│   ├── models/             # Model database (misalnya MongoDB, PostgreSQL)
│   ├── routes/             # Rute API
│   ├── middlewares/        # Middleware untuk request processing
│   ├── utils/              # Helper dan utilitas
│   ├── config/             # Konfigurasi server dan database
│   ├── app.js              # Setup aplikasi Express
│   └── package.json        # Dependensi backend
│
├── tests/                  # Test untuk frontend dan backend
│   ├── unit/               # Unit test
│   ├── integration/        # Test integrasi
│   └── e2e/                # End-to-end test
│
├── scripts/                # Skrip untuk otomasi tugas
│
├── .gitignore              # File untuk mengabaikan file/folder di Git
├── README.md               # Dokumentasi utama proyek
├── LICENSE                 # Lisensi proyek
├── package.json            # Root package.json untuk mengelola script gabungan (frontend/backend)
├── package-lock.json       # Lock file dependensi root
├── docker-compose.yml      # File untuk setup Docker container (opsional)
└── .env                    # File untuk variabel lingkungan (untuk dev)