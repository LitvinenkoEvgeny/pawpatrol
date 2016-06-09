import $ from 'jquery';

function animate(elem) {
  let effect = elem.data("effect");
  if (!effect || elem.hasClass(effect)) return false;
  elem.addClass(effect);
  setTimeout(() => {
    elem.removeClass(effect);
  }, 1000);
}

export function animateText() {
  $('.animated').mouseenter(() => {
    animate($('.animated'));
  });
}