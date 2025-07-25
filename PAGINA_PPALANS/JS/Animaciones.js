const logo_grande = document.getElementById('grande');
const Eslogan_char = new SplitType('#subtitulo', { types: 'chars' });
const botones = document.querySelectorAll('.btn_foda');
const informacion = document.getElementById('informacion')
const elementos = document.querySelectorAll('.pestaña_conten');
const barra = document.querySelector('.navegacion');
const sentinela = document.getElementById('sentinela');
const logo_chico = document.getElementById('temp');
const subtitulo = document.querySelector('#subtitulo');
const apartados = document.querySelectorAll('.apartado');
const contenedor_pestañas = document.querySelector('.contenedor_pestañas');
const pestañas_conten = document.querySelector('.pestañas_conten');

// -------------------Amimacion de las pestañas  del footer-------------



apartados.forEach(apartado => {
  apartado.addEventListener('mouseenter', () => {
    apartado.style.transition = 'transform 0.3s ease';
    apartado.style.transform = 'scale(1.1)';
  });

  apartado.addEventListener('mouseleave', () => {
    apartado.style.transform = 'scale(1)';
  });
});


let pestaña_activa=true;
botones.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if(pestaña_activa){
        informacion.style.transition = 'background-color 0s, color 0s';
        informacion.style.backgroundColor = 'var(--Color_Cafe_Oscuro)';
        }
    });
    btn.addEventListener('mouseleave', () => {
        informacion.style.transition = 'background-color 0s, color 0s';
        informacion.style.backgroundColor = 'var(--Color_Cafe)';
    });
});
botones.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Se activo la animacion de pestañas');
    pestaña_activa = false;
    document.querySelector('.contenedor_pestañas').style.display = 'block';

    // Cambiar color del botón activo
    botones.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');

    // Mostrar pestaña correspondiente
    elementos.forEach(el => {
      el.classList.remove('activa');
      el.style.position = 'absolute';
    });

    const index = parseInt(btn.dataset.num);
    if (index >= 0 && index < elementos.length) {
      elementos[index].classList.add('activa');

    } else {
      console.warn('No existe un elemento para el botón:', btn.textContent);
      pestaña_activa = true;
    }
  });
});


// --------------------Animacion del logotipo----------------------------

const Mostrar_Eslogan = () => {
  subtitulo.style.opacity = 1;
  gsap.set('.char', { y: 115, opacity: 0 });
  gsap.to('.char', {
    y: 0,
    opacity: 1,
    stagger: 0.07,
    delay: 0.2,
    duration: 0.5,
    ease: "power2.out",
  });
};

const Ocultar_Eslogan = () => {
  gsap.to('.char', {
    y: -100,
    opacity: 0,
    duration: 0.6,
    ease: "linear",
  });
  
};
const Mostrar_logo = () => {
  subtitulo.style.opacity = 0;
  anime({
    targets: logo_grande,
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeInOutCubic',
    complete: () => {

      Mostrar_Eslogan();
    }
      
  });
};
const Ocultar_logo = () => {
  logo_grande.style.animation = 'none';
  logo_grande.offsetHeight;
  anime({
      targets:logo_grande,
      translateY: '-100%',
      opacity: '0',
      duration: 600,
      easing: 'linear',
  })
  Ocultar_Eslogan();
};

const ocultarBarra = () => {
  logo_chico.offsetHeight;
  anime({
    targets: barra,
    translateY: '-100%',
    opacity: 0,
    duration: 500,
    easing: 'easeInOutQuad',
  });
};

const mostrarBarra = () => {
  logo_chico.style.opacity = '0';
  logo_chico.offsetHeight;
  anime({
    targets: barra,
    translateY: '0%',
    opacity: 1,
    duration: 500,
    easing: 'easeInOutQuad',
      complete: () => {
          anime({
            targets: logo_chico,
            translateX: ['-100%', '0%'],
            opacity: [0, 1],
            duration: 2000,
            easing: 'easeOutExpo',
           });
      }
  });
  
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ocultarBarra();
      Mostrar_logo();

    } else {
      logo_chico.style.opacity = '0';
      mostrarBarra();
      Ocultar_logo();
    }
  });
}, { threshold: 1.0 });

observer.observe(sentinela);
Mostrar_logo();
// -----------------------------------------------

