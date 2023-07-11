document.addEventListener('DOMContentLoaded', function() {
  // Datos de estudios
  const estudios = [];

  // Obtener elementos del DOM
  const inputRadiologo = document.getElementById('input-radiologo');
  const inputEstudio = document.getElementById('input-estudio');
  const inputFecha = document.getElementById('input-fecha');
  const inputContrasteSi = document.getElementById('input-contraste-si');
  const inputContrasteNo = document.getElementById('input-contraste-no');
  const btnGuardar = document.getElementById('btn-guardar');
  const tablaCuerpo = document.getElementById('tabla-cuerpo');
  const selectRadiologo = document.getElementById('select-radiologo');
  const selectEstudio = document.getElementById('select-estudio');
  const selectContraste = document.getElementById('select-contraste');
  const inputFechaInicio = document.getElementById('input-fecha-inicio');
  const inputFechaFin = document.getElementById('input-fecha-fin');
  const btnFiltrar = document.getElementById('btn-filtrar');
  const btnExportar = document.getElementById('btn-exportar');

  // Función para agregar un estudio al arreglo
  function agregarEstudio(estudio) {
    estudios.unshift(estudio); // Agregar al inicio del arreglo

    if (estudios.length > 10) {
      estudios.pop(); // Eliminar el último elemento si hay más de 20
    }
  }

  // Agregar evento de clic al botón "Guardar"
  btnGuardar.addEventListener('click', function() {
    const radiologo = inputRadiologo.value;
    const estudio = inputEstudio.value;
    const fecha = inputFecha.value;
    const contraste = inputContrasteSi.checked ? 'Sí' : 'No';

    // Validar campos obligatorios
    if (radiologo === '' || estudio === '' || fecha === '') {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Crear objeto con los datos del estudio
    const nuevoEstudio = {
      radiologo: radiologo,
      estudio: estudio,
      fecha: fecha,
      contraste: contraste
    };

    // Agregar el estudio al arreglo
    agregarEstudio(nuevoEstudio);

    // Limpiar campos de entrada
    inputRadiologo.value = '';
    inputEstudio.value = '';
    inputFecha.value = '';
    inputContrasteSi.checked = false;
    inputContrasteNo.checked = false;

    // Mostrar mensaje de confirmación y actualizar la tabla
    alert('El estudio se ha guardado correctamente.');
    actualizarTablaEstudios();
  });

  // Actualizar la tabla de estudios
  function actualizarTablaEstudios() {
    tablaCuerpo.innerHTML = '';

    for (const estudio of estudios) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${estudio.estudio}</td>
        <td>${estudio.radiologo}</td>
        <td>${estudio.fecha}</td>
        <td>${estudio.contraste}</td>
      `;
      tablaCuerpo.appendChild(fila);
    }
  }

  // Agregar evento de clic al botón "Filtrar"
  btnFiltrar.addEventListener('click', function() {
    const filtroRadiologo = selectRadiologo.value;
    const filtroEstudio = selectEstudio.value;
    const filtroContraste = selectContraste.value;
    const filtroFechaInicio = inputFechaInicio.value;
    const filtroFechaFin = inputFechaFin.value;

    // Filtrar estudios basados en los parámetros de filtrado
    const estudiosFiltrados = estudios.filter(function(estudio) {
      if (filtroRadiologo && estudio.radiologo !== filtroRadiologo) {
        return false;
      }
      if (filtroEstudio && estudio.estudio !== filtroEstudio) {
        return false;
      }
      if (filtroContraste && estudio.contraste !== filtroContraste) {
        return false;
      }
      if (filtroFechaInicio && estudio.fecha < filtroFechaInicio) {
        return false;
      }
      if (filtroFechaFin && estudio.fecha > filtroFechaFin) {
        return false;
      }
      return true;
    });

    // Mostrar los resultados filtrados en la tabla
    tablaCuerpo.innerHTML = '';
    for (const estudio of estudiosFiltrados) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${estudio.estudio}</td>
        <td>${estudio.radiologo}</td>
        <td>${estudio.fecha}</td>
        <td>${estudio.contraste}</td>
      `;
      tablaCuerpo.appendChild(fila);
    }
  });

  // Agregar evento de clic al botón "Exportar a Excel"
  btnExportar.addEventListener('click', function() {
    // Generar el contenido del archivo Excel
    let csv = 'Estudio,Radiólogo,Fecha,Contraste\n';
    for (const estudio of estudios) {
      csv += `${estudio.estudio},${estudio.radiologo},${estudio.fecha},${estudio.contraste}\n`;
    }

    // Crear un objeto Blob y descargar el archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'estudios.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
