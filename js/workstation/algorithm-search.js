document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("algorithm-search-bar");
    const algorithmContainer = document.getElementById("algorithm-container");
    const algorithms = document.querySelectorAll(".algorithm");
    const categoryHeaders = algorithmContainer.querySelectorAll(":scope > h1");
    const noAlgorithmExistsMessage = document.createElement('p');
    noAlgorithmExistsMessage.appendChild(document.createTextNode("No algorithms could be found! Use different keywords!"));
    noAlgorithmExistsMessage.style.display = 'none';
    noAlgorithmExistsMessage.style.textAlign = 'center';
    noAlgorithmExistsMessage.style.padding = '8px';
    algorithmContainer.after(noAlgorithmExistsMessage);
    function performSearch() {
        const searchQuery = searchBar.value;
        let visibleSearchResults = 0;
        for (let i = 0; i < algorithms.length; i++) {
            const algorithm = algorithms[i];
            const title = algorithm.getAttribute('algorithm-title');
            const content = algorithm.getAttribute('algorithm-content');
            const searchResult = title + ' ' + content;
            if (searchQuery === '' || searchResult.includes(searchQuery)) {
                algorithm.style.display = '';
                visibleSearchResults++;
            } else {
                algorithm.style.display = 'none';
            }
        }
        for (let i = 0; i < categoryHeaders.length; i++) {
            const header = categoryHeaders[i];
            let nextElement = header.nextElementSibling;
            let hasVisibleChild = false;
            while (nextElement && nextElement.tagName !== 'H2') {
                if (nextElement.classList.contains('algorithm') && nextElement.style.display !== 'none') {
                    hasVisibleChild = true;
                    break;
                }
                nextElement = nextElement.nextElementSibling;
            }
            header.style.display = (searchQuery === '' || hasVisibleChild) ? '' : 'none';
        }

        noAlgorithmExistsMessage.style.display = (visibleSearchResults === 0 && searchQuery !== '') ? 'block' : 'none';
    }

    searchBar.addEventListener('input', performSearch);
    searchBar.addEventListener('search', performSearch);
});