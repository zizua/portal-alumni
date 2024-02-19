// baru
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchName');
  const alumniItems = document.querySelectorAll('.team-item'); // Mengubah pemilihan elemen ke .team-item

  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();
    
    alumniItems.forEach(function(alumniItem) { // Menggunakan alumniItems sebagai selector
      const alumniName = alumniItem.querySelector('.mb-0').textContent.toLowerCase(); // Mengubah pemilihan elemen ke .mb-0

      if (searchValue === '' || alumniName.includes(searchValue)) {
        alumniItem.style.display = 'block';
        alumniItem.classList.add('fadeInUp'); // Menambahkan class fadeInUp
      } else {
        alumniItem.style.display = 'none';
        alumniItem.classList.remove('fadeInUp'); // Menghapus class fadeInUp
      }
    });
  });
});
  
  
  // lama
  // document.addEventListener('DOMContentLoaded', function() {
    //   const searchInput = document.getElementById('searchName');
    //   const cards = document.querySelectorAll('.card');
    
//   document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const searchValue = searchInput.value.trim().toLowerCase();

//     cards.forEach(function(card) {
//       const alumniName = card.querySelector('.card-title').textContent.toLowerCase();

//       if (searchValue === '' || alumniName.includes(searchValue)) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   });
// });
