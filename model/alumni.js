const mongoose = require('mongoose');

// membuat schema
const Alumni = mongoose.model('Alumni', {
  nama: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
  },
  programStudi: {
    type: String,
  },
  tahunLulus: {
    type: String,
  },
  judulTA: {
    type: String,
  },
  jenjangKarir: {
    type: String,
  },
  kontak1: {
    type: String,
  },
  kontak2: {
    type: String,
  },
  kontak3: {
    type: String,
  },
  foto: {
    type: String,
    required: true,
  },
});

module.exports = Alumni;
