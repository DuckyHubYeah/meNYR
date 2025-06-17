const resolutionList = document.getElementById('resolutionList');
const inputSection = document.getElementById('inputSection');

let resolutions = JSON.parse(localStorage.getItem('resolutions')) || [];

// Check if current date is Jan 1 or after
function isNewYear() {
  const today = new Date();
  return today.getMonth() === 0 && today.getDate() >= 1;
}

function addResolution() {
  const input = document.getElementById('resolutionInput');
  const text = input.value.trim();

  if (text) {
    resolutions.push({ text, checked: false, dateChecked: null });
    localStorage.setItem('resolutions', JSON.stringify(resolutions));
    input.value = '';
    renderList();
  }
}

function toggleCheckbox(index) {
  const today = new Date().toISOString().split('T')[0];

  if (resolutions[index].dateChecked !== today) {
    resolutions[index].checked = !resolutions[index].checked;
    resolutions[index].dateChecked = resolutions[index].checked ? today : null;
    localStorage.setItem('resolutions', JSON.stringify(resolutions));
    renderList();
  } else {
    alert("You’ve already checked this today. Come back tomorrow!");
  }
}

function renderList() {
  resolutionList.innerHTML = '';

  if (isNewYear()) {
    inputSection.style.display = 'none'; // Hide inputs

    resolutions.forEach((res, index) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = res.checked;
      checkbox.addEventListener('click', () => toggleCheckbox(index));
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(res.text));
      resolutionList.appendChild(li);
    });

  } else {
    inputSection.style.display = 'block'; // Show input
    resolutions.forEach((res) => {
      const li = document.createElement('li');
      li.textContent = res.text;
      resolutionList.appendChild(li);
    });
  }
}

// On load
renderList();
