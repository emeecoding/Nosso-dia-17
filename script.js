// =========================
// BOOT
// =========================

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("boot").style.display = "none";

    notify("❤️ Bem-vinda ao LoveOS", "Seu sistema do amor foi iniciado.");
  }, 2500);
});

// =========================
// RELÓGIO
// =========================

function updateClock() {
  const now = new Date();

  document.getElementById("clock").innerHTML = now.toLocaleTimeString("pt-BR");
}

setInterval(updateClock, 1000);
updateClock();

// =========================
// MENU INICIAR
// =========================

document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && e.target !== startButton) {
    startMenu.style.display = "none";
  }
});

// =========================
// JANELAS
// =========================

let highestZ = 100;

function openWindow(id) {
  const win = document.getElementById(id);

  win.style.display = "block";

  bringToFront(win);

  startMenu.style.display = "none";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

function minimizeWindow(id) {
  document.getElementById(id).style.display = "none";
}

function maximizeWindow(id) {
  const win = document.getElementById(id);

  if (win.classList.contains("maximized")) {
    win.classList.remove("maximized");

    win.style.width = "800px";
    win.style.height = "500px";
    win.style.top = "100px";
    win.style.left = "180px";
  } else {
    win.classList.add("maximized");

    win.style.top = "40px";
    win.style.left = "90px";

    win.style.width = "calc(100vw - 120px)";

    win.style.height = "calc(100vh - 60px)";
  }
}

function bringToFront(win) {
  highestZ++;

  win.style.zIndex = highestZ;
}

document.querySelectorAll(".window").forEach((windowElement) => {
  windowElement.addEventListener("mousedown", () => {
    bringToFront(windowElement);
  });
});

// =========================
// ARRASTAR JANELAS
// =========================

document.querySelectorAll(".window").forEach((windowElement) => {
  const titlebar = windowElement.querySelector(".titlebar");

  let offsetX = 0;
  let offsetY = 0;

  let dragging = false;

  titlebar.addEventListener("mousedown", (e) => {
    dragging = true;

    bringToFront(windowElement);

    offsetX = e.clientX - windowElement.offsetLeft;

    offsetY = e.clientY - windowElement.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    windowElement.style.left = e.clientX - offsetX + "px";

    windowElement.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
});

// =========================
// MÚSICA
// =========================

function toggleMusic() {
  const music = document.getElementById("music");

  if (music.paused) {
    music.play();

    notify("🎵 Música", "Tocando nossa música.");
  } else {
    music.pause();

    notify("⏸️ Música", "Música pausada.");
  }
}

// =========================
// TERMINAL
// =========================

const terminalInput = document.getElementById("terminalInput");

const terminalOutput = document.getElementById("terminalOutput");

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const command = terminalInput.value.trim().toLowerCase();

    terminalOutput.innerHTML += `<br><span style="color:#fff;">love@heart:~$ ${command}</span>`;

    switch (command) {
      case "help":
        terminalOutput.innerHTML += `
                <br>
                comandos:
                <br>
                eu_te_amo
                <br>
                motivos
                <br>
                saudade
                <br>
                surpresa
                <br>
                pedido
                <br>
                historia
                <br>
                fotos
                `;

        break;

      case "eu_te_amo":
        terminalOutput.innerHTML += `
                <br>
                ❤️ Eu te amo mais do que qualquer código consegue explicar.
                `;

        break;

      case "motivos":
        terminalOutput.innerHTML += `
                <br>
                ❤️ Seu sorriso
                <br>
                ❤️ Seu abraço
                <br>
                ❤️ Seu olhar
                <br>
                ❤️ Seu coração
                <br>
                ❤️ Você inteira
                `;

        break;

      case "saudade":
        terminalOutput.innerHTML += `
                <br>
                Calculando...
                <br>
                Resultado = ∞
                `;

        break;

      case "surpresa":
        terminalOutput.innerHTML += `
                <br>
                🌹 Você é minha pessoa favorita nesse mundo.
                `;

        break;

      case "pedido":
        terminalOutput.innerHTML += `
                <br>
                💍 Quer continuar vivendo essa aventura comigo para sempre?
                `;

        break;

      case "historia":
        terminalOutput.innerHTML += `
                <br>
                ❤️ Nossa história começou no melhor dia da minha vida.
                `;

        break;

      case "fotos":
        terminalOutput.innerHTML += `
                <br>
                Abrindo galeria...
                `;

        openWindow("gallery");

        break;

      default:
        terminalOutput.innerHTML += `
                <br>
                ❌ Comando não encontrado.
                `;
    }

    terminalInput.value = "";

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}

// =========================
// NOTIFICAÇÕES
// =========================

function notify(title, message) {
  const notification = document.createElement("div");

  notification.className = "notification";

  notification.innerHTML = `
        <strong>${title}</strong>
        <br>
        ${message}
    `;

  notification.style.position = "fixed";

  notification.style.right = "20px";

  notification.style.top = "60px";

  notification.style.background = "rgba(20,20,20,.95)";

  notification.style.color = "white";

  notification.style.padding = "15px";

  notification.style.borderRadius = "15px";

  notification.style.backdropFilter = "blur(15px)";

  notification.style.zIndex = "99999";

  notification.style.animation = "fadein .3s";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// =========================
// NOTIFICAÇÕES AUTOMÁTICAS
// =========================

setTimeout(() => {
  notify("❤️ Mensagem do Sistema", "Você é o amor da minha vida.");
}, 10000);

setTimeout(() => {
  notify("🌹 Lembrete", "Obrigado por existir.");
}, 25000);

const galleryImages = document.querySelectorAll(".gallery img");

const modal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const prevPhoto = document.getElementById("prevPhoto");

const nextPhoto = document.getElementById("nextPhoto");

const photoCounter = document.getElementById("photoCounter");

let currentIndex = 0;

function openPhoto(index) {
  currentIndex = index;

  modal.style.display = "flex";

  updatePhoto();
}

function updatePhoto() {
  modalImage.src = galleryImages[currentIndex].src;

  photoCounter.innerHTML = `${currentIndex + 1} / ${galleryImages.length}`;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openPhoto(index);
  });
});

nextPhoto.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  updatePhoto();
});

prevPhoto.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }

  updatePhoto();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    nextPhoto.click();
  }

  if (e.key === "ArrowLeft") {
    prevPhoto.click();
  }

  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
