const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Alumni = require('./model/alumni');
const Beasiswa = require('./model/beasiswa');
const app = express();

const port = 3000;

// setup method-override
app.use(methodOverride('_method'));

// setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts); // third party middleware
app.use(express.static('public')); // built-in middleware
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());


// halaman home
app.get('/', (req, res) => {
  const alumni = [
    {
      nama: 'Kipakers Kips',
      nim: '000000001',
    },
    {
      nama: 'Jiji Oke',
      nim: '000000002',
    },
    {
      nama: 'Holi Kips',
      nim: '000000003',
    },
  ];
  res.render('index', {
    title: 'Halaman Home',
    nama: 'Kipakers Kipos',
    alumni,
    layout: 'layouts/main-layout',
  });
});

// halaman event
app.get('/event', (req, res) => {
  res.render('event', {
    title: 'Halaman Event',
    layout: 'layouts/main-layout',
  });
});

// halaman news
app.get('/news', (req, res) => {
  res.render('news', {
    title: 'Halaman News',
    layout: 'layouts/main-layout',
  });
});

// halaman beasiswa
// app.get('/beasiswa', (req, res) => {
  //   res.render('beasiswa', {
    //     title: 'Halaman Beasiswa',
    //     layout: 'layouts/main-layout',
    //   });
    // });

// halaman beasiswa
app.get('/beasiswa', async (req, res) => {
  const beasiswas = await Beasiswa.find();

  res.render('beasiswa', {
    title: 'Halaman Beasiswa',
    layout: 'layouts/main-layout',
    beasiswas,
    msg: req.flash('msg'),
  });
});

//halaman alumni
app.get('/alumni', async (req, res) => {
  const alumnis = await Alumni.find();

  res.render('alumni', {
    title: 'Halaman Alumni',
    layout: 'layouts/main-layout',
    alumnis,
    msg: req.flash('msg'),
  });
});

// proses tambah data beasiswa dari website
app.post(
  '/beasiswa',
  [
    // Validasi inputan lainnya
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-beasiswa', {
        title: 'Form Tambah Data Beasiswa',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      // Masukkan sumber ke objek req.body
      req.body.sumber = req.body.sumber;

      // Simpan data alumni ke MongoDB
      Beasiswa.create(req.body, (error, result) => {
        if (error) {
          console.error(error);
          req.flash('msg', 'Terjadi kesalahan saat menambah data beasiswa.');
          res.redirect('/beasiswa');
        } else {
          req.flash('msg', 'Data beasiswa berhasil ditambahkan!');
          res.redirect('/beasiswa');
        }
      });
    }
  }
);

// Di bagian route untuk pencarian beasiswa
app.get('/search-beasiswa', async (req, res) => {
  const searchQuery = req.query.q; // Ambil query pencarian dari URL

  try {
    const beasiswa = await Beasiswa.find({
      namaBeasiswa: { $regex: new RegExp(searchQuery, 'i') } // Mencari beasiswa berdasarkan namaBeasiswa dengan regex
    }).sort({ namaBeasiswa: 1 }); // Urutkan hasil pencarian berdasarkan namaBeasiswa secara ascending

    res.render('search-results', { beasiswa });
  } catch (err) {
    console.error('Error searching beasiswa:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Di bagian route untuk pencarian alumni
app.get('/search', async (req, res) => {
  const searchQuery = req.query.q; // Ambil query pencarian dari URL

  try {
    const alumni = await Alumni.find({
      nama: { $regex: new RegExp(searchQuery, 'i') } // Mencari alumni berdasarkan nama dengan regex
    }).sort({ nama: 1 }); // Urutkan hasil pencarian berdasarkan nama secara ascending

    res.render('search-results', { alumni });
  } catch (err) {
    console.error('Error searching alumni:', err);
    res.status(500).send('Internal Server Error');
  }
});


// halaman form tambah data besiswa
app.get('/beasiswa/add', (req, res) => {
  res.render('add-beasiswa', {
    title: 'Form Tambah Data Alumni',
    layout: 'layouts/main-layout',
  });
});

// halaman form tambah data alumni
app.get('/alumni/add', (req, res) => {
  res.render('add-alumni', {
    title: 'Form Tambah Data Alumni',
    layout: 'layouts/main-layout',
  });
});

// proses tambah data alumni dari website
app.post(
  '/alumni',
  [
    // Validasi inputan lainnya
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-alumni', {
        title: 'Form Tambah Data Alumni',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      // Masukkan kontak1, kontak2, dan kontak3 ke objek req.body
      req.body.kontak1 = req.body.kontak1;
      req.body.kontak2 = req.body.kontak2;
      req.body.kontak3 = req.body.kontak3;

      // Simpan data alumni ke MongoDB
      Alumni.create(req.body, (error, result) => {
        if (error) {
          console.error(error);
          req.flash('msg', 'Terjadi kesalahan saat menambah data alumni.');
          res.redirect('/alumni');
        } else {
          req.flash('msg', 'Data alumni berhasil ditambahkan!');
          res.redirect('/alumni');
        }
      });
    }
  }
);

// menghapus data beasiswa
app.delete('/beasiswa', (req, res) => {
  Beasiswa.deleteOne({ namaBeasiswa: req.body.namaBeasiswa }).then((result) => {
    // kirimkan flash messege
    req.flash('msg', 'Data beasiswa berhasil dihapus!');
    res.redirect('/beasiswa');
  });
});

// menghapus data alumni
app.delete('/alumni', (req, res) => {
  Alumni.deleteOne({ nama: req.body.nama }).then((result) => {
    // kirimkan flash messege
    req.flash('msg', 'Data alumni berhasil dihapus!');
    res.redirect('/alumni');
  });
});

// halaman form ubah data beasiswa
app.get('/beasiswa/edit/:namaBeasiswa', async (req, res) => {
  const beasiswa = await Beasiswa.findOne({ namaBeasiswa: req.params.namaBeasiswa });

  res.render('edit-beasiswa', {
    title: 'Form Ubah Data Beasiswa',
    layout: 'layouts/main-layout',
    beasiswa,
  });
});

// proses ubah data beasiswa
app.put(
  '/beasiswa',
  [
    body('namaBeasiswa').custom(async (value, { req }) => {
      const duplikat = await Alumni.findOne({ namaBeasiswa: value });
      if (value !== req.body.oldNamaBeasiswa && duplikat) {
        throw new Error('Nama beasiswa sudah digunakan!');
      }
      return true;
    }),
    // check('nim', 'NIM tidak valid!').isNumeric(),
    // check('programStudi', 'Program Studi tidak valid!').isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-beasiswa', {
        title: 'Form Ubah Data Beasiswa',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        beasiswa: req.body,
      });
    } else {
      Beasiswa.updateOne(
        { _id: req.body._id },
        {
          $set: {
            namaBeasiswa: req.body.namaBeasiswa,
            jenjang: req.body.jenjang,
            periode: req.body.periode,
            deskripsi: req.body.deskripsi,
            sumber: req.body.sumber,
            gambar: req.body.gambar,
          },
        }
      ).then((result) => {
        // kirimkan flash messege
        req.flash('msg', 'Data beasiswa berhasil diubah!');
        res.redirect('/beasiswa');
      });
    }
  }
);

// halaman form ubah data alumni
app.get('/alumni/edit/:nama', async (req, res) => {
  const alumni = await Alumni.findOne({ nama: req.params.nama });

  res.render('edit-alumni', {
    title: 'Form Ubah Data Alumni',
    layout: 'layouts/main-layout',
    alumni,
  });
});

// proses ubah data alumni
app.put(
  '/alumni',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Alumni.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama alumni sudah digunakan!');
      }
      return true;
    }),
    check('nim', 'NIM tidak valid!').isNumeric(),
    check('programStudi', 'Program Studi tidak valid!').isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-alumni', {
        title: 'Form Ubah Data Aumni',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        alumni: req.body,
      });
    } else {
      Alumni.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nim: req.body.nim,
            programStudi: req.body.programStudi,
            tahunLulus: req.body.tahunLulus,
            judulTA: req.body.judulTA,
            jenjangKarir: req.body.jenjangKarir,
            kontak: req.body.kontak,
            foto: req.body.foto,
          },
        }
      ).then((result) => {
        // kirimkan flash messege
        req.flash('msg', 'Data alumni berhasil diubah!');
        res.redirect('/alumni');
      });
    }
  }
);

// menghapus data beasiswa
app.delete('/beasiswa', (req, res) => {
  Beasiswa.deleteOne({ namaBeasiswa: req.body.namaBeasiswa }).then((result) => {
    // kirimkan flash messege
    req.flash('msg', 'Data beasiswa berhasil dihapus!');
    res.redirect('/beasiswa');
  });
});

// menghapus data alumni
app.delete('/alumni', (req, res) => {
  Alumni.deleteOne({ nama: req.body.nama }).then((result) => {
    // kirimkan flash messege
    req.flash('msg', 'Data alumni berhasil dihapus!');
    res.redirect('/alumni');
  });
});


// halaman detail beasiswa
app.get('/beasiswa/:namaBeasiswa', async (req, res) => {
  const beasiswa = await Beasiswa.findOne({ namaBeasiswa: req.params.namaBeasiswa });

  res.render('detail-beasiswa', {
    title: 'Halaman Detail Beasiswa',
    layout: 'layouts/main-layout',
    beasiswa,
  });
});

// halaman detail alumni
app.get('/alumni/:nama', async (req, res) => {
  const alumni = await Alumni.findOne({ nama: req.params.nama });

  res.render('detail', {
    title: 'Halaman Detail Alumni',
    layout: 'layouts/main-layout',
    alumni,
  });
});



app.listen(port, () => {
  console.log(`Mongo Portal Alumni | listening at http://localhost:${port}`);
});
