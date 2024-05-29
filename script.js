
        const img = document.querySelector('img');
        const form = document.querySelector('form');
        const newgif = document.querySelector('.newgif');
        img.style.visibility = 'hidden';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let searchVal = getSearch();
            search(searchVal);
        });

        newgif.addEventListener('click', () => {
            let searchVal = getSearch();
            if (searchVal) {
                search(searchVal);
            } else {
                alert('Please enter a search term');
            }
        });

        function getSearch() {
            let search = document.getElementById('search');
            let searchValue = search.value.trim();
            return searchValue;
        }

        function search(searchValue) {
            if (searchValue) {
                fetch(`https://api.giphy.com/v1/gifs/translate?api_key=##############KEY_HERE###############&s=${searchValue}`, { mode: 'cors' })
                .then(response => response.json())
                .then(response => {
                    if (response.data && response.data.images) {
                        const url = response.data.images.original.url;
                        img.src = url;
                        img.style.visibility = 'visible';
                    } else {
                        alert('No GIF found for this search term');
                        img.style.visibility = 'hidden';
                    }
                })
                .catch(error => {
                    console.error('Error fetching GIF:', error);
                    alert('Failed to fetch GIF. Please try again later.');
                    img.style.visibility = 'hidden';
                });
            } else {
                alert('Please enter a search term');
                img.style.visibility = 'hidden';
            }
        }
