let resolutions = [];

function addResolution() {
    const input = document.getElementById('resolutionInput');
    const resolution = input.value.trim();
    
    if (resolution) {
        resolutions.push({ text: resolution, date: new Date().toISOString().split('T')[0], completed: false });
        updateResolutionList();
        input.value = '';
    }
}

function updateResolutionList() {
    const list = document.getElementById('resolutionList');
    list.innerHTML = '';

    resolutions.forEach((resolution, index) => {
        const listItem = document.createElement('li');
        const today = new Date().toISOString().split('T')[0];
        
        if (resolution.date === today) {
            resolution.completed = true;
        }

        listItem.innerHTML = resolution.completed ? '✔️ ' : '';
        listItem.innerHTML += resolution.text;

        list.appendChild(listItem);
    });
}

setInterval(updateResolutionList, 86400000);  // Update daily (every 24 hours)
