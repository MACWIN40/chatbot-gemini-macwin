// --- CONFIGURATION ---
const CHATBOT_URL = "https://chatbot-gemini-macwin.onrender.com"; // 🧠 Ton URL Render
const BOT_GREETING = "👋 Bonjour ! Besoin d’aide ?"; // message d’accueil
const ACCENT_COLOR = "#007bff"; // couleur principale (bleu Render style)

// --- Fonction principale encapsulée ---
(function() {
  // --- Bouton flottant ---
  const chatButton = document.createElement("div");
  chatButton.id = "chatbot-button";
  chatButton.innerHTML = "💬";
  Object.assign(chatButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    background: ACCENT_COLOR,
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "26px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    zIndex: "9999",
    animation: "pulse 2s infinite",
  });

  // --- Animation CSS dynamique ---
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 ${ACCENT_COLOR}66; }
      70% { transform: scale(1.05); box-shadow: 0 0 0 10px transparent; }
      100% { transform: scale(1); box-shadow: 0 0 0 0 transparent; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(chatButton);

  // --- Fenêtre de chat (iframe) ---
  const chatFrame = document.createElement("iframe");
  Object.assign(chatFrame.style, {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    width: "400px",
    height: "500px",
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    display: "none",
    opacity: "0",
    transform: "translateY(30px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    zIndex: "9998",
  });
  chatFrame.src = CHATBOT_URL;
  document.body.appendChild(chatFrame);

  // --- Bulle de message d'accueil ---
  const bubble = document.createElement("div");
  bubble.id = "chatbot-greeting";
  bubble.textContent = BOT_GREETING;
  Object.assign(bubble.style, {
    position: "fixed",
    bottom: "100px",
    right: "90px",
    background: "white",
    color: "#111",
    padding: "10px 14px",
    borderRadius: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    fontSize: "14px",
    fontFamily: "sans-serif",
    maxWidth: "220px",
    animation: "fadeIn 1s ease",
    zIndex: "9997",
    display: "none",
  });

  const style2 = document.createElement("style");
  style2.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style2);
  document.body.appendChild(bubble);

  // --- Gestion ouverture / fermeture ---
  let isOpen = false;
  chatButton.onclick = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatFrame.style.display = "block";
      setTimeout(() => {
        chatFrame.style.opacity = "1";
        chatFrame.style.transform = "translateY(0)";
      }, 10);
      bubble.style.display = "none";
    } else {
      chatFrame.style.opacity = "0";
      chatFrame.style.transform = "translateY(30px)";
      setTimeout(() => (chatFrame.style.display = "none"), 300);
    }
  };

  // --- Afficher le message d’accueil après 3 secondes ---
  setTimeout(() => {
    if (!isOpen) bubble.style.display = "block";
  }, 3000);
})();
