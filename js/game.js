(function (Bilik) {
  function createGame() {
    const categories = [...Bilik.CATEGORY_ORDER];
    const questions = Bilik.QUESTIONS.map((question) => ({ ...question }));
    const viewed = new Set();
    const resolvedByQuestion = new Map();
    let current = null;
    let answerVisible = false;
    let nextTeamId = 2;
    const teams = [{ id: 0, name: "KOMANDA 1", score: 0 }, { id: 1, name: "KOMANDA 2", score: 0 }];

    function currentId() { return current ? Bilik.cellId(current.category, current.value) : null; }
    function resolvedTeams() {
      const id = currentId();
      if (!id) return new Set();
      if (!resolvedByQuestion.has(id)) resolvedByQuestion.set(id, new Set());
      return resolvedByQuestion.get(id);
    }

    return {
      getCategories() { return [...categories]; },
      getQuestion(category, value) { return questions.find((item) => item.category === category && item.value === value) ?? null; },
      getAvailableValue(category) { return Bilik.VALUES.find((value) => !this.getQuestion(category, value)) ?? null; },
      getViewedCount() { return viewed.size; },
      isViewed(category, value) { return viewed.has(Bilik.cellId(category, value)); },
      getCurrent() { return current; },
      isAnswerVisible() { return answerVisible; },
      getTeams() { return teams.map((team) => ({ ...team })); },
      select(question) {
        if (!question || current) return false;
        current = question;
        answerVisible = false;
        return true;
      },
      revealAnswer() {
        if (!current) return false;
        viewed.add(currentId());
        answerVisible = true;
        return true;
      },
      returnToBoard() { current = null; answerVisible = false; },
      wasAwarded(teamId) { return resolvedTeams().has(teamId); },
      award(teamId) {
        const team = teams.find((item) => item.id === teamId);
        if (!team || !current || this.wasAwarded(teamId)) return false;
        team.score += current.value;
        resolvedTeams().add(teamId);
        return true;
      },
      penalize(teamId) {
        const team = teams.find((item) => item.id === teamId);
        if (!team || !current || this.wasAwarded(teamId)) return false;
        team.score -= current.value;
        resolvedTeams().add(teamId);
        return true;
      },
      adjustScore(teamId, delta) {
        const team = teams.find((item) => item.id === teamId);
        if (!team) return false;
        team.score += delta;
        return true;
      },
      setTeamCount(count) {
        const nextCount = Math.max(1, Math.min(20, Number.parseInt(count, 10) || 1));
        while (teams.length < nextCount) {
          teams.push({ id: nextTeamId, name: `KOMANDA ${teams.length + 1}`, score: 0 });
          nextTeamId += 1;
        }
        if (teams.length > nextCount) teams.splice(nextCount);
        return true;
      },
      renameTeam(teamId, name) {
        const team = teams.find((item) => item.id === teamId);
        const next = name.trim().slice(0, 24);
        if (!team || !next) return false;
        team.name = next.toUpperCase();
        return true;
      },
      renameCategory(category, name) {
        const next = name.trim().slice(0, 28).toUpperCase();
        if (!next || (categories.includes(next) && next !== category)) return false;
        const index = categories.indexOf(category);
        if (index < 0) return false;
        categories[index] = next;
        questions.forEach((question) => { if (question.category === category) question.category = next; });
        const oldPrefix = `${category}::`;
        [...viewed].forEach((id) => {
          if (id.startsWith(oldPrefix)) { viewed.delete(id); viewed.add(`${next}::${id.slice(oldPrefix.length)}`); }
        });
        [...resolvedByQuestion.entries()].forEach(([id, value]) => {
          if (id.startsWith(oldPrefix)) { resolvedByQuestion.delete(id); resolvedByQuestion.set(`${next}::${id.slice(oldPrefix.length)}`, value); }
        });
        return true;
      },
      addCategory(name) {
        const next = name.trim().slice(0, 28).toUpperCase();
        if (!next || categories.includes(next)) return false;
        categories.push(next);
        return true;
      },
      addQuestion(category, questionText, answer) {
        const value = this.getAvailableValue(category);
        if (!categories.includes(category) || !value || !questionText.trim() || !answer.trim()) return false;
        questions.push({ category, value, question: questionText.trim(), answer: answer.trim() });
        return true;
      },
      reset() {
        viewed.clear();
        resolvedByQuestion.clear();
        current = null;
        answerVisible = false;
        teams.forEach((team) => { team.score = 0; });
      },
    };
  }
  Bilik.createGame = createGame;
})(window.Bilik);
