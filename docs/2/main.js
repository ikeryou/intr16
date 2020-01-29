
var _items = [];
var _cnt = 0;

// 初期設定
init();
function init() {

  var num = 28;
  for(var i = 1; i <= num; i++) {
    $('.list').append('<div class="item"><p class="ttl">Feb.</p><p class="no">' + i + '</p></div>')
  }

  $('.list > .item').each(function(i,e) {
    _items.push({
      el:$(e),
      rate:0
    });
  });

}


// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var sw = window.innerWidth;
  var itemWidth = _items[0].el.width();


  var len = _items.length;
  for(var i = 0; i < len; i++) {
    var el = _items[i].el;
    var x = (sw / (len - 1)) * i - itemWidth * 0.5;
    var d = map(Math.abs((i + 1) - 14) * Math.abs((i + 1) - 14), 1, 0, 0, len * 1);
    TweenMax.set(el, {
      top: 0,
      left: x,
      zIndex:len - i,
      rotationY:-90 + Math.sin(_cnt * -0.05 + i * 0.1) * 40,
      skewX:-5,
      backgroundColor: chroma.mix(0xefefef, 0xCA000E, d).css()
    })
  }
  _cnt++;
  window.requestAnimationFrame(update);
}
