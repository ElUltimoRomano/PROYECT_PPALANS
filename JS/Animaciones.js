const barra = document.querySelector('.navegacion');
const titulos = document.querySelector('.logo_eslogan');
const logoGrande = document.getElementById('grande');
const logoChico = document.getElementById('temp');
//const esloganChar = new SplitType('#subtitulo', { types: 'chars' });
const subtitulo = document.querySelector('#subtitulo');
const botones = document.querySelectorAll('.btn_foda');
const informacion = document.getElementById('informacion');
const elementos = document.querySelectorAll('.pestaña_conten');
const sentinela = document.getElementById('sentinela');
const apartados = document.querySelectorAll('.apartado');
const contenedorPestañas = document.querySelector('.contenedor_pestañas');
const pestañasConten = document.querySelector('.pestañas_conten');
const logo = document.querySelector('.logo_pqueño');
const LOGO = document.querySelector('.titulos');

let pestañaActiva = true;

// Animación hover en apartados
apartados.forEach(apartado => {
  apartado.addEventListener('mouseenter', () => {
    apartado.style.transition = 'transform 0.3s ease';
    apartado.style.transform = 'scale(1.1)';
  });

  apartado.addEventListener('mouseleave', () => {
    apartado.style.transform = 'scale(1)';
  });
});

// Hover en botones cambia color de 'informacion'
botones.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    if (pestañaActiva) {
      informacion.style.transition = 'background-color 0s, color 0s';
    }
  });

  btn.addEventListener('mouseleave', () => {
    informacion.style.transition = 'background-color 0s, color 0s';
  });
});

// Click en botones muestra pestaña activa

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Se activó la animación de pestañas');
    pestañaActiva = false;
    contenedorPestañas.style.display = 'block';

    botones.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    elementos.forEach(el => {
      el.classList.remove('activa');
      el.style.position = 'absolute';
    });

    const index = parseInt(btn.dataset.num, 10);
    if (index >= 0 && index < elementos.length) {
      elementos[index].classList.add('activa');
    } else {
      console.warn('No existe un elemento para el botón:', btn.textContent);
      pestañaActiva = true;
    }
  });
});

// Set inicial barra oculta
barra.style.opacity = 0;
// Timeline de entrada (mostrar elementos)
const Animacion_Bajar= anime.timeline({
  autoplay: false,
  easing: 'easeOutExpo',
  duration: 1000,
});
Animacion_Bajar
  .add({
    targets: '.logo_titulo',
    opacity: [1, 0],
    translateY: [0, -200],
    duration: 2500,
  })
  .add({
    targets: '.logo_eslogan_texto',
    opacity: [0, 1],
    translateY: [0, 35],
    duration: 1800,
  }, 0)
    .add({
    targets: '.navegacion',
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 1500,
  },300)
  .add({
    targets: '.logo_pequeno',
    opacity: [0, 1],
    translateX: [-100, 0],
    duration: 800,
  },'1000')
   .add({
    targets: '.btn_compra',
    opacity: [1, 0],
    duration: 800,
    scale: [1, 0.9],
  },0)
  ;



// Timeline de salida (ocultar elementos)}
const Animacion_entrada = anime.timeline({
  autoplay: false,
  easing: 'easeOutExpo',
});
Animacion_entrada
  .add({
    targets: '.logo_titulo',
    opacity: [0, 1],
    translateY: [-100,0],
    duration: 2500,
  }, 0)
  .add({
    targets: '.logo_eslogan_texto',
    opacity: [0, 1],
    translateY: [30,0],
    duration: 1800,
  },1000)
  .add({
    targets: '.btn_compra',
    opacity: [0, 1],
    scale: [0.9 , 1],
    duration: 1500,
    easing: 'linear',
  },2000)
  ;
const Animacion_Subir = anime.timeline({
  autoplay: false,
  easing: 'easeOutExpo',
});
Animacion_Subir
  .add({
    targets: '.navegacion',
    translateY: [0, -100],
    duration: 2500,
  })
  .add({
    targets: '.logo_titulo',
    opacity: [0, 1],
    translateY: [-100,0],
    duration: 2500,
  }, 0)
  .add({
    targets: '.logo_eslogan_texto',
    opacity: [0, 1],
    translateY: [30,0],
    duration: 1800,
  },1000)
  .add({
    targets: '.logo_pequeno',
    opacity: [1, 0],
    translateX: [0,-100],
  }, 0)
  .add({
    targets: '.btn_compra',
    opacity: [0, 1],
    scale: [0.9 , 1],
    duration: 1000,
  },1500)
  ;

let scrollTimeout = null;
let visible = false; // barra visible o no
window.addEventListener('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
      const rect = sentinela.getBoundingClientRect();
      // Considera que si el sentinela está fuera de pantalla (arriba), barra debe mostrarse
      const shouldShowBar = rect.top < 0;
      if (shouldShowBar && !visible) {
        visible = true;
        Animacion_Subir.pause();
        Animacion_Bajar.restart();
      } else if (!shouldShowBar && visible) {
        visible = false;
        Animacion_Bajar.pause();
        Animacion_Subir.restart();
      }
  }, 100);
});
document.addEventListener('DOMContentLoaded', () => {
  pestañaActiva = false;
  contenedorPestañas.style.display = 'block';

  botones.forEach(b => b.classList.remove('activo'));
  botones[0].classList.add('activo');

  elementos.forEach(el => {
    el.classList.remove('activa');
    el.style.position = 'absolute';
  });

  elementos[0].classList.add('activa');
});
Animacion_entrada.play();

