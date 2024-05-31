document.addEventListener('DOMContentLoaded', (id) => {
    const apiUrlMatriculation = 'http://localhost:3000/api/evaluation/group?'; // Reemplaza con la URL de tu API
    const dataContainer = document.getElementById('data-container');
    const detalles = document.getElementById('detalles');
    let selectedItem = null;



    // Función para obtener datos de la API (usamos datos simulados aquí)
    async function fetchGroup(group_id, user_id, task_id) {
        try {
            const response = await fetch(apiUrlMatriculation + "group_id=" + group_id + "&user_id=" + user_id + "&task_id=" + task_id);
            const data = await response.json();
            console.log(data.evaluation);
            document.getElementById('select-button').style.display = 'none';
            displayResults(data.evaluation[0]);
            if (data.evaluation.length === 0) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'data-item';
                itemDiv.textContent = `No hay rubrica para este tipo de tarea asignada`;
                dataContainer.appendChild(itemDiv);

            }
            else {
                renderDataGroup(data.evaluation);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Función para renderizar datos en la interfaz
    function renderDataGroup(data) {
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            const rubrica = document.createElement('div');


            rubrica.textContent = `${String(item.rubric.name).toUpperCase()}`;
            itemDiv.className = 'data-item';
            itemDiv.appendChild(rubrica);

            itemDiv.onclick = () => selectItem(item, itemDiv);
            dataContainer.appendChild(itemDiv);


        });
        const note = document.createElement('span');
        sumaFinal = 0;
        porcentage = 0;
        data.forEach(item => {
            sumaFinal+= item.note;
            porcentage+= item.rubric.porcentage;
        });
        note.textContent = `CALIFICACIÓN: ${sumaFinal}/ ${porcentage}`;
        note.classList.add('data-item');
        dataContainer.appendChild(note);


    }



    // Función para seleccionar un elemento
    function selectItem(item, element) {
        if (selectedItem) {
            selectedItem.element.classList.remove('selected');
        }
        selectedItem = { element, data: item };
        displayResults(selectedItem.data);
        return selectedItem.element.classList.add('selected');
    }

    function displayResults(data) {
        const container = document.getElementById('detalles');
        container.innerHTML = ''; // Clear any previous content
        const evaluation = document.createElement('button');
        const div = document.createElement('br');
        evaluation.textContent = 'Actualizar';
        evaluation.classList.add('button-eval');



        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = `${data.task.name_task}`;

        const nota = document.createElement('h2');
        nota.textContent = `NOTA: ${data.note}/${data.rubric.porcentage}`

        const nombre = document.createElement('p');
        nombre.innerHTML = `<span>Nombre:</span> ${data.rubric.name}`;

        const porcentaje = document.createElement('p');
        porcentaje.innerHTML = `<span>Porcentaje:</span> ${data.rubric.porcentage}%`;

        const estado = document.createElement('p');
        estado.innerHTML = `<span>Estado:</span> ${data.state.name}`;

        const description = document.createElement('p');
        description.innerHTML = `<span>Descripción:</span> ${data.rubric.description}`;

        const requirements = document.createElement('p');
        requirements.innerHTML = `<span>Requerimientos:</span> ${data.rubric.requirements}`;

        card.appendChild(title);
        card.appendChild(nota);
        card.appendChild(nombre);
        card.appendChild(porcentaje);
        card.appendChild(estado);
        card.appendChild(requirements);
        card.appendChild(description);
        card.appendChild(div);
        card.appendChild(evaluation);
        container.appendChild(card);
        evaluation.onclick = () => {
            var parametro = selectedItem.data.id;
            const input = document.createElement('input');
            const save = document.createElement('button');
            save.textContent = 'Guardar';
            save.classList.add('button-eval');
            input.type = 'number';
            input.min = 0;
            input.max = data.rubric.porcentage;
            input.value = data.note;
            input.classList.add('style-input');
            input.placeholder = 'Ingrese calificación aquí';
            card.removeChild(evaluation);
            card.appendChild(input);
            card.appendChild(save);

            save.onclick = () => {
                const apiUrlMatriculation = 'http://localhost:3000/api/evaluation/note/'; // Reemplaza con la URL de tu API
                console.log(input.value);
                fetch(apiUrlMatriculation + parametro, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ note: input.value })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    const update = document.createElement('span');
                    update.textContent = 'Nota actualizada';
                    card.appendChild(update);
                    card.removeChild(input);
                    card.removeChild(save);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }

            console.log(`Task parametro: ${selectedItem.data.id}`);
        };
    }

    // Función para manejar el botón de selección
    document.getElementById('select-button').onclick = () => {
        // Crear el elemento input
        var input = document.createElement('input');
        input.type = 'text'; // Puedes cambiar el tipo de input según tus necesidades
        input.placeholder = 'Ingrese texto aquí'; // Placeholder opcional

        // Encontrar el div con la clase itemdiv
        var rubricas = document.querySelector('.rubricas');

        // Agregar el input al div
        rubricas.appendChild(input);
    };

    var group = localStorage.getItem('group_id');
    var user = localStorage.getItem('user_id');
    var task = localStorage.getItem('task_id');
    console.log(`Group ID: ${group}`);
    console.log(`User ID: ${user}`);
    console.log(`Task ID: ${task}`);
    // Llama a fetchGroup para cargar los datos al cargar la página
    fetchGroup(group, user, task);
});