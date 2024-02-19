const mongoose = require('mongoose');

// Membuat schema
const Beasiswa = mongoose.model('Beasiswa', {
  namaBeasiswa: {
    type: String,
    required: true,
  },
  jenjang: {
    type: String,
  },
  periode: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  sumber: {
    type: String,
  },
  gambar: {
    type: String,
  }
});

module.exports = Beasiswa;
