const STORAGE_KEY = "olympiades-anniversaire-v1";

const TEAMS = [
  { id: "CAIPI", color: "#ef4444" },
  { id: "VIRGIN", color: "#eab308" },
  { id: "VICHY", color: "#3b82f6" },
  { id: "NAYVI", color: "#8b5cf6" }
];

const EVENT_DEFS = [
  { id: "race", name: "The Blinded Race + Rébus", short: "Blinded Race", rule: "Saisir le rang d’arrivée. 1er = 15, 2e = 10, 3e = 5, 4e = 0." },
  { id: "measure", name: "La Juste Mesure", short: "Juste Mesure", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "weight", name: "Le Juste Poids", short: "Juste Poids", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "price", name: "Le Juste Prix", short: "Juste Prix", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "time", name: "Le Juste Temps", short: "Juste Temps", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "submarine", name: "Championnat Submarine", short: "Submarine", rule: "Classement final : 1er = 7, 2e = 5, 3e = 3, 4e = 0." },
  { id: "cafe", name: "Course du Garçon de Café", short: "Garçon de Café", rule: "1er = 15, 2e = 10, 3e = 5, 4e = 0, puis −1 point par verre perdu." },
  { id: "water", name: "Water Cup", short: "Water Cup", rule: "Classement final : 1er = 7, 2e = 5, 3e = 3, 4e = 0." },
  { id: "kahoot", name: "Kahoot sur Maëlle", short: "Kahoot Maëlle", rule: "Chaque bonne réponse rapporte 2 points." },
  { id: "costume", name: "Concours de Déguisement", short: "Déguisement", rule: "1er = 30, 2e = 20, 3e = 10. Un duo attribue tous les points aux deux équipes." },
  { id: "taste", name: "Dégustation Mystère Bretz", short: "Dégustation Bretz", rule: "Goût exact = 5 points, plus 1 point par ingrédient trouvé." }
];

const sampleData = {
  version: 1,
  order: EVENT_DEFS.map(event => event.id),
  events: {
    race: { type: "rank", ranks: { CAIPI: 1, VIRGIN: 2, VICHY: 3, NAYVI: 4 }, scale: [15, 10, 5, 0] },
    measure: {
      type: "estimate", unit: "m", rounds: [
        { actual: 10.5, estimates: { CAIPI: 11, VIRGIN: 12.4, VICHY: 10.2, NAYVI: 25 } },
        { actual: 22.3, estimates: { CAIPI: 20.5, VIRGIN: 21, VICHY: 21, NAYVI: 22.5 } },
        { actual: 5.35, estimates: { CAIPI: 7, VIRGIN: 4.6, VICHY: 7, NAYVI: 6.78 } },
        { actual: 14.78, estimates: { CAIPI: 12, VIRGIN: 15, VICHY: 15.6, NAYVI: 13.2 } },
        { actual: 3.65, estimates: { CAIPI: 3, VIRGIN: 4.3, VICHY: 2.9, NAYVI: 3.7 } }
      ]
    },
    weight: {
      type: "estimate", unit: "g", rounds: [
        { actual: 3.25, estimates: { CAIPI: 3, VIRGIN: 3.5, VICHY: 2.9, NAYVI: 3 } },
        { actual: 6.65, estimates: { CAIPI: 6, VIRGIN: 7, VICHY: 7.5, NAYVI: 6.5 } },
        { actual: 1.78, estimates: { CAIPI: 1, VIRGIN: 2, VICHY: 2.5, NAYVI: 1.5 } },
        { actual: 0.45, estimates: { CAIPI: 1, VIRGIN: 2, VICHY: 0.5, NAYVI: 0.6 } },
        { actual: 10.4, estimates: { CAIPI: null, VIRGIN: null, VICHY: null, NAYVI: null } }
      ]
    },
    price: {
      type: "estimate", unit: "€", rounds: [
        { actual: 100000, estimates: { CAIPI: 90000, VIRGIN: 75000, VICHY: 120000, NAYVI: 96000 } },
        { actual: 4, estimates: { CAIPI: 3, VIRGIN: 3.5, VICHY: 7, NAYVI: 4.3 } },
        { actual: 30567, estimates: { CAIPI: 40000, VIRGIN: 37000, VICHY: 25050, NAYVI: 29000 } },
        { actual: 456, estimates: { CAIPI: 500, VIRGIN: 350, VICHY: 450, NAYVI: 100 } },
        { actual: 1000000, estimates: { CAIPI: 1000000, VIRGIN: 30000, VICHY: 900000, NAYVI: 690000 } },
        { actual: 23000, estimates: { CAIPI: 40000, VIRGIN: 20000, VICHY: 45000, NAYVI: 35000 } },
        { actual: 27, estimates: { CAIPI: 30, VIRGIN: 29, VICHY: 25, NAYVI: 50 } },
        { actual: 135, estimates: { CAIPI: 200, VIRGIN: 120, VICHY: 140, NAYVI: 100 } },
        { actual: 250000, estimates: { CAIPI: 150000, VIRGIN: 300000, VICHY: 90000, NAYVI: 325000 } },
        { actual: 38950, estimates: { CAIPI: 400, VIRGIN: 60000, VICHY: 50000, NAYVI: 40000 } }
      ]
    },
    time: {
      type: "estimate", unit: "s", rounds: [
        { actual: 30, estimates: { CAIPI: 28.5, VIRGIN: 31, VICHY: 34, NAYVI: 35 } },
        { actual: 60, estimates: { CAIPI: 65, VIRGIN: 64, VICHY: 56, NAYVI: 57 } },
        { actual: 90, estimates: { CAIPI: 93, VIRGIN: 100, VICHY: 87, NAYVI: 90 } }
      ]
    },
    submarine: { type: "rank", ranks: { CAIPI: 2, VIRGIN: 4, VICHY: 1, NAYVI: 3 }, scale: [7, 5, 3, 0] },
    cafe: {
      type: "penaltyRank",
      ranks: { CAIPI: 4, VIRGIN: 2, VICHY: 3, NAYVI: 1 },
      penalties: { CAIPI: 4, VIRGIN: 3, VICHY: 6, NAYVI: 10 },
      scale: [15, 10, 5, 0]
    },
    water: { type: "rank", ranks: { CAIPI: 2, VIRGIN: 3, VICHY: 4, NAYVI: 1 }, scale: [7, 5, 3, 0] },
    kahoot: {
      type: "quiz",
      answers: [
        { CAIPI: 1, VIRGIN: 1, VICHY: 1, NAYVI: 1 },
        { CAIPI: 0, VIRGIN: 0, VICHY: 1, NAYVI: 0 },
        { CAIPI: 1, VIRGIN: 1, VICHY: 0, NAYVI: 1 },
        { CAIPI: 1, VIRGIN: 1, VICHY: 1, NAYVI: 1 },
        { CAIPI: 1, VIRGIN: 1, VICHY: 0, NAYVI: 1 },
        { CAIPI: 0, VIRGIN: 0, VICHY: 0, NAYVI: 1 },
        { CAIPI: 1, VIRGIN: 0, VICHY: 1, NAYVI: 0 },
        { CAIPI: 1, VIRGIN: 1, VICHY: 1, NAYVI: 0 },
        { CAIPI: 1, VIRGIN: 1, VICHY: 0, NAYVI: 1 },
        { CAIPI: 1, VIRGIN: 0, VICHY: 1, NAYVI: 0 }
      ]
    },
    costume: {
      type: "winners",
      winners: [
        { participant: "ROCCO", team1: "CAIPI", team2: "VIRGIN", points: 30 },
        { participant: "FLORIAN", team1: "VICHY", team2: "", points: 20 },
        { participant: "MAELLE", team1: "NAYVI", team2: "", points: 10 }
      ]
    },
    taste: {
      type: "taste",
      rounds: [
        { CAIPI: { exact: true, ingredients: 0 }, VIRGIN: { exact: true, ingredients: 0 }, VICHY: { exact: false, ingredients: 1 }, NAYVI: { exact: false, ingredients: 0 } },
        { CAIPI: { exact: false, ingredients: 0 }, VIRGIN: { exact: true, ingredients: 0 }, VICHY: { exact: true, ingredients: 0 }, NAYVI: { exact: true, ingredients: 0 } },
        { CAIPI: { exact: false, ingredients: 0 }, VIRGIN: { exact: false, ingredients: 0 }, VICHY: { exact: false, ingredients: 0 }, NAYVI: { exact: false, ingredients: 0 } },
        { CAIPI: { exact: false, ingredients: 2 }, VIRGIN: { exact: false, ingredients: 0 }, VICHY: { exact: true, ingredients: 0 }, NAYVI: { exact: true, ingredients: 0 } },
        { CAIPI: { exact: false, ingredients: 0 }, VIRGIN: { exact: true, ingredients: 0 }, VICHY: { exact: true, ingredients: 0 }, NAYVI: { exact: false, ingredients: 0 } },
        { CAIPI: { exact: false, ingredients: 1 }, VIRGIN: { exact: false, ingredients: 0 }, VICHY: { exact: true, ingredients: 0 }, NAYVI: { exact: true, ingredients: 0 } }
      ]
    }
  }
};

let state = loadState();
let currentView = "dashboard";
let currentEvent = null;
let toastTimer;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function blankState() {
  const blank = clone(sampleData);
  Object.values(blank.events).forEach(event => {
    if (event.ranks) Object.keys(event.ranks).forEach(team => event.ranks[team] = null);
    if (event.penalties) Object.keys(event.penalties).forEach(team => event.penalties[team] = 0);
    if (event.rounds && event.type === "estimate") event.rounds.forEach(round => {
      round.actual = null;
      Object.keys(round.estimates).forEach(team => round.estimates[team] = null);
    });
    if (event.answers) event.answers.forEach(answer => Object.keys(answer).forEach(team => answer[team] = 0));
    if (event.winners) event.winners.forEach(winner => {
      winner.participant = "";
      winner.team1 = "";
      winner.team2 = "";
    });
    if (event.type === "taste") event.rounds.forEach(round => Object.values(round).forEach(team => {
      team.exact = false;
      team.ingredients = 0;
    }));
  });
  return blank;
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.events && Array.isArray(stored.order)) return stored;
  } catch (error) {
    console.warn("Sauvegarde locale illisible", error);
  }
  return clone(sampleData);
}

function saveState(message = "") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function eventDef(id) {
  return EVENT_DEFS.find(event => event.id === id);
}

function emptyScores() {
  return Object.fromEntries(TEAMS.map(team => [team.id, 0]));
}

function num(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function scoresFor(eventId) {
  const event = state.events[eventId];
  const scores = emptyScores();
  if (!event) return scores;

  if (event.type === "rank") {
    TEAMS.forEach(team => {
      const rank = num(event.ranks[team.id]);
      scores[team.id] = rank >= 1 && rank <= event.scale.length ? event.scale[rank - 1] : 0;
    });
  }

  if (event.type === "penaltyRank") {
    TEAMS.forEach(team => {
      const rank = num(event.ranks[team.id]);
      const base = rank >= 1 && rank <= event.scale.length ? event.scale[rank - 1] : 0;
      scores[team.id] = base - (num(event.penalties[team.id]) || 0);
    });
  }

  if (event.type === "estimate") {
    event.rounds.forEach(round => {
      const actual = num(round.actual);
      if (actual === null) return;
      const valid = TEAMS
        .map(team => ({ id: team.id, value: num(round.estimates[team.id]) }))
        .filter(entry => entry.value !== null)
        .map(entry => ({ ...entry, gap: Math.abs(entry.value - actual) }));
      if (!valid.length) return;
      const minGap = Math.min(...valid.map(entry => entry.gap));
      valid.forEach(entry => {
        if (Math.abs(entry.gap - minGap) < 1e-9) scores[entry.id] += 5;
        if (entry.gap < 1e-9) scores[entry.id] += 20;
      });
    });
  }

  if (event.type === "quiz") {
    TEAMS.forEach(team => {
      scores[team.id] = event.answers.reduce((sum, answer) => sum + (Number(answer[team.id]) === 1 ? 2 : 0), 0);
    });
  }

  if (event.type === "winners") {
    event.winners.forEach(winner => {
      if (scores[winner.team1] !== undefined) scores[winner.team1] += Number(winner.points) || 0;
      if (winner.team2 && winner.team2 !== winner.team1 && scores[winner.team2] !== undefined) {
        scores[winner.team2] += Number(winner.points) || 0;
      }
    });
  }

  if (event.type === "taste") {
    event.rounds.forEach(round => TEAMS.forEach(team => {
      const answer = round[team.id];
      scores[team.id] += (answer.exact ? 5 : 0) + Math.max(0, num(answer.ingredients) || 0);
    }));
  }

  return scores;
}

function totals() {
  const result = emptyScores();
  state.order.forEach(eventId => {
    const scores = scoresFor(eventId);
    TEAMS.forEach(team => result[team.id] += scores[team.id]);
  });
  return result;
}

function ranking() {
  const all = totals();
  return TEAMS.map(team => ({ ...team, score: all[team.id] }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inputValue(value) {
  return value === null || value === undefined ? "" : escapeHtml(value);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function teamStyle(teamId) {
  return `--team:${TEAMS.find(team => team.id === teamId)?.color || "#64748b"}`;
}

function scoreStrip(eventId) {
  const scores = scoresFor(eventId);
  return `<div class="score-strip">${TEAMS.map(team => `
    <div class="mini-score" style="${teamStyle(team.id)}">
      <span>${team.id}</span><strong>${scores[team.id]}</strong>
    </div>`).join("")}</div>`;
}

function renderDashboard() {
  const ranked = ranking();
  const winner = ranked[0];
  return `
    <section class="hero-card">
      <p class="hero-label">En tête du classement</p>
      <h2 class="hero-winner">${winner.id}</h2>
      <p class="hero-score">${winner.score} points · ${winner.score - ranked[1].score} point${winner.score - ranked[1].score > 1 ? "s" : ""} d’avance</p>
    </section>

    <div class="section-heading">
      <div><h2>Classement général</h2><p>Mis à jour automatiquement</p></div>
      <span class="status-pill">Sauvegardé</span>
    </div>
    <section class="rank-list">
      ${ranked.map((team, index) => `
        <article class="rank-card">
          <div class="rank-position">${index + 1}</div>
          <div>
            <div class="team-row" style="${teamStyle(team.id)}">
              <span class="team-dot"></span><span class="team-name">${team.id}</span>
            </div>
            <div class="team-detail">${index === 0 ? "Leader" : `${winner.score - team.score} pts du leader`}</div>
          </div>
          <div class="score">${team.score}<small> pts</small></div>
        </article>`).join("")}
    </section>

    <div class="section-heading">
      <div><h2>Progression</h2><p>Scores cumulés selon l’ordre des épreuves</p></div>
    </div>
    <section class="chart-card">
      <div class="chart-wrap">${progressChart()}</div>
      <div class="legend">${TEAMS.map(team => `
        <span class="legend-item" style="${teamStyle(team.id)}"><span class="team-dot"></span>${team.id}</span>`).join("")}
      </div>
    </section>`;
}

function progressChart() {
  const width = 760, height = 250, left = 38, top = 18, right = 16, bottom = 40;
  const series = Object.fromEntries(TEAMS.map(team => [team.id, [0]]));
  state.order.forEach(eventId => {
    const eventScores = scoresFor(eventId);
    TEAMS.forEach(team => {
      const current = series[team.id];
      current.push(current[current.length - 1] + eventScores[team.id]);
    });
  });
  const max = Math.max(10, ...Object.values(series).flat());
  const x = index => left + index * ((width - left - right) / Math.max(1, state.order.length));
  const y = value => top + (max - value) * ((height - top - bottom) / max);
  const grid = [0, .25, .5, .75, 1].map(part => {
    const value = Math.round(max * part);
    return `<line x1="${left}" y1="${y(value)}" x2="${width-right}" y2="${y(value)}" stroke="#e2e8f0"/>
      <text x="${left-7}" y="${y(value)+4}" text-anchor="end" fill="#94a3b8" font-size="10">${value}</text>`;
  }).join("");
  const lines = TEAMS.map(team => {
    const points = series[team.id].map((value, index) => `${x(index)},${y(value)}`).join(" ");
    const dots = series[team.id].map((value, index) =>
      `<circle cx="${x(index)}" cy="${y(value)}" r="3.5" fill="${team.color}" stroke="#fff" stroke-width="2"/>`
    ).join("");
    return `<polyline points="${points}" fill="none" stroke="${team.color}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}`;
  }).join("");
  const labels = state.order.map((id, index) =>
    `<text x="${x(index + 1)}" y="${height-16}" text-anchor="middle" fill="#64748b" font-size="10">${index + 1}</text>`
  ).join("");
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Évolution cumulée des scores">
    ${grid}${lines}${labels}
    <text x="${left}" y="${height-3}" fill="#94a3b8" font-size="10">Départ</text>
  </svg>`;
}

function renderEvents() {
  return `
    <div class="section-heading" style="margin-top:4px">
      <div><h2>Les 11 épreuves</h2><p>Ouvrez une épreuve pour saisir ses résultats</p></div>
    </div>
    <section class="event-list">
      ${state.order.map((id, index) => {
        const def = eventDef(id);
        const scores = scoresFor(id);
        const best = Math.max(...Object.values(scores));
        const leaders = TEAMS.filter(team => scores[team.id] === best).map(team => team.id).join(" · ");
        return `<button class="event-card" data-open-event="${id}">
          <span class="event-number">${index + 1}</span>
          <span><strong>${def.name}</strong><small>${leaders} · ${best} pts</small></span>
          <span class="chevron">›</span>
        </button>`;
      }).join("")}
    </section>`;
}

function renderEventEditor(id) {
  const def = eventDef(id);
  const event = state.events[id];
  return `
    <div class="event-header">
      <button class="back-button" data-back-events aria-label="Retour">←</button>
      <div><h2>${def.name}</h2><p>${def.rule}</p></div>
    </div>
    ${scoreStrip(id)}
    ${event.type === "rank" ? rankEditor(id, event) : ""}
    ${event.type === "penaltyRank" ? penaltyRankEditor(id, event) : ""}
    ${event.type === "estimate" ? estimateEditor(id, event) : ""}
    ${event.type === "quiz" ? quizEditor(id, event) : ""}
    ${event.type === "winners" ? winnersEditor(id, event) : ""}
    ${event.type === "taste" ? tasteEditor(id, event) : ""}
    <div class="spacer"></div>
    <button class="button secondary wide" data-back-events>Terminer la saisie</button>`;
}

function rankOptions(selected) {
  return `<option value="">—</option>${[1,2,3,4].map(rank =>
    `<option value="${rank}" ${Number(selected) === rank ? "selected" : ""}>${rank}${rank === 1 ? "er" : "e"}</option>`
  ).join("")}`;
}

function rankEditor(id, event) {
  return `<section class="card"><div class="field-grid">
    ${TEAMS.map(team => `<label class="field-team" style="${teamStyle(team.id)}">${team.id}
      <select data-event="${id}" data-team="${team.id}" data-field="rank">${rankOptions(event.ranks[team.id])}</select>
    </label>`).join("")}
  </div></section>`;
}

function penaltyRankEditor(id, event) {
  return `<section class="card"><div class="field-grid">
    ${TEAMS.map(team => `<div class="field-team" style="${teamStyle(team.id)}">
      <label>${team.id} · rang<select data-event="${id}" data-team="${team.id}" data-field="rank">${rankOptions(event.ranks[team.id])}</select></label>
      <label style="margin-top:9px">Verres perdus<input type="number" min="0" inputmode="numeric" value="${inputValue(event.penalties[team.id])}" data-event="${id}" data-team="${team.id}" data-field="penalty"></label>
    </div>`).join("")}
  </div></section>`;
}

function estimateEditor(id, event) {
  return event.rounds.map((round, roundIndex) => `
    <section class="round-card">
      <div class="round-title"><span>Manche ${roundIndex + 1}</span><span class="muted">${event.unit}</span></div>
      <label>Valeur réelle
        <input type="number" step="any" inputmode="decimal" value="${inputValue(round.actual)}" data-event="${id}" data-round="${roundIndex}" data-field="actual">
      </label>
      <div class="field-grid four" style="margin-top:12px">
        ${TEAMS.map(team => `<label class="field-team" style="${teamStyle(team.id)}">${team.id}
          <input type="number" step="any" inputmode="decimal" value="${inputValue(round.estimates[team.id])}" data-event="${id}" data-round="${roundIndex}" data-team="${team.id}" data-field="estimate">
        </label>`).join("")}
      </div>
    </section>`).join("");
}

function quizEditor(id, event) {
  return event.answers.map((answer, index) => `
    <section class="round-card">
      <div class="round-title"><span>Question ${index + 1}</span><span class="muted">2 pts</span></div>
      <div class="field-grid four">
        ${TEAMS.map(team => `<label class="field-team" style="${teamStyle(team.id)}">${team.id}
          <select data-event="${id}" data-round="${index}" data-team="${team.id}" data-field="answer">
            <option value="0" ${Number(answer[team.id]) === 0 ? "selected" : ""}>Mauvaise</option>
            <option value="1" ${Number(answer[team.id]) === 1 ? "selected" : ""}>Bonne</option>
          </select>
        </label>`).join("")}
      </div>
    </section>`).join("");
}

function teamOptions(selected, allowEmpty = true) {
  return `${allowEmpty ? '<option value="">Aucune</option>' : ""}${TEAMS.map(team =>
    `<option value="${team.id}" ${selected === team.id ? "selected" : ""}>${team.id}</option>`
  ).join("")}`;
}

function winnersEditor(id, event) {
  return event.winners.map((winner, index) => `
    <section class="round-card">
      <div class="round-title"><span>${index + 1}${index === 0 ? "er" : "e"} prix</span><span>${winner.points} pts</span></div>
      <div class="field-grid">
        <label>Participant ou duo<input type="text" value="${inputValue(winner.participant)}" data-event="${id}" data-round="${index}" data-field="participant"></label>
        <label>Équipe 1<select data-event="${id}" data-round="${index}" data-field="team1">${teamOptions(winner.team1)}</select></label>
        <label>Équipe 2 si duo<select data-event="${id}" data-round="${index}" data-field="team2">${teamOptions(winner.team2)}</select></label>
      </div>
    </section>`).join("");
}

function tasteEditor(id, event) {
  return event.rounds.map((round, index) => `
    <section class="round-card">
      <div class="round-title"><span>Saveur ${index + 1}</span><span class="muted">5 pts + ingrédients</span></div>
      <div class="field-grid">
        ${TEAMS.map(team => `<div class="field-team" style="${teamStyle(team.id)}">
          <label>${team.id} · goût exact
            <select data-event="${id}" data-round="${index}" data-team="${team.id}" data-field="exact">
              <option value="0" ${!round[team.id].exact ? "selected" : ""}>Non</option>
              <option value="1" ${round[team.id].exact ? "selected" : ""}>Oui</option>
            </select>
          </label>
          <label style="margin-top:9px">Ingrédients trouvés
            <input type="number" min="0" inputmode="numeric" value="${inputValue(round[team.id].ingredients)}" data-event="${id}" data-round="${index}" data-team="${team.id}" data-field="ingredients">
          </label>
        </div>`).join("")}
      </div>
    </section>`).join("");
}

function renderOrder() {
  return `
    <section class="card" style="margin-bottom:14px">
      <h3>Ordre de passage</h3>
      <p class="muted">Utilisez les flèches sur iPhone ou faites glisser les cartes sur ordinateur. Le graphique et la numérotation se mettent à jour.</p>
    </section>
    <section class="order-list">
      ${state.order.map((id, index) => `
        <article class="order-item" draggable="true" data-order-id="${id}">
          <span class="drag-handle">≡</span>
          <div><strong>${index + 1}. ${eventDef(id).name}</strong></div>
          <div class="order-controls">
            <button data-move="${id}" data-direction="-1" ${index === 0 ? "disabled" : ""} aria-label="Monter">↑</button>
            <button data-move="${id}" data-direction="1" ${index === state.order.length - 1 ? "disabled" : ""} aria-label="Descendre">↓</button>
          </div>
        </article>`).join("")}
    </section>`;
}

function renderSettings() {
  return `
    <section class="settings-stack">
      <article class="card setting-card">
        <h3>Sauvegarde automatique</h3>
        <p>Chaque modification est enregistrée immédiatement sur cet appareil. L’application fonctionne hors connexion après sa première ouverture.</p>
        <span class="status-pill">Active</span>
      </article>
      <article class="card setting-card">
        <h3>Exporter ou restaurer</h3>
        <p>Conservez une copie dans Fichiers ou iCloud. Le fichier contient les résultats et l’ordre des épreuves.</p>
        <div class="button-row">
          <button class="button" id="export-btn">Exporter</button>
          <button class="button secondary" id="import-btn">Importer</button>
        </div>
      </article>
      <article class="card setting-card">
        <h3>Installation sur iPhone</h3>
        <p>Dans Safari, touchez Partager puis « Sur l’écran d’accueil ». L’application s’ouvrira ensuite comme une application classique.</p>
      </article>
      <article class="card setting-card">
        <h3>Données</h3>
        <p>Vous pouvez repartir d’une feuille vierge ou restaurer les données actuellement présentes dans le classeur Excel.</p>
        <div class="button-row">
          <button class="button danger" id="blank-btn">Nouvelle partie</button>
          <button class="button secondary" id="sample-btn">Données Excel</button>
        </div>
      </article>
    </section>`;
}

function render() {
  const app = document.querySelector("#app");
  const titles = { dashboard: "Classement", events: currentEvent ? eventDef(currentEvent).short : "Épreuves", order: "Ordre des épreuves", settings: "Réglages" };
  document.querySelector("#page-title").textContent = titles[currentView];

  if (currentView === "dashboard") app.innerHTML = renderDashboard();
  if (currentView === "events") app.innerHTML = currentEvent ? renderEventEditor(currentEvent) : renderEvents();
  if (currentView === "order") app.innerHTML = renderOrder();
  if (currentView === "settings") app.innerHTML = renderSettings();

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });
  bindDragAndDrop();
}

function navigate(view) {
  currentView = view;
  if (view !== "events") currentEvent = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

document.querySelector(".bottom-nav").addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (button) navigate(button.dataset.view);
});

document.querySelector("#app").addEventListener("click", event => {
  const open = event.target.closest("[data-open-event]");
  if (open) {
    currentEvent = open.dataset.openEvent;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("[data-back-events]")) {
    currentEvent = null;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const move = event.target.closest("[data-move]");
  if (move) {
    moveEvent(move.dataset.move, Number(move.dataset.direction));
    return;
  }
  if (event.target.closest("#export-btn")) exportData();
  if (event.target.closest("#import-btn")) document.querySelector("#import-file").click();
  if (event.target.closest("#blank-btn") && confirm("Commencer une nouvelle partie ? Les données actuelles seront remplacées.")) {
    state = blankState();
    saveState("Nouvelle partie créée");
    render();
  }
  if (event.target.closest("#sample-btn") && confirm("Restaurer les données du classeur Excel ?")) {
    state = clone(sampleData);
    saveState("Données Excel restaurées");
    render();
  }
});

document.querySelector("#app").addEventListener("change", event => {
  const input = event.target.closest("[data-event]");
  if (!input) return;
  updateField(input);
  saveState();
  render();
});

function updateField(input) {
  const { event: eventId, field, team } = input.dataset;
  const roundIndex = Number(input.dataset.round);
  const event = state.events[eventId];
  const value = input.type === "number" || ["rank", "penalty", "estimate", "actual", "answer", "ingredients"].includes(field)
    ? num(input.value)
    : input.value;

  if (field === "rank") event.ranks[team] = value;
  if (field === "penalty") event.penalties[team] = value || 0;
  if (field === "actual") event.rounds[roundIndex].actual = value;
  if (field === "estimate") event.rounds[roundIndex].estimates[team] = value;
  if (field === "answer") event.answers[roundIndex][team] = value || 0;
  if (field === "participant") event.winners[roundIndex].participant = value;
  if (field === "team1" || field === "team2") event.winners[roundIndex][field] = value;
  if (field === "exact") event.rounds[roundIndex][team].exact = value === "1";
  if (field === "ingredients") event.rounds[roundIndex][team].ingredients = value || 0;
}

function moveEvent(id, direction) {
  const index = state.order.indexOf(id);
  const target = index + direction;
  if (target < 0 || target >= state.order.length) return;
  [state.order[index], state.order[target]] = [state.order[target], state.order[index]];
  saveState("Ordre mis à jour");
  render();
}

function bindDragAndDrop() {
  document.querySelectorAll("[data-order-id]").forEach(item => {
    item.addEventListener("dragstart", () => item.classList.add("dragging"));
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      document.querySelectorAll(".drag-over").forEach(node => node.classList.remove("drag-over"));
    });
    item.addEventListener("dragover", event => {
      event.preventDefault();
      item.classList.add("drag-over");
    });
    item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
    item.addEventListener("drop", event => {
      event.preventDefault();
      const dragged = document.querySelector(".dragging");
      if (!dragged || dragged === item) return;
      const from = state.order.indexOf(dragged.dataset.orderId);
      const to = state.order.indexOf(item.dataset.orderId);
      const [moved] = state.order.splice(from, 1);
      state.order.splice(to, 0, moved);
      saveState("Ordre mis à jour");
      render();
    });
  });
}

function exportData() {
  const payload = { exportedAt: new Date().toISOString(), application: "Olympiades Anniversaire", ...state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `olympiades-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  showToast("Sauvegarde exportée");
}

document.querySelector("#import-file").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!imported.events || !Array.isArray(imported.order)) throw new Error("Format invalide");
    state = { version: imported.version || 1, events: imported.events, order: imported.order };
    saveState("Sauvegarde restaurée");
    render();
  } catch {
    alert("Ce fichier de sauvegarde n’est pas valide.");
  }
  event.target.value = "";
});

document.querySelector("#fullscreen-btn").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
}

render();
