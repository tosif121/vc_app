document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with class 'cursor-pointer' except those inside #musicPlayerModal and another modal with id #editUserListModal
  const dropdownToggles = document.querySelectorAll(
    '.cursor-pointer:not(#musicPlayerModal .cursor-pointer):not(#editUserListModal .cursor-pointer)'
  );

  // Iterate over each dropdown toggle element
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      // Find the next sibling element, which is the dropdown menu
      const dropdownMenu = this.nextElementSibling;
      // Check if the dropdown menu is currently open
      const isOpen = dropdownMenu.classList.contains('open');

      // Close all other open dropdown menus
      document
        .querySelectorAll('.dropdown-menu:not(#musicPlayerModal .dropdown-menu):not(#editUserListModal .dropdown-menu)')
        .forEach(function (menu) {
          if (menu !== dropdownMenu) {
            menu.style.maxHeight = '0';
            menu.classList.remove('open');
          }
        });

      // Toggle the visibility of the clicked dropdown menu
      if (!isOpen) {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
        dropdownMenu.classList.add('open');
      } else {
        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.classList.remove('open');
      }
    });
  });

  // Event listener to close dropdown menus when clicking outside of them
  document.addEventListener('click', function (event) {
    const target = event.target;
    const dropdownToggles = document.querySelectorAll(
      '.cursor-pointer:not(#musicPlayerModal .cursor-pointer):not(#editUserListModal .cursor-pointer)'
    );
    let isDropdownToggle = false;

    // Check if the clicked element is a dropdown toggle
    dropdownToggles.forEach(function (toggle) {
      if (toggle.contains(target)) {
        isDropdownToggle = true;
      }
    });

    // If clicked element is not a dropdown toggle, close all dropdown menus
    if (!isDropdownToggle) {
      document
        .querySelectorAll('.dropdown-menu:not(#musicPlayerModal .dropdown-menu):not(#editUserListModal .dropdown-menu)')
        .forEach(function (menu) {
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

function showNotification(notificationId) {
  const notification = document.getElementById(notificationId);
  notification.classList.remove('hidden');
  notification.classList.add('toast-enter');

  setTimeout(function () {
    notification.classList.add('toast-exit');
    notification.addEventListener(
      'animationend',
      () => {
        notification.classList.remove('toast-enter', 'toast-exit');
        notification.classList.add('hidden');
      },
      { once: true }
    );
  }, 3000);
}
function setupModal(modalContainerId, modalId, closeButtonId) {
  const modalContainer = document.getElementById(modalContainerId);
  const modal = document.getElementById(modalId);
  const closeButton = document.getElementById(closeButtonId);

  if (!modalContainer || !modal || !closeButton) {
    console.error('Modal elements not found');
    return;
  }

  function closeModal() {
    modalContainer.classList.add('hidden');
    modal.classList.add('hidden');
  }

  modalContainer.addEventListener('click', function (event) {
    if (event.target === modalContainer) {
      closeModal();
    }
  });

  closeButton.addEventListener('click', closeModal);
}

function signOut() {
  localStorage.removeItem('userinfo');
  localStorage.removeItem('jwtToken');
  window.location.href = '/login.html';
}
