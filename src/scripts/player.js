let $ = window.$;
import 'jquery.scrollto/jquery.scrollTo.min.js';

function l_image(a) {
  document.getElementById('example_frame').src = a;
}
window.l_image = l_image;

export default function () {
  let videoLink = $('.select-video-main a');
  videoLink.click(function () {
    $(".select-video-main a").removeClass("active");
  });

  videoLink.click(function () {
    $(this).addClass("active");
  });

  $('.scroll-top-video').click(function () {
    $.scrollTo('#scroll-video');
  });

  $(".select-video-main").mCustomScrollbar({
    theme: "dark",
    mouseWheel: {
      enable: true
    }
  });
}


