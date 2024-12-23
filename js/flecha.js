// Función para desplazarse a la sección de categorías al hacer clic en el texto o la flecha
document.querySelector('.flecha').addEventListener('click', function () {
  // Desplazamiento con un margen adicional hacia arriba
  window.scrollTo({
    top: document.querySelector('#categorias').offsetTop - 60,  // Ajusta el valor para desplazar un poco más
    behavior: 'smooth'
  });
});

document.querySelector('.productos-section span').addEventListener('click', function () {
  // Desplazamiento con un margen adicional hacia arriba
  window.scrollTo({
    top: document.querySelector('#categorias').offsetTop - 60,  // Ajusta el valor para desplazar un poco más
    behavior: 'smooth'
  });
});
