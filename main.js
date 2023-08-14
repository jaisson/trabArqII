$(document).ready(function() {
  var resgatou = false;
  var posicTorre = $(".img-torre").offset().left + $(".img-bruxa").width();

  window.setInterval(function() {
    let posicao = $(".img-bruxa").offset().left;
    if (!resgatou && posicao < posicTorre) {
      $(".img-bruxa").animate({left: '+=5px'}, "slow");
    }
  }, 500);
		
  $("button").click(function() {
    $(".img-principe").animate({left: '+=10px'}, "slow");
  });
});
