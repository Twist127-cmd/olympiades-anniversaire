import { firebaseConfig, scoreboardId } from "./firebase-config.js?v=6";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  doc,
  getFirestore,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const root = document.getElementById("public-app");
const liveStatus = document.getElementById("live-status");
const lastUpdate = document.getElementById("last-update");
const configured = firebaseConfig.apiKey !== "REMPLACEZ_MOI" &&
  firebaseConfig.projectId !== "REMPLACEZ_MOI";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function teamStyle(color) {
  return `--team:${color || "#64748b"}`;
}

function formatDate(timestamp) {
  const date = timestamp?.toDate ? timestamp.toDate() : null;
  if (!date) return "Mise à jour en cours";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "medium"
  }).format(date);
}

function render(data) {
  const ranking = Array.isArray(data.ranking) ? data.ranking : [];
  const events = Array.isArray(data.events) ? data.events : [];
  if (!ranking.length) {
    root.innerHTML = `<section class="loading-card"><h2>Aucun score publié</h2><p>Le maître du jeu n’a pas encore envoyé le classement.</p></section>`;
    return;
  }
  const winner = ranking[0];
  const second = ranking[1];
  root.innerHTML = `
    <section class="winner">
      <p class="winner-label">En tête du classement</p>
      <h2>${escapeHtml(winner.name)}</h2>
      <p>${winner.score} points${second ? ` · ${winner.score - second.score} point${winner.score - second.score > 1 ? "s" : ""} d’avance` : ""}</p>
    </section>

    <div class="section-title"><h2>Classement général</h2><p>${data.activeEventCount || 0} épreuve${data.activeEventCount > 1 ? "s" : ""} prise${data.activeEventCount > 1 ? "s" : ""} en compte</p></div>
    <section class="ranking">
      ${ranking.map(team => `<article class="rank-card">
        <div class="position">${team.position}</div>
        <div class="team" style="${teamStyle(team.color)}"><span class="dot"></span>${escapeHtml(team.name)}</div>
        <div class="points">${team.score}<small> pts</small></div>
      </article>`).join("")}
    </section>

    <div class="section-title"><h2>Résultats par épreuve</h2><p>Derniers scores publiés par le maître du jeu</p></div>
    <section class="event-results">
      ${events.map(event => `<article class="event-card">
        <div class="event-head"><span class="event-number">${event.number}</span><h3>${escapeHtml(event.name)}</h3></div>
        <div class="event-scores">
          ${(data.teams || []).map(team => `<div class="event-score" style="${teamStyle(team.color)}">
            <span>${escapeHtml(team.name)}</span><strong>${event.scores?.[team.id] ?? 0}</strong>
          </div>`).join("")}
        </div>
      </article>`).join("")}
    </section>`;
}

if (!configured) {
  liveStatus.textContent = "Non configuré";
  liveStatus.className = "live-pill error";
  root.innerHTML = `<section class="loading-card setup-error"><h2>Page non configurée</h2><p>Le propriétaire doit renseigner le fichier <strong>firebase-config.js</strong>.</p></section>`;
} else {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  onSnapshot(doc(db, "scoreboards", scoreboardId), snapshot => {
    liveStatus.textContent = "En direct";
    liveStatus.className = "live-pill";
    if (!snapshot.exists()) {
      root.innerHTML = `<section class="loading-card"><h2>En attente des scores</h2><p>Le maître du jeu doit effectuer la première publication.</p></section>`;
      return;
    }
    const data = snapshot.data();
    render(data);
    lastUpdate.textContent = `Dernière publication : ${formatDate(data.updatedAt)}`;
  }, () => {
    liveStatus.textContent = "Hors ligne";
    liveStatus.className = "live-pill error";
    root.innerHTML = `<section class="loading-card setup-error"><h2>Scores indisponibles</h2><p>Vérifiez la connexion ou les règles Firebase.</p></section>`;
  });
}
