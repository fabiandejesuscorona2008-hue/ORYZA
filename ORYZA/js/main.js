/* ============================================================
   ORYZA — main.js
   Cursor animado + carrinho (toast) + ticker
   ============================================================ */

"use strict";

/* ── CARRINHO/TOAST (Removido, os links levam à página oficial) ── */

/* ── TICKER — duplica conteúdo para loop sem corte ── */
document.addEventListener("DOMContentLoaded", () => {
  const inner = document.querySelector(".headline-strip-inner");
  if (inner) {
    inner.innerHTML =
      inner.innerHTML + "&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;" + inner.innerHTML;
  }

  /* ── CURSOR ANIMADO ── */
  const cursor  = document.getElementById("custom-cursor");
  if (!cursor) return;

  // Posição real do mouse
  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;

  // Posição suavizada (começa no centro)
  let curX = mouseX;
  let curY = mouseY;

  // Fator de suavização — menor = mais lento/elástico
  const ease = 0.14;

  /* Atualiza posição do mouse */
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* Click flash */
  document.addEventListener("mousedown", () => cursor.classList.add("clicking"));
  document.addEventListener("mouseup",   () => cursor.classList.remove("clicking"));

  /* Detecta hover em botões → lupa aumenta */
  document.querySelectorAll("button, a, [role='button']").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("on-btn"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("on-btn"));
  });

  /* Loop de animação — segue o mouse com lag elástico */
  function animateCursor() {
    curX += (mouseX - curX) * ease;
    curY += (mouseY - curY) * ease;

    // Hotspot: centro do círculo da lupa (11px do topo-esquerdo)
    cursor.style.transform = `translate(${curX - 11}px, ${curY - 11}px)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});
