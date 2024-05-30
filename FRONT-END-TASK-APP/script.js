document.addEventListener('DOMContentLoaded', () => {

    const apiUrlGroup = 'http://localhost:3000/api/group'; // Reemplaza con la URL de tu API
    const dataContainer = document.getElementById('data-container');
    let selectedItem = null;



    // Función para obtener datos de la API (usamos datos simulados aquí)
    class Group {

        async fetchGroup() {
            try {
                const response = await fetch(apiUrlGroup);
                const data = await response.json();
                console.log(data);
                this.renderDataGroup(data.id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        renderDataGroup(data) {
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'data-item';

                const grupo = document.createElement('h3');
                grupo.textContent = `${String(item.name).toUpperCase()}`;


                itemDiv.onclick = () => this.selectItem(item, itemDiv);
                dataContainer.appendChild(itemDiv);
                itemDiv.appendChild(grupo);
            });
        }

        selectItem(item, element) {
            if (selectedItem) {
                selectedItem.element.classList.remove('selected');
            }
            selectedItem = { element, data: item };
            return selectedItem.element.classList.add('selected');
        }
    }

    // Función para manejar el botón de selección
    document.getElementById('select-button').onclick = () => {
        if (selectedItem) {
            var parametro = selectedItem.data.id;
            localStorage.setItem('group_id', parametro);
            window.location.href = 'matriculation.html';
        } else {
            alert('Selecciona un grupo primero');
        }
    };

    // Llama a fetchGroup para cargar los datos al cargar la página
    const group = new Group();
    group.fetchGroup();
});