document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggles = document.querySelectorAll('.cursor-pointer:not(#musicPlayerModal .cursor-pointer)');

  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const dropdownMenu = this.nextElementSibling;
      const isOpen = dropdownMenu.classList.contains('open');

      document.querySelectorAll('.dropdown-menu:not(#musicPlayerModal .dropdown-menu)').forEach(function (menu) {
        if (menu !== dropdownMenu) {
          menu.style.maxHeight = '0';
          menu.classList.remove('open');
        }
      });

      if (!isOpen) {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
        dropdownMenu.classList.add('open');
      } else {
        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.classList.remove('open');
      }
    });
  });

  document.addEventListener('click', function (event) {
    const target = event.target;
    const dropdownToggles = document.querySelectorAll('.cursor-pointer:not(#musicPlayerModal .cursor-pointer)');
    let isDropdownToggle = false;

    dropdownToggles.forEach(function (toggle) {
      if (toggle.contains(target)) {
        isDropdownToggle = true;
      }
    });

    if (!isDropdownToggle) {
      document.querySelectorAll('.dropdown-menu:not(#musicPlayerModal .dropdown-menu)').forEach(function (menu) {
        menu.style.maxHeight = '0';
        menu.classList.remove('open');
      });
    }
  });
});

function hideSkeletonLoader() {
  tableBody.innerHTML = '';
}

function showSkeletonLoader(rows, cols) {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('flex', 'gap-2');

    const cells = [];

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('bg-[#e0e0e0]', 'rounded', 'm-2', 'flex-1', 'p-3', 'cell');
      cells.push(cell);
    }

    row.append(...cells);
    tableBody.appendChild(row);
  }
}

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = dateTime.getDate();
  const monthIndex = dateTime.getMonth();
  const year = dateTime.getFullYear();

  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day} ${months[monthIndex]}, ${year}`;

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

function signOut() {
  localStorage.removeItem('userinfo');
  localStorage.removeItem('jwtToken');
  window.location.href = '/login.html';
}
