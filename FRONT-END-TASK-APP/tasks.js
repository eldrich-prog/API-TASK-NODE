document.addEventListener('DOMContentLoaded', (id) => {
    const apiUrlMatriculation = 'http://localhost:3000/api/task/group/'; // Reemplaza con la URL de tu API
    const dataContainer = document.getElementById('data-container');
    let selectedItem = null;



    // Función para obtener datos de la API (usamos datos simulados aquí)
    async function fetchGroup(group_id) {
        try {
            const response = await fetch(apiUrlMatriculation + group_id);
            const data = await response.json();
            console.log(data);
            if (data.length === 0) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'data-item';
                itemDiv.textContent = `No hay tarea asignada a este alumno en este grupo`;
                dataContainer.appendChild(itemDiv);
                document.getElementById('select-button').style.display = 'none';
            }
            else{
                renderDataGroup(data);
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
            itemDiv.textContent = `${(item.name_task)} `;
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
            var parametro = selectedItem.data;
            console.log(`Task parametro: ${selectedItem.data.id}`);
            localStorage.setItem('task_id', parametro.id);
            window.location.href = 'evaluation.html';
        } else {
            alert('Selecciona Alumno primero');
        }
    };

    var group = localStorage.getItem('group_id');
    var user = localStorage.getItem('user_id');
    console.log(`Group: ${group}`);
    console.log(`User: ${user}`);
    // Llama a fetchGroup para cargar los datos al cargar la página
    fetchGroup(group);
});