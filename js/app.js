(function (Bilik) {
  const boardRoot = document.querySelector("#board-root");
  const overlay = document.querySelector("#question-overlay");
  const scoreRoot = document.querySelector("#scoreboard");
  const resetBtn = document.querySelector("#reset-game");
  const game = Bilik.createGame();

  function addCategory() {
    const name = window.prompt("Yeni mövzunun adını yazın:");
    if (name === null) return;
    if (!game.addCategory(name)) window.alert("Mövzu adı boş ola bilməz və təkrarlanmamalıdır.");
    paint();
  }

  function addQuestion(category) {
    const question = window.prompt(`${category} üçün sualı yazın:`);
    if (question === null) return;
    const answer = window.prompt("Düzgün cavabı yazın:");
    if (answer === null) return;
    if (!game.addQuestion(category, question, answer)) {
      window.alert("Sual və cavab doldurulmalıdır. Hər mövzuda ən çox 5 sual ola bilər.");
    }
    paint();
  }

  function paint() {
    Bilik.renderBoard(boardRoot, game, {
      select(question) { if (game.select(question)) paint(); },
      addCategory,
      addQuestion,
      renameCategory(category, name) { game.renameCategory(category, name); paint(); },
    });
    Bilik.renderOverlay(overlay, game, {
      reveal() { game.revealAnswer(); paint(); },
      back() { game.returnToBoard(); paint(); },
      award(teamId) { game.award(teamId); paint(); },
      penalize(teamId) { game.penalize(teamId); paint(); },
    });
    Bilik.renderScoreboard(scoreRoot, game, {
      adjust(teamId, delta) { game.adjustScore(teamId, delta); paint(); },
      rename(teamId, name) { game.renameTeam(teamId, name); paint(); },
      setTeamCount(count) { game.setTeamCount(count); paint(); },
    });
  }

  resetBtn.addEventListener("click", () => {
    if (!window.confirm("Yeni oyun başlasın? Açılmış suallar və xallar sıfırlanacaq.")) return;
    game.reset();
    paint();
  });
  paint();
})(window.Bilik);
