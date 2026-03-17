(function () {
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
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
