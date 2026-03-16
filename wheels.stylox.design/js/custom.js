(function () {
  var menuIcon = document.querySelector('.menu-icon');
  var body = document.body;
  var nav = document.querySelector('.site-navigation');

  if (!menuIcon || !nav) {
    return;
  }

  menuIcon.onclick = function (e) {
    e.preventDefault();
    menuIcon.classList.toggle('active');
    body.classList.toggle('menu-open');
    return false;
  };

  // Close menu when clicking any link inside the nav (mobile)
  nav.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.tagName && target.tagName.toLowerCase() === 'a' && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      menuIcon.classList.remove('active');
    }
  });
})();
