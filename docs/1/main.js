
var _items = [];

// 初期設定
init();
function init() {

  var num = 20;
  for(var i = 0; i < num; i++) {
    $('.js-tg').append('<div class="etc"></div>')
  }

  $('.js-tg > .etc').each(function(i,e) {
    _items.push({
      el:$(e),
      rate:0
    });
  });

  start();

}

function start() {

  var ht = $('.js-tg p');
  var delay = 1;
  var ease1 = Elastic.easeOut.config(1, 0.35);
  var ease2 = Elastic.easeOut.config(1, 0.85);
  var len = _items.length;

  TweenMax.killTweensOf(ht);
  TweenMax.set(ht, {
    scale:0
  });

  TweenMax.to(ht, 1, {
    scale:1,
    delay:delay + 0.1,
    ease:ease1,
    onComplete:end
  });

  var interval = 0.025;
  for(var i = 0; i < len; i++) {

    TweenMax.killTweensOf(_items[i]);
    TweenMax.set(_items[i], {
      rate:0
    });

    TweenMax.to(_items[i], 1, {
      rate:1,
      delay:delay + i * interval,
      ease:ease2
    });
  }

}


function end() {

  var ht = $('.js-tg p');

  TweenMax.killTweensOf(ht);
  TweenMax.to(ht, 0.5, {
    scale:0,
    delay:0,
    ease:Back.easeIn.config(5),
    onComplete:start
  });

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var parent = $('.js-tg')
  var w = parent.width();
  var h = parent.height();
  var radius = w * 0.5;

  var dotSize = _items[0].el.width();

  var len = _items.length;
  for(var i = 0; i < len; i++) {
    var el = _items[i].el;
    var ang = radian((360 / len) * i + 90);
    var rate = _items[i].rate;
    var alpha = rate;
    var color = '#F9D76F';
    TweenMax.set(el, {
      top: h * 0.5 + Math.sin(ang) * radius - dotSize * 0.5,
      left: w * 0.5 + Math.cos(ang) * radius - dotSize * 0.5,
      opacity:alpha,
      scale:(1 - rate) * 2
    })
  }

  window.requestAnimationFrame(update);
}
