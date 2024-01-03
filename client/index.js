function handleOnLoad(){
    //When view exercises button is clicked
    document.getElementById('viewAllExercisesButton').addEventListener('click', function(){
        createTable()
    })
    
    let exerciseNumberInput;
    //When add exercise button is clicked, send info to database
    document.getElementById('addExerciseButton').addEventListener('click', async function(event) {
        event.preventDefault();
        function getIDNumber() {
            return Math.floor(Math.random() * 1000);
        }

        document.addEventListener('DOMContentLoaded', function () {
            exerciseNumberInput = document.getElementById('exerciseNumber');
            exerciseNumberInput.value = getIDNumber();
        })

        const exerciseNumber = exerciseNumberInput;
        const exerciseType = document.getElementById('exerciseType').value;
        const exerciseCompleted = document.getElementById('exerciseCompleted').value;
        const exerciseDistance = document.getElementById('exerciseDistance').value;

        //console.log(exerciseCompleted);

        const newExercise = {
            id: exerciseNumber,
            type: exerciseType,
            date: exerciseCompleted,
            distance: exerciseDistance
        }

        try {
            const response = await fetch('http://localhost:5000/api/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExercise),
            });
    
            if (!response.ok) {
                console.error('Error:', response.statusText);
                return;
            }
    
            //const data = await response.json();
            //console.log('Server response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    
        
        document.getElementById('exerciseNumber').value = ''
        document.getElementById('exerciseType').value = ''
        document.getElementById('exerciseCompleted').value = ''
        document.getElementById('exerciseDistance').value = ''

        
        //createTable()
    })

    async function createTable(){
    try {
        // Fetch data from your server
        const response = await fetch('http://localhost:5000/api/exercise'); 
        const exercises = await response.json(); 

        exercises.forEach((exercise) => {
            exercise.date = new Date(exercise.date);
        });

        // Sort exercises by date in descending order
        exercises.sort((a, b) => b.date - a.date);

            let tableBody = document.getElementById('exerciseTableBody');

            // Clear the existing table rows
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }

            let table = document.createElement('TABLE')
            table.border = '1'
            table.id = 'exerciseTable'
            tableBody = document.createElement('TBODY')
            tableBody.id = 'exerciseTableBody'
            table.appendChild(tableBody)

            //create header row
            let tr = document.createElement('TR')
            tableBody.appendChild(tr)

            let th1 = document.createElement('TH')
            th1.width = 500
            th1.appendChild(document.createTextNode('ExerciseID'))
            tr.appendChild(th1)

            let th2 = document.createElement('TH')
            th2.width = 500
            th2.appendChild(document.createTextNode('Exercise Type'))
            tr.appendChild(th2)

            let th3 = document.createElement('TH')
            th3.width = 500
            th3.appendChild(document.createTextNode('Date Completed'))
            tr.appendChild(th3)

            let th4 = document.createElement('TH')
            th4.width = 500
            th4.appendChild(document.createTextNode('Distance'))
            tr.appendChild(th4)

            let th5 = document.createElement('TH')
            th5.width = 500
            th5.appendChild(document.createTextNode('PIN/DELETE Exercise'))
            tr.appendChild(th5)


            //create data row
            exercises.forEach((exercise)=>{
                let tr = document.createElement('TR')
                if (exercise.pinned) {
                    tr.style.backgroundColor = 'lightgreen';
                }
                tableBody.appendChild(tr)

                let td1 = document.createElement('TD')
                td1.width = 500
                td1.appendChild(document.createTextNode(`${exercise.id}`))
                tr.appendChild(td1)
            
                let td2 = document.createElement('TD')
                td2.width = 500
                td2.appendChild(document.createTextNode(`${exercise.type}`))
                tr.appendChild(td2)
                
                let td3 = document.createElement('TD')
                td3.width = 500
                td3.appendChild(document.createTextNode(`${exercise.date}`))
                tr.appendChild(td3)

                let td4 = document.createElement('TD')
                td4.width = 500
                td4.appendChild(document.createTextNode(`${exercise.distance}`))
                tr.appendChild(td4)

                let td5 = document.createElement('TD')
                td5.width = 500

                let editButton = document.createElement('button')
                editButton.textContent = 'PIN'
                editButton.className = 'btn btn-outline-dark'
                editButton.addEventListener('click', () => {alert(`Pining exercise ${exercise.id}`); pinExercise(tr, exercise)})
                td5.appendChild(editButton)

                let deleteButton = document.createElement('button')
                deleteButton.textContent = 'DELETE'
                deleteButton.className = 'btn btn-outline-dark'
                deleteButton.addEventListener('click', () => {alert(`Deleting exercise ${exercise.id}`); deleteExercise(exercise.id,tr)})
                td5.appendChild(deleteButton)

                tr.appendChild(td5)
            })
            document.body.appendChild(table);
        

            function pinExercise(row, exercise){
                tableBody.removeChild(row);
                tableBody.insertBefore(row, tableBody.firstChild);
                row.style.backgroundColor = 'lightgreen';
            }

            async function deleteExercise(exerciseID,row){
                try {
                    // Send a DELETE request to the API
                    const response = await fetch(`http://localhost:5000/api/exercise/Delete/${exerciseID}`, {
                        method: "DELETE",
                    });
                    
                    console.log('API Response:', response);

                    if (response.ok) {
                         // If the API deletion was successful, remove the exercise from the table
                        row.remove();
                        alert(`Exercise ${exerciseID} deleted successfully.`);
                    } 
                    else {
                        console.error('Error deleting exercise from API');
                    } 
                }    
                    catch (error) {
                    console.error('Error deleting exercise:', error);
                }
            }
        
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }

    }   


}
