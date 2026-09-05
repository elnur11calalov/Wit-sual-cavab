(function (Bilik) {
  function renderBoard(root, game, handlers) {
    const categories = game.getCategories();
    const board = document.createElement("div");
    board.className = "board";
    board.style.gridTemplateColumns = `repeat(${categories.length + 1}, minmax(140px, 1fr))`;
    categories.forEach((category) => {
      const header = document.createElement("div");
      header.className = "category";
      const input = document.createElement("input");
      input.className = "category-name";
      input.value = category;
      input.maxLength = 28;
      input.setAttribute("aria-label", `${category} mövzusunun adı`);
      input.addEventListener("change", () => handlers.renameCategory(category, input.value));
      const addQuestion = document.createElement("button");
      addQuestion.type = "button";
      addQuestion.className = "add-question-btn";
      const available = game.getAvailableValue(category);
      addQuestion.disabled = !available;
      addQuestion.textContent = available ? "+ Sual" : "5 sual tamamlandı";
      addQuestion.addEventListener("click", () => handlers.addQuestion(category));
      header.append(input, addQuestion);
      board.appendChild(header);
    });
    const addCategory = document.createElement("button");
    addCategory.type = "button";
    addCategory.className = "add-category-btn";
    addCategory.textContent = "+ Yeni mövzu";
    addCategory.addEventListener("click", handlers.addCategory);
    board.appendChild(addCategory);
    Bilik.VALUES.forEach((value) => {
      categories.forEach((category) => {
        const question = game.getQuestion(category, value);
        const button = document.createElement("button");
        button.type = "button";
        button.className = question ? "cell" : "cell empty";
        if (question && game.isViewed(category, value)) button.classList.add("used");
        button.textContent = question ? String(value) : "—";
        button.disabled = !question;
        button.setAttribute("aria-label", question ? `${category} — ${value} bal` : `${category} üçün boş sual yeri`);
        if (question) button.addEventListener("click", () => handlers.select(question));
        board.appendChild(button);
      });
      const spacer = document.createElement("div");
      spacer.className = "category-spacer";
      spacer.setAttribute("aria-hidden", "true");
      board.appendChild(spacer);
    });
    root.replaceChildren(board);
  }

  function renderOverlay(overlay, game, handlers) {
    const current = game.getCurrent();
    if (!current) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      overlay.replaceChildren();
      return;
    }
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    const revealed = game.isAnswerVisible();
    const card = document.createElement("div");
    card.className = "question-card";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "close-btn";
    close.textContent = "×";
    close.setAttribute("aria-label", "Sualı bağla");
    close.addEventListener("click", handlers.back);
    const kicker = document.createElement("p");
    kicker.className = "question-kicker";
    kicker.textContent = `${current.category} — ${current.value} BAL`;
    const question = document.createElement("h2");
    question.className = "question-text";
    question.textContent = `“${current.question}”`;
    const answerBlock = document.createElement("div");
    answerBlock.className = revealed ? "answer-block" : "answer-block hidden";
    if (revealed) {
      const label = document.createElement("p");
      label.className = "answer-label";
      label.textContent = "DÜZGÜN CAVAB";
      const answer = document.createElement("p");
      answer.className = "answer-text";
      answer.textContent = `“${current.answer}”`;
      answerBlock.append(label, answer);
    }
    const actions = document.createElement("div");
    actions.className = "actions";
    if (!revealed) {
      const hint = document.createElement("p");
      hint.className = "hint";
      hint.textContent = "İştirakçı cavabını desin, sonra düzgün cavabı açın.";
      const showBtn = document.createElement("button");
      showBtn.type = "button";
      showBtn.className = "primary-btn";
      showBtn.textContent = "Cavabı göstər";
      showBtn.addEventListener("click", handlers.reveal);
      card.append(close, kicker, question, hint, showBtn);
    } else {
      game.getTeams().forEach((team) => {
        const already = game.wasAwarded(team.id);
        const teamActions = document.createElement("div");
        teamActions.className = "team-actions";
        const teamName = document.createElement("p");
        teamName.className = "team-action-name";
        teamName.textContent = team.name;
        teamActions.appendChild(teamName);
        [[`+${current.value}`, handlers.award, "award-btn"], [`−${current.value}`, handlers.penalize, "award-btn penalty-btn"]].forEach(([text, action, className]) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = className;
          button.disabled = already;
          button.textContent = already ? `${team.name} · qeyd edildi` : `${team.name} · ${text}`;
          button.addEventListener("click", () => action(team.id));
          teamActions.appendChild(button);
        });
        actions.appendChild(teamActions);
      });
      card.append(close, kicker, question, answerBlock, actions);
    }
    overlay.replaceChildren(card);
  }

  function renderScoreboard(root, game, handlers) {
    const wrap = document.createElement("div");
    wrap.className = "scoreboard";
    const countControl = document.createElement("div");
    countControl.className = "team-count";
    const label = document.createElement("label");
    label.htmlFor = "team-count-input";
    label.textContent = "Komanda sayı";
    const count = document.createElement("input");
    count.id = "team-count-input";
    count.type = "number";
    count.min = "1";
    count.max = "20";
    count.value = String(game.getTeams().length);
    count.addEventListener("change", () => handlers.setTeamCount(count.value));
    countControl.append(label, count);
    wrap.appendChild(countControl);
    game.getTeams().forEach((team) => {
      const card = document.createElement("div");
      card.className = "team";
      const meta = document.createElement("div");
      meta.className = "team-meta";
      const name = document.createElement("input");
      name.className = "team-name";
      name.value = team.name;
      name.maxLength = 24;
      name.addEventListener("change", () => handlers.rename(team.id, name.value));
      const score = document.createElement("div");
      score.className = "team-score";
      score.textContent = String(team.score);
      meta.append(name, score);
      const scoreControls = document.createElement("div");
      scoreControls.className = "score-controls";
      [["−", -10], ["+", 10]].forEach(([symbol, delta]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = symbol;
        button.addEventListener("click", () => handlers.adjust(team.id, delta));
        scoreControls.appendChild(button);
      });
      card.append(meta, scoreControls);
      wrap.appendChild(card);
    });
    const progress = document.createElement("div");
    progress.className = "progress";
    progress.textContent = `${game.getViewedCount()} sualın cavabı açılıb`;
    wrap.appendChild(progress);
    root.replaceChildren(wrap);
  }
  Bilik.renderBoard = renderBoard;
  Bilik.renderOverlay = renderOverlay;
  Bilik.renderScoreboard = renderScoreboard;
})(window.Bilik);
