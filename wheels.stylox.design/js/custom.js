(function () {
  function initVehicleLineup() {
    var chooser = document.getElementById('vehicleLineupChooser');
    if (!chooser) return;

    var img = document.getElementById('vehicleLineupImage');
    if (!img) return;

    chooser.addEventListener('click', function (e) {
      var btn = e.target.closest('.vehicle-color-swatch');
      if (!btn) return;

      var src = btn.getAttribute('data-src');
      if (!src) return;

      img.src = src;

      var buttons = chooser.querySelectorAll('.vehicle-color-swatch');
      buttons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
    });
  }

  function initMenu() {
    var menuIcon = document.querySelector('.menu-icon');
    var body = document.body;
    var nav = document.querySelector('.site-navigation');

    if (!menuIcon || !nav) return;

    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      menuIcon.classList.toggle('active');
      body.classList.toggle('menu-open');
    }

    function closeMenu() {
      body.classList.remove('menu-open');
      menuIcon.classList.remove('active');
    }

    menuIcon.addEventListener('click', toggleMenu);

    nav.addEventListener('click', function (e) {
      var target = e.target.closest('a');
      if (target && body.classList.contains('menu-open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMenu();
      initVehicleLineup();
    });
  } else {
    initMenu();
    initVehicleLineup();
  }
})();
