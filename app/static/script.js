const searchInput = document.getElementById('book-search');
const resultsDiv = document.getElementById('results-list');

const highlightClasses = ["ring-4", "ring-yellow-500", "bg-yellow-200", "scale-[1.05]", "z-50", "transition-all"];

async function performSearch(query) {
    if (query.length < 2) {
        resultsDiv.innerHTML = '<p class="text-sm text-gray-400 text-center mt-10">Start typing to search...</p>';
        return;
    }

    try {
        const response = await fetch(`/api/search/?q=${query}`);
        const data = await response.json();
        displayResults(data.books);
    } catch (error) {
        console.error("Search failed:", error);
    }
}

function displayResults(books) {
    resultsDiv.innerHTML = '';

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p class="text-sm text-red-400 text-center mt-10">No books found.</p>';
        return;
    }

    books.forEach(book => {
        const card = `
            <div class="p-4 border rounded-lg shadow-sm hover:border-blue-300 bg-white group transition-all">
                <p class="font-bold text-gray-800">${book.title}</p>
                <p class="text-xs text-gray-500 mb-3">${book.type} ${book.number} | ${book.side}</p>
                <button 
                    onclick="highlightOnMap('${book.location_id}')"
                    class="w-full py-2 text-[10px] font-black uppercase bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Show on Map
                </button>
            </div>
        `;
        resultsDiv.insertAdjacentHTML('beforeend', card);
    });
}

function highlightOnMap(locationId) {
    // 1. Remove highlight from all elements
    document.querySelectorAll('.ring-4').forEach(el => {
        el.classList.remove(...highlightClasses);
    });

    // 2. Find all elements matching the location_id (important for blocks)
    const targets = document.querySelectorAll(`[id="${locationId}"]`);

    if (targets.length > 0) {
        targets.forEach(target => {
            target.classList.add(...highlightClasses);
        });

        // 3. Scroll to the first match
        targets[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    } else {
        console.warn(`Location ID "${locationId}" not found on map.`);
    }
}

// Event Listener
searchInput.addEventListener('input', (e) => performSearch(e.target.value));