const STORAGE_KEY = "olympiades-anniversaire-v1";
const APP_VERSION = "6.0";

const DEFAULT_TEAMS = [
  { id: "CAIPI", name: "CAIPI", color: "#ef4444" },
  { id: "VIRGIN", name: "VIRGIN", color: "#eab308" },
  { id: "VICHY", name: "VICHY", color: "#3b82f6" },
  { id: "NAYVI", name: "NAYVI", color: "#8b5cf6" }
];

const TEAM_COLORS = ["#ef4444", "#eab308", "#3b82f6", "#8b5cf6", "#10b981", "#f97316", "#ec4899", "#06b6d4", "#84cc16", "#6366f1"];

const EVENT_DEFS = [
  { id: "race", name: "The Blinded Race + Rébus", short: "Blinded Race", description: "Chaque équipe réalise une course à l’aveugle, guidée par ses coéquipiers. Une fois le parcours terminé, elle doit résoudre un rébus. Le classement est déterminé par l’ordre d’arrivée après validation du rébus.", rule: "Saisir le rang d’arrivée. 1er = 15, 2e = 10, 3e = 5, 4e = 0." },
  { id: "measure", name: "La Juste Mesure", short: "Juste Mesure", description: "À chaque manche, une distance réelle doit être estimée sans utiliser d’instrument de mesure. Les équipes annoncent leur estimation, puis l’organisateur révèle la valeur réelle et compare les écarts.", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "weight", name: "Le Juste Poids", short: "Juste Poids", description: "Les équipes doivent estimer le poids d’un objet ou d’une quantité présentée, sans utiliser de balance. La valeur réelle est ensuite révélée pour déterminer l’estimation la plus proche.", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "price", name: "Le Juste Prix", short: "Juste Prix", description: "Plusieurs objets, produits ou valeurs sont présentés successivement. Chaque équipe propose un prix, puis le prix réel est annoncé. L’application compare automatiquement les écarts.", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "time", name: "Le Juste Temps", short: "Juste Temps", description: "Pour chaque manche, les équipes doivent estimer une durée annoncée ou réalisée, sans chronomètre. Une fois les estimations enregistrées, le temps réel est révélé.", rule: "La valeur la plus proche gagne 5 points. Une estimation exacte ajoute 20 points." },
  { id: "submarine", name: "Championnat Submarine", short: "Submarine", description: "Les équipes participent au championnat du jeu Submarine. À la fin des parties ou du tournoi, l’organisateur saisit le classement général obtenu par chaque équipe.", rule: "Classement final : 1er = 7, 2e = 5, 3e = 3, 4e = 0." },
  { id: "cafe", name: "Course du Garçon de Café", short: "Garçon de Café", description: "Chaque équipe effectue un parcours en transportant des verres comme un garçon de café. Le classement dépend de l’ordre d’arrivée, mais chaque verre renversé ou perdu entraîne une pénalité.", rule: "1er = 15, 2e = 10, 3e = 5, 4e = 0, puis −1 point par verre perdu." },
  { id: "water", name: "Water Cup", short: "Water Cup", description: "Les équipes doivent transporter ou récupérer le plus d’eau possible selon le parcours prévu. À la fin de l’épreuve, elles sont classées selon la quantité d’eau effectivement conservée.", rule: "Classement final : 1er = 7, 2e = 5, 3e = 3, 4e = 0." },
  { id: "kahoot", name: "Kahoot sur Maëlle", short: "Kahoot Maëlle", description: "Les équipes répondent à dix questions consacrées à Maëlle. Pour chaque question, l’organisateur indique dans l’application si la réponse de l’équipe est bonne ou mauvaise.", rule: "Chaque bonne réponse rapporte 2 points." },
  { id: "costume", name: "Concours de Déguisement", short: "Déguisement", description: "Les participants présentent leur déguisement, seuls ou en duo. Un classement des trois meilleurs déguisements est établi. Pour un duo composé de deux équipes, les deux équipes reçoivent les points de la place obtenue.", rule: "1er = 30, 2e = 20, 3e = 10. Un duo attribue tous les points aux deux équipes." },
  { id: "taste", name: "Dégustation Mystère Bretz", short: "Dégustation Bretz", description: "Lors de chaque manche, les équipes goûtent une saveur Bretz à l’aveugle. Elles tentent d’identifier le goût exact et peuvent également citer les ingrédients qu’elles pensent avoir reconnus.", rule: "Goût exact = 5 points, plus 1 point par ingrédient trouvé." }
];

const sampleData = {
  version: 3,
  teams: DEFAULT_TEAMS,
  eventDefs: EVENT_DEFS,
  enabled: Object.fromEntries(EVENT_DEFS.map(event => [event.id, true])),
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
let creatingEvent = false;
let toastTimer;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function teams() {
  return state.teams;
}

function migrateState(data) {
  if (!Array.isArray(data.teams)) data.teams = clone(DEFAULT_TEAMS);
  data.teams = data.teams.map((team, index) => ({
    id: String(team.id || `TEAM_${index + 1}`),
    name: String(team.name || team.id || `Équipe ${index + 1}`),
    color: team.color || TEAM_COLORS[index % TEAM_COLORS.length]
  }));
  if (!Array.isArray(data.eventDefs)) data.eventDefs = clone(EVENT_DEFS);
  data.eventDefs.forEach(def => {
    const nativeDef = EVENT_DEFS.find(item => item.id === def.id);
    if (!def.description && nativeDef?.description) def.description = nativeDef.description;
    if (!def.description) def.description = "Suivez les consignes prévues par l’organisateur pour réaliser cette épreuve.";
  });
  data.eventDefs = data.eventDefs.filter(def => data.events?.[def.id]);
  Object.keys(data.events || {}).forEach(id => {
    if (!data.eventDefs.some(def => def.id === id)) {
      data.eventDefs.push({ id, name: id, short: id, description: "Suivez les consignes prévues par l’organisateur pour réaliser cette épreuve.", rule: "", custom: true });
    }
  });
  if (!data.enabled || typeof data.enabled !== "object") data.enabled = {};
  data.eventDefs.forEach(def => {
    if (data.enabled[def.id] === undefined) data.enabled[def.id] = true;
  });
  Object.values(data.events || {}).forEach(event => {
    if (event.type === "taste") {
      if (event.exactPoints === undefined) event.exactPoints = 5;
      if (event.ingredientPoints === undefined) event.ingredientPoints = 1;
    }
  });
  data.order = data.order.filter(id => data.events[id]);
  data.eventDefs.forEach(def => {
    if (!data.order.includes(def.id)) data.order.push(def.id);
  });
  data.version = 3;
  return data;
}

function blankState() {
  const blank = clone(state);
  Object.values(blank.events).forEach(event => {
    if (event.ranks) Object.keys(event.ranks).forEach(team => event.ranks[team] = null);
    if (event.penalties) Object.keys(event.penalties).forEach(team => event.penalties[team] = 0);
    if (event.rounds && event.type === "estimate") event.rounds.forEach(round => {
      round.actual = null;
      Object.keys(round.estimates).forEach(team => round.estimates[team] = null);
    });
    if (event.answers) event.answers.forEach(answer => Object.keys(answer).forEach(team => answer[team] = 0));
    if (event.type === "manual") Object.keys(event.scores).forEach(team => event.scores[team] = 0);
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
    if (stored?.events && Array.isArray(stored.order)) return migrateState(stored);
  } catch (error) {
    console.warn("Sauvegarde locale illisible", error);
  }
  return migrateState(clone(sampleData));
}

function saveState(message = "") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (message) showToast(message);
}

function eventDef(id) {
  return state.eventDefs.find(event => event.id === id);
}

function activeOrder() {
  return state.order.filter(id => state.enabled[id] !== false);
}

function emptyScores() {
  return Object.fromEntries(teams().map(team => [team.id, 0]));
}

function num(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampCount(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || min));
}

function blankRanks() {
  return Object.fromEntries(teams().map(team => [team.id, null]));
}

function blankPenalties() {
  return Object.fromEntries(teams().map(team => [team.id, 0]));
}

function blankManualScores() {
  return Object.fromEntries(teams().map(team => [team.id, 0]));
}

function blankEstimateRound(previous) {
  return {
    actual: previous?.actual ?? null,
    estimates: Object.fromEntries(teams().map(team => [team.id, previous?.estimates?.[team.id] ?? null]))
  };
}

function blankQuizAnswer(previous) {
  return Object.fromEntries(teams().map(team => [team.id, previous?.[team.id] ?? 0]));
}

function blankTasteRound(previous) {
  return Object.fromEntries(teams().map(team => [team.id, {
    exact: Boolean(previous?.[team.id]?.exact),
    ingredients: num(previous?.[team.id]?.ingredients) || 0
  }]));
}

function blankWinner(previous, defaultPoints = 0, forcedPoints = null) {
  return {
    participant: previous?.participant ?? "",
    team1: previous?.team1 ?? "",
    team2: previous?.team2 ?? "",
    points: forcedPoints ?? num(previous?.points) ?? defaultPoints
  };
}

function resizeList(items, count, builder) {
  return Array.from({ length: count }, (_, index) => builder(items[index], index));
}

function eventTypeLabel(type) {
  return ({
    rank: "Classement",
    penaltyRank: "Classement avec pénalité",
    estimate: "Estimation au plus proche",
    quiz: "Quiz / bonnes réponses",
    winners: "Podium / gagnants",
    taste: "Goût exact + ingrédients",
    manual: "Points libres"
  })[type] || type;
}

function scoringTypeOptions(selected) {
  return ["rank", "penaltyRank", "estimate", "quiz", "winners", "taste", "manual"].map(type =>
    `<option value="${type}" ${selected === type ? "selected" : ""}>${eventTypeLabel(type)}</option>`
  ).join("");
}

function serializePoints(values) {
  return values.map(value => Number(value) || 0).join(", ");
}

function describeScoringRule(event, fallback = "") {
  if (!event) return fallback;
  if (event.type === "rank") {
    return `Classement final : ${event.scale.map((points, index) => `${index + 1}${index === 0 ? "er" : "e"} = ${Number(points) || 0} points`).join(", ")}.`;
  }
  if (event.type === "penaltyRank") {
    return `Classement final : ${event.scale.map((points, index) => `${index + 1}${index === 0 ? "er" : "e"} = ${Number(points) || 0} points`).join(", ")}, puis la pénalité saisie est soustraite.`;
  }
  if (event.type === "estimate") {
    return `La valeur la plus proche gagne ${Number(event.closestPoints ?? 5)} points. Une estimation exacte ajoute ${Number(event.exactBonus ?? 20)} points.`;
  }
  if (event.type === "quiz") {
    return `Chaque bonne réponse rapporte ${Number(event.pointsPerAnswer ?? 2)} points.`;
  }
  if (event.type === "winners") {
    return `${event.winners.map((winner, index) => `${index + 1}${index === 0 ? "er" : "e"} = ${Number(winner.points) || 0} points`).join(", ")}. Un duo attribue tous les points aux deux équipes.`;
  }
  if (event.type === "taste") {
    return `Goût exact = ${Number(event.exactPoints ?? 5)} points, plus ${Number(event.ingredientPoints ?? 1)} point${Number(event.ingredientPoints ?? 1) > 1 ? "s" : ""} par ingrédient trouvé.`;
  }
  if (event.type === "manual") {
    return "Les points sont saisis manuellement pour chaque équipe.";
  }
  return fallback;
}

function scoresFor(eventId) {
  const event = state.events[eventId];
  const scores = emptyScores();
  if (!event) return scores;

  if (event.type === "rank") {
    teams().forEach(team => {
      const rank = num(event.ranks[team.id]);
      scores[team.id] = rank >= 1 && rank <= event.scale.length ? event.scale[rank - 1] : 0;
    });
  }

  if (event.type === "penaltyRank") {
    teams().forEach(team => {
      const rank = num(event.ranks[team.id]);
      const base = rank >= 1 && rank <= event.scale.length ? event.scale[rank - 1] : 0;
      scores[team.id] = base - (num(event.penalties[team.id]) || 0);
    });
  }

  if (event.type === "estimate") {
    event.rounds.forEach(round => {
      const actual = num(round.actual);
      if (actual === null) return;
      const valid = teams()
        .map(team => ({ id: team.id, value: num(round.estimates[team.id]) }))
        .filter(entry => entry.value !== null)
        .map(entry => ({ ...entry, gap: Math.abs(entry.value - actual) }));
      if (!valid.length) return;
      const minGap = Math.min(...valid.map(entry => entry.gap));
      valid.forEach(entry => {
        if (Math.abs(entry.gap - minGap) < 1e-9) scores[entry.id] += Number(event.closestPoints ?? 5);
        if (entry.gap < 1e-9) scores[entry.id] += Number(event.exactBonus ?? 20);
      });
    });
  }

  if (event.type === "quiz") {
    teams().forEach(team => {
      scores[team.id] = event.answers.reduce((sum, answer) => sum + (Number(answer[team.id]) === 1 ? Number(event.pointsPerAnswer ?? 2) : 0), 0);
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
    event.rounds.forEach(round => teams().forEach(team => {
      const answer = round[team.id];
      scores[team.id] += (answer.exact ? Number(event.exactPoints ?? 5) : 0)
        + Math.max(0, num(answer.ingredients) || 0) * Number(event.ingredientPoints ?? 1);
    }));
  }

  if (event.type === "manual") {
    teams().forEach(team => scores[team.id] = num(event.scores[team.id]) || 0);
  }

  return scores;
}

function totals() {
  const result = emptyScores();
  activeOrder().forEach(eventId => {
    const scores = scoresFor(eventId);
    teams().forEach(team => result[team.id] += scores[team.id]);
  });
  return result;
}

function ranking() {
  const all = totals();
  return teams().map(team => ({ ...team, score: all[team.id] }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
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
  return `--team:${teams().find(team => team.id === teamId)?.color || "#64748b"}`;
}

function scoreStrip(eventId) {
  const scores = scoresFor(eventId);
  return `<div class="score-strip">${teams().map(team => `
    <div class="mini-score" style="${teamStyle(team.id)}">
      <span>${escapeHtml(team.name)}</span><strong>${scores[team.id]}</strong>
    </div>`).join("")}</div>`;
}

function renderDashboard() {
  const ranked = ranking();
  const winner = ranked[0];
  return `
    <section class="hero-card">
      <p class="hero-label">En tête du classement</p>
      <h2 class="hero-winner">${escapeHtml(winner.name)}</h2>
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
              <span class="team-dot"></span><span class="team-name">${escapeHtml(team.name)}</span>
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
      <div class="legend">${teams().map(team => `
        <span class="legend-item" style="${teamStyle(team.id)}"><span class="team-dot"></span>${escapeHtml(team.name)}</span>`).join("")}
      </div>
    </section>`;
}

function progressChart() {
  const width = 760, height = 250, left = 38, top = 18, right = 16, bottom = 40;
  const series = Object.fromEntries(teams().map(team => [team.id, [0]]));
  const activeEvents = activeOrder();
  activeEvents.forEach(eventId => {
    const eventScores = scoresFor(eventId);
    teams().forEach(team => {
      const current = series[team.id];
      current.push(current[current.length - 1] + eventScores[team.id]);
    });
  });
  const max = Math.max(10, ...Object.values(series).flat());
  const x = index => left + index * ((width - left - right) / Math.max(1, activeEvents.length));
  const y = value => top + (max - value) * ((height - top - bottom) / max);
  const grid = [0, .25, .5, .75, 1].map(part => {
    const value = Math.round(max * part);
    return `<line x1="${left}" y1="${y(value)}" x2="${width-right}" y2="${y(value)}" stroke="#e2e8f0"/>
      <text x="${left-7}" y="${y(value)+4}" text-anchor="end" fill="#94a3b8" font-size="10">${value}</text>`;
  }).join("");
  const lines = teams().map(team => {
    const points = series[team.id].map((value, index) => `${x(index)},${y(value)}`).join(" ");
    const dots = series[team.id].map((value, index) =>
      `<circle cx="${x(index)}" cy="${y(value)}" r="3.5" fill="${team.color}" stroke="#fff" stroke-width="2"/>`
    ).join("");
    return `<polyline points="${points}" fill="none" stroke="${team.color}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}`;
  }).join("");
  const labels = activeEvents.map((id, index) =>
    `<text x="${x(index + 1)}" y="${height-16}" text-anchor="middle" fill="#64748b" font-size="10">${index + 1}</text>`
  ).join("");
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Évolution cumulée des scores">
    ${grid}${lines}${labels}
    <text x="${left}" y="${height-3}" fill="#94a3b8" font-size="10">Départ</text>
  </svg>`;
}

function renderEvents() {
  const activeCount = activeOrder().length;
  return `
    <div class="section-heading" style="margin-top:4px">
      <div><h2>Programme des épreuves</h2><p>${activeCount} active${activeCount > 1 ? "s" : ""} sur ${state.order.length}</p></div>
    </div>
    <button class="button wide create-event-button" id="create-event-btn">+ Créer une nouvelle épreuve</button>
    <section class="event-list">
      ${state.order.map((id, index) => {
        const def = eventDef(id);
        const scores = scoresFor(id);
        const best = Math.max(...Object.values(scores));
        const leaders = teams().filter(team => scores[team.id] === best).map(team => team.name).join(" · ");
        const enabled = state.enabled[id] !== false;
        return `<article class="event-card ${enabled ? "" : "event-disabled"}">
          <button class="event-open" data-open-event="${id}">
            <span class="event-number">${index + 1}</span>
            <span><strong>${escapeHtml(def.name)}</strong>
              <small>${def.custom ? '<b class="custom-badge">Perso</b> · ' : ""}${enabled ? `${escapeHtml(leaders)} · ${best} pts` : "Désactivée"}</small>
            </span>
            <span class="chevron">›</span>
          </button>
          <label class="event-switch" title="${enabled ? "Désactiver" : "Activer"}">
            <input type="checkbox" data-toggle-event="${id}" ${enabled ? "checked" : ""}>
            <span></span>
          </label>
        </article>`;
      }).join("")}
    </section>`;
}

function renderEventCreator() {
  return `
    <div class="event-header">
      <button class="back-button" data-cancel-create aria-label="Retour">←</button>
      <div><h2>Nouvelle épreuve</h2><p>Choisissez un modèle, puis adaptez simplement son barème.</p></div>
    </div>
    <form id="event-creator-form" class="creator-stack">
      <section class="card">
        <div class="field-grid">
          <label>Nom de l’épreuve
            <input name="name" maxlength="50" required placeholder="Ex. Course en sac">
          </label>
          <label>Modèle de calcul
            <select name="type" id="creator-type">
              <option value="rank">Classement</option>
              <option value="estimate">Estimation au plus proche</option>
              <option value="quiz">Quiz / bonnes réponses</option>
              <option value="manual">Points libres</option>
            </select>
          </label>
        </div>
        <label style="margin-top:12px">Comment jouer ?
          <textarea name="description" rows="4" required placeholder="Décrivez le déroulement concret : objectif, matériel, actions des équipes et fin de la partie."></textarea>
        </label>
        <label style="margin-top:12px">Comptabilisation des points
          <textarea name="rule" rows="3" required placeholder="Expliquez uniquement comment les points sont attribués."></textarea>
        </label>
      </section>
      <section class="card creator-options" id="creator-options">${creatorOptions("rank")}</section>
      <section class="card creator-summary">
        <strong>Comment ça marche ?</strong>
        <p id="creator-help">Vous saisirez le classement de chaque équipe. Le barème attribuera automatiquement les points.</p>
      </section>
      <button class="button wide" type="submit">Créer et ouvrir l’épreuve</button>
      <button class="button secondary wide" type="button" data-cancel-create>Annuler</button>
    </form>`;
}

function creatorOptions(type) {
  if (type === "rank") return `
    <h3>Barème du classement</h3>
    <p class="muted">Entrez les points du 1er au dernier, séparés par des virgules.</p>
    <label>Points par position<input name="scale" value="15, 10, 5, 0" required></label>`;
  if (type === "estimate") return `
    <h3>Réglage des estimations</h3>
    <div class="field-grid">
      <label>Nombre de manches<input type="number" name="rounds" min="1" max="30" value="3" required></label>
      <label>Unité<input name="unit" maxlength="8" value="m" placeholder="m, g, €, s…"></label>
      <label>Points au plus proche<input type="number" name="closestPoints" value="5" required></label>
      <label>Bonus valeur exacte<input type="number" name="exactBonus" value="20" required></label>
    </div>`;
  if (type === "quiz") return `
    <h3>Réglage du quiz</h3>
    <div class="field-grid">
      <label>Nombre de questions<input type="number" name="questions" min="1" max="50" value="10" required></label>
      <label>Points par bonne réponse<input type="number" name="pointsPerAnswer" value="2" required></label>
    </div>`;
  return `
    <h3>Points libres</h3>
    <p class="muted">Un champ de score sera affiché pour chaque équipe. Idéal pour une règle spéciale ou un jeu ponctuel.</p>`;
}

function eventConfigOptions(type, event) {
  if (type === "rank" || type === "penaltyRank") return `
    <div class="field-grid">
      <label>Points par position<input name="scale" value="${escapeHtml(serializePoints(event?.scale || [15, 10, 5, 0]))}" required></label>
    </div>`;
  if (type === "estimate") return `
    <div class="field-grid">
      <label>Nombre de manches<input type="number" name="rounds" min="1" max="30" value="${event?.type === "estimate" ? event.rounds.length : 3}" required></label>
      <label>Unité<input name="unit" maxlength="8" value="${escapeHtml(event?.type === "estimate" ? event.unit || "" : "")}" placeholder="m, g, €, s..."></label>
      <label>Points au plus proche<input type="number" name="closestPoints" value="${event?.type === "estimate" ? Number(event.closestPoints ?? 5) : 5}" required></label>
      <label>Bonus valeur exacte<input type="number" name="exactBonus" value="${event?.type === "estimate" ? Number(event.exactBonus ?? 20) : 20}" required></label>
    </div>`;
  if (type === "quiz") return `
    <div class="field-grid">
      <label>Nombre de questions<input type="number" name="questions" min="1" max="50" value="${event?.type === "quiz" ? event.answers.length : 10}" required></label>
      <label>Points par bonne réponse<input type="number" name="pointsPerAnswer" value="${event?.type === "quiz" ? Number(event.pointsPerAnswer ?? 2) : 2}" required></label>
    </div>`;
  if (type === "winners") return `
    <div class="field-grid">
      <label>Nombre de prix<input type="number" name="winnersCount" min="1" max="20" value="${event?.type === "winners" ? event.winners.length : 3}" required></label>
      <label>Points par prix<input name="winnerPoints" value="${escapeHtml(event?.type === "winners" ? serializePoints(event.winners.map(winner => winner.points)) : "30, 20, 10")}" required></label>
    </div>`;
  if (type === "taste") return `
    <div class="field-grid">
      <label>Nombre de manches<input type="number" name="rounds" min="1" max="30" value="${event?.type === "taste" ? event.rounds.length : 6}" required></label>
      <label>Points goût exact<input type="number" name="exactPoints" value="${event?.type === "taste" ? Number(event.exactPoints ?? 5) : 5}" required></label>
      <label>Points par ingrédient<input type="number" name="ingredientPoints" value="${event?.type === "taste" ? Number(event.ingredientPoints ?? 1) : 1}" required></label>
    </div>`;
  return `<p class="muted">Un champ de score libre sera affiché pour chaque équipe.</p>`;
}

function eventConfigHelp(type) {
  return {
    rank: "Chaque équipe reçoit les points correspondant à sa position finale.",
    penaltyRank: "Le classement donne les points de base, puis la pénalité saisie est retirée.",
    estimate: "L'application compare chaque estimation à la valeur réelle et récompense les plus proches.",
    quiz: "Chaque bonne réponse ajoute automatiquement le nombre de points choisi.",
    winners: "Chaque prix attribue ses points à l'équipe gagnante, ou aux deux équipes en cas de duo.",
    taste: "Chaque manche combine un bonus pour le goût exact et des points par ingrédient trouvé.",
    manual: "Vous saisissez directement le score final de chaque équipe."
  }[type];
}

function renderEventConfig(id, def, event) {
  if (def.custom) return "";
  return `
    <section class="card">
      <h3>Paramètres de comptage</h3>
      <p class="muted">Vous pouvez changer le type de comptage des jeux standards et ajuster le nombre de manches quand le modèle en a besoin.</p>
      <form class="creator-stack" data-event-config="${id}">
        <div class="field-grid">
          <label>Type de comptage
            <select name="type" data-config-type="${id}">
              ${scoringTypeOptions(event.type)}
            </select>
          </label>
        </div>
        <div class="field-grid" id="event-config-options">${eventConfigOptions(event.type, event)}</div>
        <p class="muted" id="event-config-help">${eventConfigHelp(event.type)}</p>
        <button class="button wide" type="submit">Enregistrer les paramètres</button>
      </form>
    </section>`;
}

function renderEventEditor(id) {
  const def = eventDef(id);
  const event = state.events[id];
  const enabled = state.enabled[id] !== false;
  return `
    <div class="event-header">
      <button class="back-button" data-back-events aria-label="Retour">←</button>
      <div><h2>${escapeHtml(def.name)}</h2><p>${def.custom ? "Épreuve personnalisée" : "Épreuve des olympiades"}</p></div>
    </div>
    <section class="game-explanation">
      <span class="explanation-icon">?</span>
      <div><h3>Comment jouer ?</h3><p>${escapeHtml(def.description)}</p></div>
    </section>
    <section class="scoring-explanation">
      <span class="explanation-icon">+</span>
      <div><h3>Comptabilisation des points</h3><p>${escapeHtml(def.custom ? def.rule : describeScoringRule(event, def.rule))}</p></div>
    </section>
    <section class="event-state-card ${enabled ? "is-active" : ""}">
      <div><strong>${enabled ? "Épreuve active" : "Épreuve désactivée"}</strong>
      <small>${enabled ? "Ses points comptent dans le classement." : "Les saisies sont conservées, mais les points ne comptent pas."}</small></div>
      <label class="event-switch"><input type="checkbox" data-toggle-event="${id}" ${enabled ? "checked" : ""}><span></span></label>
    </section>
    ${renderEventConfig(id, def, event)}
    ${scoreStrip(id)}
    ${event.type === "rank" ? rankEditor(id, event) : ""}
    ${event.type === "penaltyRank" ? penaltyRankEditor(id, event) : ""}
    ${event.type === "estimate" ? estimateEditor(id, event) : ""}
    ${event.type === "quiz" ? quizEditor(id, event) : ""}
    ${event.type === "winners" ? winnersEditor(id, event) : ""}
    ${event.type === "taste" ? tasteEditor(id, event) : ""}
    ${event.type === "manual" ? manualEditor(id, event) : ""}
    <div class="spacer"></div>
    <button class="button secondary wide" data-back-events>Terminer la saisie</button>
    ${def.custom ? `<button class="button danger wide custom-delete" data-delete-event="${id}">Supprimer cette épreuve</button>` : ""}`;
}

function rankOptions(selected) {
  return `<option value="">—</option>${Array.from({ length: teams().length }, (_, index) => index + 1).map(rank =>
    `<option value="${rank}" ${Number(selected) === rank ? "selected" : ""}>${rank}${rank === 1 ? "er" : "e"}</option>`
  ).join("")}`;
}

function rankEditor(id, event) {
  return `<section class="card"><div class="field-grid">
    ${teams().map(team => `<label class="field-team" style="${teamStyle(team.id)}">${escapeHtml(team.name)}
      <select data-event="${id}" data-team="${team.id}" data-field="rank">${rankOptions(event.ranks[team.id])}</select>
    </label>`).join("")}
  </div></section>`;
}

function penaltyRankEditor(id, event) {
  return `<section class="card"><div class="field-grid">
    ${teams().map(team => `<div class="field-team" style="${teamStyle(team.id)}">
      <label>${escapeHtml(team.name)} · rang<select data-event="${id}" data-team="${team.id}" data-field="rank">${rankOptions(event.ranks[team.id])}</select></label>
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
        ${teams().map(team => `<label class="field-team" style="${teamStyle(team.id)}">${escapeHtml(team.name)}
          <input type="number" step="any" inputmode="decimal" value="${inputValue(round.estimates[team.id])}" data-event="${id}" data-round="${roundIndex}" data-team="${team.id}" data-field="estimate">
        </label>`).join("")}
      </div>
    </section>`).join("");
}

function quizEditor(id, event) {
  return event.answers.map((answer, index) => `
    <section class="round-card">
      <div class="round-title"><span>Question ${index + 1}</span><span class="muted">${event.pointsPerAnswer ?? 2} pts</span></div>
      <div class="field-grid four">
        ${teams().map(team => `<label class="field-team" style="${teamStyle(team.id)}">${escapeHtml(team.name)}
          <select data-event="${id}" data-round="${index}" data-team="${team.id}" data-field="answer">
            <option value="0" ${Number(answer[team.id]) === 0 ? "selected" : ""}>Mauvaise</option>
            <option value="1" ${Number(answer[team.id]) === 1 ? "selected" : ""}>Bonne</option>
          </select>
        </label>`).join("")}
      </div>
    </section>`).join("");
}

function manualEditor(id, event) {
  return `<section class="card">
    <div class="field-grid">
      ${teams().map(team => `<label class="field-team" style="${teamStyle(team.id)}">${escapeHtml(team.name)}
        <input type="number" step="any" inputmode="decimal" value="${inputValue(event.scores[team.id])}" data-event="${id}" data-team="${team.id}" data-field="manualScore">
      </label>`).join("")}
    </div>
  </section>`;
}

function teamOptions(selected, allowEmpty = true) {
  return `${allowEmpty ? '<option value="">Aucune</option>' : ""}${teams().map(team =>
    `<option value="${team.id}" ${selected === team.id ? "selected" : ""}>${escapeHtml(team.name)}</option>`
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
      <div class="round-title"><span>Saveur ${index + 1}</span><span class="muted">${Number(event.exactPoints ?? 5)} pts + ${Number(event.ingredientPoints ?? 1)} / ingrédient</span></div>
      <div class="field-grid">
        ${teams().map(team => `<div class="field-team" style="${teamStyle(team.id)}">
          <label>${escapeHtml(team.name)} · goût exact
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
        <article class="order-item ${state.enabled[id] === false ? "event-disabled" : ""}" draggable="true" data-order-id="${id}">
          <span class="drag-handle">≡</span>
          <div><strong>${index + 1}. ${escapeHtml(eventDef(id).name)}</strong><small>${state.enabled[id] === false ? "Désactivée" : "Active"}</small></div>
          <div class="order-controls">
            <button data-move="${id}" data-direction="-1" ${index === 0 ? "disabled" : ""} aria-label="Monter">↑</button>
            <button data-move="${id}" data-direction="1" ${index === state.order.length - 1 ? "disabled" : ""} aria-label="Descendre">↓</button>
          </div>
        </article>`).join("")}
    </section>`;
}

function renderTeams() {
  return `
    <section class="card team-manager-intro">
      <h3>Gestion des équipes</h3>
      <p class="muted">Modifiez les noms et les couleurs, ou adaptez le nombre d’équipes. Les scores déjà saisis restent associés à la bonne équipe.</p>
      <div class="team-count"><strong>${teams().length}</strong><span>équipe${teams().length > 1 ? "s" : ""}</span></div>
    </section>
    <section class="team-manager-list">
      ${teams().map((team, index) => `
        <article class="card team-manager-card" style="${teamStyle(team.id)}">
          <div class="team-manager-number">${index + 1}</div>
          <div class="team-manager-fields">
            <label>Nom de l’équipe
              <input type="text" maxlength="24" value="${inputValue(team.name)}" data-team-setting="${team.id}" data-team-property="name">
            </label>
            <label>Couleur
              <span class="color-control">
                <input type="color" value="${escapeHtml(team.color)}" data-team-setting="${team.id}" data-team-property="color">
                <span>${escapeHtml(team.color.toUpperCase())}</span>
              </span>
            </label>
          </div>
          <button class="remove-team" data-remove-team="${team.id}" ${teams().length <= 2 ? "disabled" : ""} aria-label="Supprimer ${escapeHtml(team.name)}">×</button>
        </article>`).join("")}
    </section>
    <button class="button wide add-team-button" id="add-team-btn" ${teams().length >= 10 ? "disabled" : ""}>+ Ajouter une équipe</button>
    <p class="team-limit">Minimum 2 · Maximum 10 équipes</p>`;
}

function renderSettings() {
  return `
    <section class="settings-stack">
      <article class="card setting-card version-card">
        <div>
          <h3>Version de l’application</h3>
          <p>Cette indication permet de vérifier que l’iPhone utilise bien les derniers fichiers publiés.</p>
          <button class="button secondary update-button" id="update-app-btn">Vérifier les mises à jour</button>
        </div>
        <strong class="version-number">v${APP_VERSION}</strong>
      </article>
      <article class="card setting-card publish-card">
        <h3>Publication des scores</h3>
        <p>Connectez le compte du maître du jeu, puis publiez le classement sur la page publique.</p>
        <div id="firebase-setup-warning" class="sync-warning" hidden>
          Firebase n’est pas encore configuré. Consultez le fichier GUIDE_FIREBASE.md.
        </div>
        <div id="master-login-panel">
          <label>Adresse e-mail du maître du jeu
            <input type="email" id="master-email" autocomplete="username" placeholder="votre@email.fr">
          </label>
          <label style="margin-top:9px">Mot de passe
            <input type="password" id="master-password" autocomplete="current-password">
          </label>
          <button class="button wide" id="master-login-btn">Se connecter</button>
        </div>
        <div id="master-publish-panel" hidden>
          <div class="sync-user-row">
            <span class="status-pill">Connecté</span>
            <strong id="master-user-email"></strong>
          </div>
          <button class="button wide" id="publish-scores-btn">Publier les scores maintenant</button>
          <button class="button secondary wide" id="master-logout-btn">Se déconnecter</button>
        </div>
        <p id="publish-status" class="publish-status">Aucune publication effectuée sur cet appareil.</p>
        <a class="public-link" href="scores.html" target="_blank" rel="noopener">Ouvrir la page publique</a>
      </article>
      <article class="card setting-card">
        <h3>Sauvegarde automatique</h3>
        <p>Chaque modification est enregistrée immédiatement sur cet appareil. L’application fonctionne hors connexion après sa première ouverture.</p>
        <span class="status-pill">Active</span>
      </article>
      <article class="card setting-card">
        <h3>Exporter ou restaurer</h3>
        <p>Conservez une copie dans Fichiers ou iCloud. Le fichier contient les équipes, les résultats, les épreuves personnalisées et leur activation.</p>
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
  const titles = { dashboard: "Classement", events: creatingEvent ? "Créer une épreuve" : currentEvent ? eventDef(currentEvent).short : "Épreuves", order: "Ordre des épreuves", teams: "Équipes", settings: "Réglages" };
  document.querySelector("#page-title").textContent = titles[currentView];

  if (currentView === "dashboard") app.innerHTML = renderDashboard();
  if (currentView === "events") app.innerHTML = creatingEvent ? renderEventCreator() : currentEvent ? renderEventEditor(currentEvent) : renderEvents();
  if (currentView === "order") app.innerHTML = renderOrder();
  if (currentView === "teams") app.innerHTML = renderTeams();
  if (currentView === "settings") app.innerHTML = renderSettings();

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.view === currentView);
  });
  bindDragAndDrop();
  document.dispatchEvent(new CustomEvent("olympiades:render"));
}

function navigate(view) {
  currentView = view;
  if (view !== "events") {
    currentEvent = null;
    creatingEvent = false;
  }
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
    creatingEvent = false;
    currentEvent = open.dataset.openEvent;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("[data-back-events]")) {
    currentEvent = null;
    creatingEvent = false;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("#create-event-btn")) {
    creatingEvent = true;
    currentEvent = null;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (event.target.closest("[data-cancel-create]")) {
    creatingEvent = false;
    render();
    return;
  }
  const deleteEventButton = event.target.closest("[data-delete-event]");
  if (deleteEventButton) {
    deleteCustomEvent(deleteEventButton.dataset.deleteEvent);
    return;
  }
  const move = event.target.closest("[data-move]");
  if (move) {
    moveEvent(move.dataset.move, Number(move.dataset.direction));
    return;
  }
  if (event.target.closest("#add-team-btn")) {
    addTeam();
    return;
  }
  const removeTeamButton = event.target.closest("[data-remove-team]");
  if (removeTeamButton) {
    removeTeam(removeTeamButton.dataset.removeTeam);
    return;
  }
  if (event.target.closest("#export-btn")) exportData();
  if (event.target.closest("#import-btn")) document.querySelector("#import-file").click();
  if (event.target.closest("#update-app-btn")) checkForUpdate();
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
  const toggle = event.target.closest("[data-toggle-event]");
  if (toggle) {
    state.enabled[toggle.dataset.toggleEvent] = toggle.checked;
    saveState(toggle.checked ? "Épreuve activée" : "Épreuve désactivée");
    render();
    return;
  }
  if (event.target.id === "creator-type") {
    const options = document.querySelector("#creator-options");
    options.innerHTML = creatorOptions(event.target.value);
    const help = {
      rank: "Vous saisirez le classement de chaque équipe. Le barème attribuera automatiquement les points.",
      estimate: "Vous saisirez une valeur réelle et les estimations. L’application identifiera automatiquement la ou les équipes les plus proches.",
      quiz: "Pour chaque question, choisissez bonne ou mauvaise réponse. Les points seront totalisés automatiquement.",
      manual: "Vous saisirez directement le score final de chaque équipe. C’est le modèle le plus souple."
    };
    document.querySelector("#creator-help").textContent = help[event.target.value];
    return;
  }
  const configType = event.target.closest("[data-config-type]");
  if (configType) {
    const eventId = configType.dataset.configType;
    const eventConfig = state.events[eventId];
    const options = document.querySelector("#event-config-options");
    const help = document.querySelector("#event-config-help");
    if (options) options.innerHTML = eventConfigOptions(configType.value, eventConfig);
    if (help) help.textContent = eventConfigHelp(configType.value);
    return;
  }
  const teamSetting = event.target.closest("[data-team-setting]");
  if (teamSetting) {
    updateTeamSetting(teamSetting);
    return;
  }
  const input = event.target.closest("[data-event]");
  if (!input) return;
  updateField(input);
  saveState();
  render();
});

document.querySelector("#app").addEventListener("submit", event => {
  if (event.target.id === "event-creator-form") {
    event.preventDefault();
    createCustomEvent(new FormData(event.target));
    return;
  }
  const configForm = event.target.closest("[data-event-config]");
  if (!configForm) return;
  event.preventDefault();
  updateStandardEventConfig(configForm.dataset.eventConfig, new FormData(configForm));
});

function updateTeamSetting(input) {
  const team = teams().find(item => item.id === input.dataset.teamSetting);
  if (!team) return;
  if (input.dataset.teamProperty === "name") {
    const name = input.value.trim();
    if (!name) {
      showToast("Le nom ne peut pas être vide");
      render();
      return;
    }
    team.name = name;
  }
  if (input.dataset.teamProperty === "color") team.color = input.value;
  saveState("Équipe mise à jour");
  render();
}

function addTeam() {
  if (teams().length >= 10) return;
  let number = teams().length + 1;
  let id = `TEAM_${number}`;
  while (teams().some(team => team.id === id)) {
    number += 1;
    id = `TEAM_${number}`;
  }
  state.teams.push({
    id,
    name: `Équipe ${state.teams.length + 1}`,
    color: TEAM_COLORS[state.teams.length % TEAM_COLORS.length]
  });
  Object.values(state.events).forEach(event => {
    if (event.ranks) event.ranks[id] = null;
    if (event.penalties) event.penalties[id] = 0;
    if (event.type === "estimate") event.rounds.forEach(round => round.estimates[id] = null);
    if (event.type === "quiz") event.answers.forEach(answer => answer[id] = 0);
    if (event.type === "taste") event.rounds.forEach(round => round[id] = { exact: false, ingredients: 0 });
    if (event.type === "manual") event.scores[id] = 0;
  });
  saveState("Équipe ajoutée");
  render();
}

function removeTeam(teamId) {
  if (teams().length <= 2) return;
  const team = teams().find(item => item.id === teamId);
  if (!team || !confirm(`Supprimer l’équipe « ${team.name} » et tous ses résultats ?`)) return;
  state.teams = teams().filter(item => item.id !== teamId);
  Object.values(state.events).forEach(event => {
    if (event.ranks) delete event.ranks[teamId];
    if (event.penalties) delete event.penalties[teamId];
    if (event.type === "estimate") event.rounds.forEach(round => delete round.estimates[teamId]);
    if (event.type === "quiz") event.answers.forEach(answer => delete answer[teamId]);
    if (event.type === "taste") event.rounds.forEach(round => delete round[teamId]);
    if (event.type === "manual") delete event.scores[teamId];
    if (event.type === "winners") event.winners.forEach(winner => {
      if (winner.team1 === teamId) winner.team1 = "";
      if (winner.team2 === teamId) winner.team2 = "";
    });
  });
  saveState("Équipe supprimée");
  render();
}

function customEventId(name) {
  const base = String(name)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 28) || "epreuve";
  let id = `custom-${base}`;
  let number = 2;
  while (state.events[id]) id = `custom-${base}-${number++}`;
  return id;
}

function parsePointList(rawValue, fallback) {
  const values = String(rawValue || "")
    .split(/[,;]+/)
    .map(value => Number(value.trim()))
    .filter(Number.isFinite);
  return values.length ? values : fallback;
}

function buildConfiguredEvent(type, formData, previousEvent) {
  if (type === "rank") {
    return {
      type: "rank",
      ranks: previousEvent?.ranks ? { ...previousEvent.ranks } : blankRanks(),
      scale: parsePointList(formData.get("scale"), previousEvent?.scale || [15, 10, 5, 0])
    };
  }

  if (type === "penaltyRank") {
    return {
      type: "penaltyRank",
      ranks: previousEvent?.ranks ? { ...previousEvent.ranks } : blankRanks(),
      penalties: previousEvent?.penalties ? { ...previousEvent.penalties } : blankPenalties(),
      scale: parsePointList(formData.get("scale"), previousEvent?.scale || [15, 10, 5, 0])
    };
  }

  if (type === "estimate") {
    const count = clampCount(formData.get("rounds"), 1, 30);
    return {
      type: "estimate",
      unit: String(formData.get("unit") || ""),
      closestPoints: Number(formData.get("closestPoints")) || 0,
      exactBonus: Number(formData.get("exactBonus")) || 0,
      rounds: resizeList(previousEvent?.type === "estimate" ? previousEvent.rounds : [], count, round => blankEstimateRound(round))
    };
  }

  if (type === "quiz") {
    const count = clampCount(formData.get("questions"), 1, 50);
    return {
      type: "quiz",
      pointsPerAnswer: Number(formData.get("pointsPerAnswer")) || 0,
      answers: resizeList(previousEvent?.type === "quiz" ? previousEvent.answers : [], count, answer => blankQuizAnswer(answer))
    };
  }

  if (type === "winners") {
    const count = clampCount(formData.get("winnersCount"), 1, 20);
    const parsedPoints = parsePointList(formData.get("winnerPoints"), previousEvent?.type === "winners"
      ? previousEvent.winners.map(winner => winner.points)
      : [30, 20, 10]);
    return {
      type: "winners",
      winners: resizeList(previousEvent?.type === "winners" ? previousEvent.winners : [], count, (winner, index) =>
        blankWinner(winner, parsedPoints[index] ?? parsedPoints[parsedPoints.length - 1] ?? 0, parsedPoints[index] ?? parsedPoints[parsedPoints.length - 1] ?? 0))
    };
  }

  if (type === "taste") {
    const count = clampCount(formData.get("rounds"), 1, 30);
    return {
      type: "taste",
      exactPoints: Number(formData.get("exactPoints")) || 0,
      ingredientPoints: Number(formData.get("ingredientPoints")) || 0,
      rounds: resizeList(previousEvent?.type === "taste" ? previousEvent.rounds : [], count, round => blankTasteRound(round))
    };
  }

  return {
    type: "manual",
    scores: previousEvent?.type === "manual" ? { ...previousEvent.scores } : blankManualScores()
  };
}

function createCustomEvent(formData) {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const rule = String(formData.get("rule") || "").trim();
  const type = String(formData.get("type") || "manual");
  if (!name || !description || !rule) {
    showToast("Le nom, le déroulement et les points sont obligatoires");
    return;
  }
  const id = customEventId(name);
  let event;

  if (type === "rank") {
    const scale = String(formData.get("scale") || "")
      .split(/[,;]+/).map(value => Number(value.trim())).filter(Number.isFinite);
    if (!scale.length) {
      showToast("Ajoutez au moins une valeur dans le barème");
      return;
    }
    event = { type: "rank", ranks: Object.fromEntries(teams().map(team => [team.id, null])), scale };
  }

  if (type === "estimate") {
    const count = Math.max(1, Math.min(30, Number(formData.get("rounds")) || 1));
    event = {
      type: "estimate",
      unit: String(formData.get("unit") || ""),
      closestPoints: Number(formData.get("closestPoints")) || 0,
      exactBonus: Number(formData.get("exactBonus")) || 0,
      rounds: Array.from({ length: count }, () => ({
        actual: null,
        estimates: Object.fromEntries(teams().map(team => [team.id, null]))
      }))
    };
  }

  if (type === "quiz") {
    const count = Math.max(1, Math.min(50, Number(formData.get("questions")) || 1));
    event = {
      type: "quiz",
      pointsPerAnswer: Number(formData.get("pointsPerAnswer")) || 0,
      answers: Array.from({ length: count }, () => Object.fromEntries(teams().map(team => [team.id, 0])))
    };
  }

  if (type === "manual") {
    event = { type: "manual", scores: Object.fromEntries(teams().map(team => [team.id, 0])) };
  }

  state.events[id] = event;
  state.eventDefs.push({ id, name, short: name.slice(0, 24), description, rule, custom: true });
  state.enabled[id] = true;
  state.order.push(id);
  creatingEvent = false;
  currentEvent = id;
  saveState("Nouvelle épreuve créée");
  render();
  window.scrollTo(0, 0);
}

function deleteCustomEvent(id) {
  const def = eventDef(id);
  if (!def?.custom || !confirm(`Supprimer définitivement l’épreuve « ${def.name} » ?`)) return;
  delete state.events[id];
  delete state.enabled[id];
  state.eventDefs = state.eventDefs.filter(item => item.id !== id);
  state.order = state.order.filter(item => item !== id);
  currentEvent = null;
  saveState("Épreuve supprimée");
  render();
}

function updateStandardEventConfig(eventId, formData) {
  const def = eventDef(eventId);
  const previousEvent = state.events[eventId];
  if (!def || def.custom || !previousEvent) return;
  const nextType = String(formData.get("type") || previousEvent.type);

  if (nextType !== previousEvent.type && !confirm("Changer le type de comptage réinitialisera les résultats incompatibles déjà saisis. Continuer ?")) {
    render();
    return;
  }

  state.events[eventId] = buildConfiguredEvent(nextType, formData, previousEvent);
  saveState("Paramètres de comptage enregistrés");
  render();
}

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
  if (field === "manualScore") event.scores[team] = value || 0;
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

function buildPublicSnapshot() {
  const ranked = ranking();
  const activeIds = activeOrder();
  let cumulative = Object.fromEntries(teams().map(team => [team.id, 0]));
  const events = activeIds.map((id, index) => {
    const scores = scoresFor(id);
    teams().forEach(team => cumulative[team.id] += scores[team.id]);
    const def = eventDef(id);
    return {
      id,
      number: index + 1,
      name: def.name,
      scores,
      cumulative: { ...cumulative }
    };
  });
  return {
    schemaVersion: 1,
    title: "Olympiades Anniversaire",
    teams: teams().map(team => ({ id: team.id, name: team.name, color: team.color })),
    ranking: ranked.map((team, index) => ({
      position: index + 1,
      id: team.id,
      name: team.name,
      color: team.color,
      score: team.score
    })),
    events,
    activeEventCount: activeIds.length,
    totalEventCount: state.order.length
  };
}

window.olympiadesMaster = {
  getPublicSnapshot: buildPublicSnapshot,
  showToast
};

async function checkForUpdate() {
  if (!("serviceWorker" in navigator)) {
    window.location.reload();
    return;
  }
  showToast("Recherche d’une mise à jour…");
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
    const url = new URL(window.location.href);
    url.searchParams.set("update", Date.now());
    window.location.replace(url.href);
  } catch {
    showToast("Impossible de vérifier maintenant");
  }
}

document.querySelector("#import-file").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!imported.events || !Array.isArray(imported.order)) throw new Error("Format invalide");
    state = migrateState({
      version: imported.version || 1,
      teams: imported.teams,
      eventDefs: imported.eventDefs,
      enabled: imported.enabled,
      events: imported.events,
      order: imported.order
    });
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
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js?v=6", { updateViaCache: "none" });
      await registration.update();
    } catch (error) {
      console.warn(error);
    }
  });
}

render();
