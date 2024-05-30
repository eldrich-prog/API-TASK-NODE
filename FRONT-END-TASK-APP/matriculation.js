document.addEventListener('DOMContentLoaded', (id) => {
    const apiUrlMatriculation = 'http://localhost:3000/api/matriculation/group/'; // Reemplaza con la URL de tu API
    const dataContainer = document.getElementById('data-container');
    let selectedItem = null;



    // Función para obtener datos de la API (usamos datos simulados aquí)
    async function fetchGroup(id) {
        try {
            const response = await fetch(apiUrlMatriculation+id);
            const data = await response.json();
            if (data.id.length === 0) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'data-item';
                itemDiv.textContent = `No hay alumnos matriculados en este grupo`;
                dataContainer.appendChild(itemDiv);
                document.getElementById('select-button').style.display = 'none';
            }
            else{
                renderDataGroup(data.id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Función para renderizar datos en la interfaz
    function renderDataGroup(data) {
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'data-item';
            itemDiv.textContent = `${(item.name)}`;
            itemDiv.onclick = () => selectItem(item, itemDiv);
            dataContainer.appendChild(itemDiv);
        });
    }

    // Función para seleccionar un elemento
    function selectItem(item, element) {
        if (selectedItem) {
            selectedItem.element.classList.remove('selected');
        }
        selectedItem = { element, data: item };
        selectedItem.element.classList.add('selected');
    }

    // Función para manejar el botón de selección
    document.getElementById('select-button').onclick = () => {
        if (selectedItem) {
            var parametro = selectedItem.data.id;
            localStorage.setItem('user_id', parametro);
            window.location.href = 'tasks.html';
        } else {
            alert('Selecciona Alumno primero');
        }
    };

    var group = localStorage.getItem('group_id');
    console.log(`Group: ${group}`);
    // Llama a fetchGroup para cargar los datos al cargar la página
    fetchGroup(group);
});