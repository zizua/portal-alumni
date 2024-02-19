const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/portal-alumni', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// membuat schema
// const Contact = mongoose.model('Contact', {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
// });

// menambah 1 data
// const contact1 = new Contact({
//   nama: 'Bobi Kips',
//   nohp: '081172548',
//   email: 'bobi@gmail.com',
// });

// simpan ke collection
// contact1.save().then((contact) => console.log(contact));
