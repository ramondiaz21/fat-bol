$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('.navbar').addClass('altNav')
    }
    if ($(this).scrollTop() < 500) {
      $('.navbar').removeClass('altNav')
    }
  });

  $(".nav-link").click(function() {
    $(".nav-link").removeClass("active-link");
    $(this).addClass("active-link");
  });
});