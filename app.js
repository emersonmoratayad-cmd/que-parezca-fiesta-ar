const $ = (id) => document.getElementById(id);
const intro = $("intro");
const arStage = $("arStage");
const startButton = $("startAR");
const closeARButton = $("closeAR");
const scanHint = $("scanHint");
const videoModal = $("videoModal");
const tiktokPlayer = $("tiktokPlayer");
const toast = $("toast");
const arVideo = $("arVideo");
const videoPlane = $("videoPlane");
const playPrompt = $("playPrompt");
let videoStarted = false;
let arSystem = null;
let hintTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 4200);
}

function openVideo() {
  videoModal.classList.remove("hidden");
  // TikTok's documented iframe player is used as an embedded web player,
  // not as a WebGL/A-Frame video texture.
}
function closeVideo() {
  videoModal.classList.add("hidden");
  // Reloading the iframe stops playback consistently across mobile browsers.
  const current = tiktokPlayer.src;
  tiktokPlayer.src = "about:blank";
  window.setTimeout(() => { tiktokPlayer.src = current; }, 100);
}

$("openTikTok").addEventListener("click", openVideo);
async function toggleARVideo() {
  try {
    if (!videoStarted) {
      arVideo.currentTime = 0;
      await arVideo.play();
      videoPlane.setAttribute("material", "src: #arVideo; shader: flat; side: double");
      playPrompt.setAttribute("visible", "false");
      $("playArVideo").textContent = "Ⅱ Pausar video";
      videoStarted = true;
    } else if (arVideo.paused) {
      await arVideo.play();
      playPrompt.setAttribute("visible", "false");
      $("playArVideo").textContent = "Ⅱ Pausar video";
    } else {
      arVideo.pause();
      playPrompt.setAttribute("value", "▶  TOCA PARA CONTINUAR");
      playPrompt.setAttribute("visible", "true");
      $("playArVideo").textContent = "▶ Continuar video";
    }
  } catch (error) {
    console.error(error);
    showToast("No se pudo reproducir el video. Intenta nuevamente.");
  }
}
videoPlane.addEventListener("click", toggleARVideo);
$("playArVideo").addEventListener("click", toggleARVideo);
$("closeVideo").addEventListener("click", closeVideo);
$("modalBackdrop").addEventListener("click", closeVideo);
$("closeAR").addEventListener("click", async () => {
  try { if (arSystem) await arSystem.stop(); } catch (e) {}
  arVideo.pause();
  arVideo.currentTime = 0;
  videoPlane.setAttribute("material", "src: #panelTexture; shader: flat; side: double");
  playPrompt.setAttribute("visible", "true");
  playPrompt.setAttribute("value", "▶  TOCA PARA REPRODUCIR");
  videoStarted = false;
  $("playArVideo").textContent = "▶ Reproducir video";
  arStage.classList.add("hidden");
  intro.classList.remove("hidden");
  scanHint.textContent = "Enfoca la tarjeta de Que Parezca Fiesta";
});

startButton.addEventListener("click", async () => {
  intro.classList.add("hidden");
  arStage.classList.remove("hidden");
  const scene = $("arScene");
  try {
    // Wait for A-Frame and MindAR to initialize before starting the camera.
    if (!scene.hasLoaded) {
      await new Promise((resolve) => scene.addEventListener("loaded", resolve, { once: true }));
    }
    arSystem = scene.systems["mindar-image-system"];
    if (!arSystem) throw new Error("No se encontró el motor MindAR.");
    await arSystem.start();
  } catch (error) {
    console.error(error);
    arStage.classList.add("hidden");
    intro.classList.remove("hidden");
    showToast("No se pudo iniciar la cámara. Revisa HTTPS, permisos y que exista el archivo marcador .mind.");
  }
});

const target = $("trackedTarget");
target.addEventListener("targetFound", () => {
  scanHint.textContent = "¡Marcador encontrado! Toca la pantalla flotante";
  scanHint.classList.add("found");
});
target.addEventListener("targetLost", () => {
  scanHint.textContent = "Enfoca la tarjeta de Que Parezca Fiesta";
  scanHint.classList.remove("found");
  if (!arVideo.paused) arVideo.pause();
  if (videoStarted) $("playArVideo").textContent = "▶ Continuar video";
});

// Helpful browser diagnostics.
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  startButton.addEventListener("click", () => showToast("La cámara requiere un navegador compatible y una dirección HTTPS."));
}
