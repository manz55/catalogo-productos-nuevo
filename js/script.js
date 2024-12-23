// Lista global para almacenar productos
let listaDeProductos = JSON.parse(localStorage.getItem('listaDeProductos')) || []; // Recuperar productos guardados del almacenamiento local

// Función para agregar productos a la lista
function agregarALista(nombre, precio, imagen) {
  // Crear un objeto de producto
  const producto = {
    nombre: nombre,
    precio: precio,
    imagen: imagen
  };
  
  // Agregar el producto a la lista global
  listaDeProductos.push(producto);

  // Guardar la lista actualizada en localStorage
  localStorage.setItem('listaDeProductos', JSON.stringify(listaDeProductos));

  // Actualizar la visualización de la lista
  mostrarLista();
}

// Función para mostrar la lista de productos agregados
function mostrarLista() {
  const listaContainer = document.getElementById('lista-container');
  listaContainer.innerHTML = ''; // Limpiar la lista antes de actualizar

  // Iterar sobre la lista de productos y mostrarlos
  listaDeProductos.forEach((producto, index) => {
    const itemLista = document.createElement('div');
    itemLista.classList.add('producto-en-lista');
    itemLista.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-details">
        <div class="producto-name">${producto.nombre}</div>
        <div class="producto-price">${producto.precio}</div>
      </div>
      <button class="eliminar-producto" onclick="eliminarDeLista(${index})">Eliminar</button>
    `;
    listaContainer.appendChild(itemLista);
  });

  // Mostrar el total
  const total = listaDeProductos.reduce((acc, producto) => acc + parseFloat(producto.precio.substring(1)), 0);
  document.getElementById('total').innerHTML = `Q${total.toFixed(2)}`;
}

// Función para eliminar un producto de la lista
function eliminarDeLista(index) {
  listaDeProductos.splice(index, 1); // Eliminar el producto en la posición 'index'
  
  // Guardar la lista actualizada en localStorage
  localStorage.setItem('listaDeProductos', JSON.stringify(listaDeProductos));
  
  mostrarLista(); // Actualizar la lista
}

// Función para finalizar el pedido y enviar el mensaje a WhatsApp
function finalizarPedido() {
  // Generar el mensaje de WhatsApp con los productos y el total
  let mensaje = "Quiero estos productos:\n\n";
  listaDeProductos.forEach(producto => {
    mensaje += `- ${producto.nombre}: ${producto.precio}\n`;
  });

  // Calcular el total
  const total = listaDeProductos.reduce((acc, producto) => acc + parseFloat(producto.precio.substring(1)), 0);
  mensaje += `\nTotal: Q${total.toFixed(2)}`;

  // Verificar si el usuario está en un dispositivo móvil o en una PC
  const esMovil = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

  // Si es móvil, abre la aplicación de WhatsApp. Si es PC, abre WhatsApp Web.
  const numeroWhatsapp = '58253580';
  const mensajeCodificado = encodeURIComponent(mensaje);

  if (esMovil) {
    // Enlace para abrir WhatsApp en móviles
    window.location.href = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
  } else {
    // Enlace para abrir WhatsApp Web en PC
    window.open(`https://web.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensajeCodificado}`, '_blank');
  }
}

// Llamar a la función para mostrar la lista al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  mostrarLista();
});

// Función para manejar el cambio de categorías
function cambiarCategoria(categoria) {
  // Lógica para cambiar la categoría y recargar los productos
  // Aquí puedes incluir un cambio de vista o redirigir a una nueva página
  // Asegúrate de que la lista se mantenga al cambiar de categoría
  mostrarLista();
}
