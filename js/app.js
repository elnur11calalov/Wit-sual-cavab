(function (Bilik) {
  const boardRoot = document.querySelector("#board-root");
  const overlay = document.querySelector("#question-overlay");
  const scoreRoot = document.querySelector("#scoreboard");
  const editorModal = document.querySelector("#editor-modal");
  const resetBtn = document.querySelector("#reset-game");
  const game = Bilik.createGame();

  function addCategory() {
    const name = window.prompt("Yeni mövzunun adını yazın:");
    if (name === null) return;
    if (!game.addCategory(name)) window.alert("Mövzu adı boş ola bilməz və təkrarlanmamalıdır.");
    paint();
  }

  function addQuestion(category) {
    const availableValues = Bilik.VALUES.filter((value) => !game.getQuestion(category, value));
    if (!availableValues.length) return;
    editorModal.classList.add("open");
    editorModal.setAttribute("aria-hidden", "false");
    const form = document.createElement("form");
    form.className = "question-editor";
    form.innerHTML = `
      <button type="button" class="editor-close" aria-label="Pəncərəni bağla">×</button>
      <p class="editor-kicker"></p>
      <h2>Yeni sual əlavə edin</h2>
      <label>Sual <textarea name="question" required maxlength="400" placeholder="Sualı buraya yazın"></textarea></label>
      <label>Düzgün cavab <input name="answer" required maxlength="200" placeholder="Cavabı yazın" /></label>
      <label>Bal dəyəri <select name="value">${availableValues.map((value) => `<option value="${value}">${value} bal</option>`).join("")}</select></label>
      <button class="primary-btn" type="submit">Sualı əlavə et</button>
    `;
    form.querySelector(".editor-kicker").textContent = category;
    const close = () => {
      editorModal.classList.remove("open");
      editorModal.setAttribute("aria-hidden", "true");
      editorModal.replaceChildren();
    };
    form.querySelector(".editor-close").addEventListener("click", close);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      if (!game.addQuestion(category, data.get("value"), data.get("question"), data.get("answer"))) {
        window.alert("Bu bal dəyərində sual artıq var və ya bütün sahələr doldurulmayıb.");
        return;
      }
      close();
      paint();
    });
    editorModal.replaceChildren(form);
    form.querySelector("textarea").focus();
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
