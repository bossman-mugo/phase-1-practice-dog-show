document.addEventListener("DOMContentLoaded", function() {
    // Fetch the dog data from the server
    fetch(" http://localhost:3000/dogs")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Update the table with the dog data
        updateTable(data.dogs);
      });

    // Update the table with the given dog data
    function updateTable(dogs) {
      // Clear the table body
      let tableBody = document.getElementById("table-body");
      tableBody.innerHTML = "";

      // Loop through the array of dogs and create a table row for each dog
      dogs.forEach(function(dog) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + dog.name + "</td>" +
                       "<td>" + dog.breed + "</td>" +
                       "<td>" + dog.sex + "</td>" +
                       "<td><button class='edit-btn' data-id='" + dog.id + "'>Edit</button></td>";
        tableBody.appendChild(tr);
      });
    }

    // Add an event listener to the dog-form element
    var dogForm = document.getElementById("dog-form");
    dogForm.addEventListener("submit", function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Extract the data from the form inputs
      var name = document.getElementsByName("name")[0].value;
      var breed = document.getElementsByName("breed")[0].value;
      var sex = document.getElementsByName("sex")[0].value;

      // Create a new dog object with the data
      var newDog = {
        id: Date.now(),
        name: name,
        breed: breed,
        sex: sex
      };

      // Add the new dog object to the array of dogs
      fetch(" http://localhost:3000/dogs")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          data.dogs.push(newDog);
          updateTable(data.dogs);
        });
    });
  });
