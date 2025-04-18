$(() => {
  
  const game = $("#game");
  const rows = 6;
  const cols = 8;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const pieceId = `p${i}${j}`;
      game.append(`<div id='${pieceId}'></div>`);
      $(`#${pieceId}`)
        .css({
          width: "100px",
          height: "100px",
          boxShadow: "0 0 5px #333",
          background: `url('./img/puzzle.jpg') ${-100 * j}px ${-100 * i}px`,
          top: rnd(0, 600) + "px",
          left: rnd(800, $(window).width() - 150) + "px",
          transform: `rotate(${rnd(-30, 30)}deg)`,
        })
        .draggable({
          snap: true,
          start: function () {
            $(this).css({ transform: `rotate(0)` });
          },
          stop: function () {
            $(this).css({
              left: Math.round( $(this).position().left / 100 ) * 100  + 'px',
              top: Math.round( $(this).position().top / 100 ) * 100  + 'px'
             })
          },
        });
    }
  }
   // Timer
   let timeLeft = 60;
   const timerInterval = setInterval(() => {
     timeLeft--;
     $("#time").text(timeLeft);
     if (timeLeft <= 0) {
       clearInterval(timerInterval);
       $("#gameover").fadeIn();
       $(".ui-draggable").draggable("disable"); 
     }
   }, 1000);

   // Restart button
   $("#restart").click(() => {
     location.reload();
   });
});


function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
