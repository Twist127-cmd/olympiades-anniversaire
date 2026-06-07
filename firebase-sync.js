import { firebaseConfig, scoreboardId } from "./firebase-config.js?v=6";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const configured = firebaseConfig.apiKey !== "REMPLACEZ_MOI" &&
  firebaseConfig.projectId !== "REMPLACEZ_MOI";

function element(id) {
  return document.getElementById(id);
}

function status(message, isError = false) {
  const target = element("publish-status");
  if (!target) return;
  target.textContent = message;
  target.style.color = isError ? "#b91c1c" : "";
}

function formatError(error) {
  const messages = {
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/too-many-requests": "Trop de tentatives. Réessayez plus tard.",
    "auth/network-request-failed": "Connexion Internet indisponible.",
    "permission-denied": "Publication refusée par les règles Firebase."
  };
  return messages[error.code] || "Une erreur est survenue pendant la synchronisation.";
}

function bindWhenReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}

if (!configured) {
  const showSetupWarning = () => {
    const warning = element("firebase-setup-warning");
    if (warning) warning.hidden = false;
    const login = element("master-login-btn");
    if (login) login.disabled = true;
  };
  bindWhenReady(showSetupWarning);
  document.addEventListener("olympiades:render", showSetupWarning);
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  let currentUser = null;

  function refreshAuthUI(user) {
    currentUser = user;
    const loginPanel = element("master-login-panel");
    const publishPanel = element("master-publish-panel");
    if (!loginPanel || !publishPanel) return;
    loginPanel.hidden = Boolean(user);
    publishPanel.hidden = !user;
    if (user) {
      element("master-user-email").textContent = user.email || "Maître du jeu";
      status("Prêt à publier les scores.");
    }
  }

  async function publishScores() {
    if (!auth.currentUser) {
      status("Connectez-vous avant de publier.", true);
      return;
    }
    const button = element("publish-scores-btn");
    button.disabled = true;
    status("Publication en cours…");
    try {
      const payload = window.olympiadesMaster.getPublicSnapshot();
      await setDoc(doc(db, "scoreboards", scoreboardId), {
        ...payload,
        updatedAt: serverTimestamp()
      });
      const now = new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }).format(new Date());
      status(`Scores publiés à ${now}.`);
      window.olympiadesMaster.showToast("Scores publiés");
    } catch (error) {
      status(formatError(error), true);
    } finally {
      button.disabled = false;
    }
  }

  bindWhenReady(() => {
    document.addEventListener("click", async event => {
      if (event.target.closest("#master-login-btn")) {
        const email = element("master-email").value.trim();
        const password = element("master-password").value;
        if (!email || !password) {
          status("Saisissez l’e-mail et le mot de passe.", true);
          return;
        }
        status("Connexion…");
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          status(formatError(error), true);
        }
      }
      if (event.target.closest("#publish-scores-btn")) await publishScores();
      if (event.target.closest("#master-logout-btn")) await signOut(auth);
    });
    onAuthStateChanged(auth, refreshAuthUI);
  });
  document.addEventListener("olympiades:render", () => refreshAuthUI(currentUser));
}
