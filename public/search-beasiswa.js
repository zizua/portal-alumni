document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchName');
    const beasiswaItems = document.querySelectorAll('.beasiswa-item');

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchValue = searchInput.value.trim().toLowerCase();

        beasiswaItems.forEach(function(beasiswaItem) {
            const beasiswaName = beasiswaItem.querySelector('.beasiswa-name').textContent.toLowerCase();

            if (beasiswaName.includes(searchValue)) {
                beasiswaItem.style.display = 'block';
                beasiswaItem.classList.add('fadeInUp');
            } else {
                beasiswaItem.style.display = 'none';
                beasiswaItem.classList.remove('fadeInUp');
            }
        });
    });
});
