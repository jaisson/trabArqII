$(document).ready(function () {
  carregarPergunta();

  var resgatou = false;
  var bruxa = false;

  var posicTorre = ($(".img-torre").offset().left + (0.5 * $(".img-torre").offset().left));
  let velocidadeVoo = 2;
  let velocidadeCavalo = 250;

  var movBruxa = window.setInterval(function () {
    if (!resgatou) {
      let posicao = ($(".img-bruxa").offset().left + $(".img-bruxa").width());

      if (posicao < posicTorre) {
        $(".img-bruxa").animate({left: `+=${velocidadeVoo}%`});
      } else {
        clearInterval(movBruxa);
        bruxa = true;
        fimdeJogo();
      }
    }
  }, 2000);

  $(".responder").click(function (e) {
    e.stopPropagation();

    $("#resp1").prop("disabled", true);
    $("#resp2").prop("disabled", true);
    $("#resp3").prop("disabled", true);
    $("#resp4").prop("disabled", true);


    if (bruxa) {
      fimdeJogo();
      return false;
    }

    $(".msgResultado").empty();
    let resposta = Number.parseInt($(this).val());
    let gabarito = Number.parseInt($("#dsPergunta").attr("data-gabarito"));
    let posicao = ($(".img-principe").offset().left + $(".img-principe").width());

    if (gabarito === resposta) {
      let totAcertos = Number.parseInt($("#totAcertos").val());
      totAcertos++;
      $("#totAcertos").val(totAcertos);
      $(".msgResultado").append("<h5>Acertou</h5><br>" + $("#dsPergunta").attr("data-feedbackA"));

      if (posicao < posicTorre) {
        $(".img-principe").animate({left: `+=${velocidadeCavalo}px`});
      } else {
        clearInterval(movBruxa);
        $("#resgatou").val("true");
        fimdeJogo();
      }
    } else {
      if ($(".img-principe").offset().left > 0) {
        $(".img-principe").animate({left: `-=${velocidadeCavalo}px`});
      } else {
        $(".img-principe").animate({left: '0px'});
      }

      $(".msgResultado").append("<h5>Errou</h5><br>" + $("#dsPergunta").attr("data-feedbackE"));
    }

    window.setTimeout(carregarPergunta, 5000);
    let tot = Number.parseInt($("#totPerguntas").val());
    tot++;
    $("#totPerguntas").val(tot);
  });
});

function carregarPergunta() {
  $(".msgResultado").empty();
  $("#dsPergunta").text("");
  $("#resp1").empty();
  $("#resp2").empty();
  $("#resp3").empty();
  $("#resp4").empty();


  let tmP = perguntas.length;
  if (tmP <= 0) {
    alert("Acabaram as perguntas");
    $(".img-bruxa").animate({left: `90%%`});
    fimdeJogo();
    return false;
  }

  var rdm = (Math.floor(Math.random() * tmP));
  rdm = parseInt(rdm);

  if (rdm >= 0 && rdm <= tmP) {
    var pergunta = perguntas[rdm];
    perguntas.splice(rdm, 1);

    $("#dsPergunta").attr("data-gabarito", pergunta.gabarito);
    $("#dsPergunta").attr("data-feedbackA", pergunta.feedbackA);
    $("#dsPergunta").attr("data-feedbackE", pergunta.feedbackE);
    $("#dsPergunta").text(pergunta.pergunta);
    $("#resp1").text(pergunta.resposta1);
    $("#resp2").text(pergunta.resposta2);
    $("#resp3").text(pergunta.resposta3);
    $("#resp4").text(pergunta.resposta4);
  }

  $("#resp1").prop("disabled", false);
  $("#resp2").prop("disabled", false);
  $("#resp3").prop("disabled", false);
  $("#resp4").prop("disabled", false);
}

function fimdeJogo() {
  let resgatou = ($("#resgatou").val() === "true");
  let totPerguntas = $("#totPerguntas").val();
  let totAcertos = $("#totAcertos").val();

  let msg = (resgatou ? "Parabéns você conseguiu resgater a rapunzel" : "A bruxa sequestrou a rapunzel");
  msg += `<br>Total de Perguntas: ${totPerguntas} <br> Total de Acertos: ${totAcertos}`;

  $(".modal-endgame").show();
  $(".modal-endgame-msg").empty();
  $(".modal-endgame-msg").append(msg);
  $(".modal-endgame-msg").show();
}
