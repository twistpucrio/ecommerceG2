// bannerslogica.js
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  // checagem de segurança
  if (!track) {
    console.warn('carousel-track não encontrado');
    return;
  }
  if (!prevButton || !nextButton) {
    console.warn('botões prev/next não encontrados');
    return;
  }

  // seleciona as "slides" — no seu HTML são <img> dentro de .banner-strip
  const slides = Array.from(track.querySelectorAll('img'));
  const totalSlides = Math.max(1, slides.length);
  let index = 0;

  // garante que o track tenha transition (combina com seu CSS)
  track.style.transition = track.style.transition || 'transform 1s ease-in-out';

  // função que atualiza a posição com base no index
  function update() {
    // porcentagem do deslocamento relativo à largura do track
    const shiftPercent = (index * 100) / totalSlides;
    track.style.transform = `translateX(-${shiftPercent}%)`;
  }

  // próximos / anteriores com proteção
  function goNext() {
    index = (index + 1) % totalSlides;
    update();
  }

  function goPrev() {
    index = (index - 1 + totalSlides) % totalSlides;
    update();
  }

  nextButton.addEventListener('click', () => {
    stopAutoplay();
    goNext();
    startAutoplay();
  });

  prevButton.addEventListener('click', () => {
    stopAutoplay();
    goPrev();
    startAutoplay();
  });

  // autoplay (reinicia se o usuário interagir)
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  function startAutoplay() {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(goNext, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (!autoplayInterval) return;
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  // pausa ao passar o mouse (opcional)
  const parent = track.closest('.banners') || track;
  parent.addEventListener('mouseenter', stopAutoplay);
  parent.addEventListener('mouseleave', startAutoplay);

  // teclado (setas) - opcional e útil
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      stopAutoplay();
      goNext();
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      stopAutoplay();
      goPrev();
      startAutoplay();
    }
  });

  // inicializa
  update();
  startAutoplay();
});
