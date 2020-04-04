"use strict";
/**
 * GymTimer class
 */
var GymTimer = function() {
  this.targetDiv = document.getElementById('GymTimer');
}

GymTimer.prototype = {
  /**
   * Method to create a new paragraph with inpult fields representing a new exercice
   */
  addNewExercice: function() {
    var inputExo = document.createElement('input');
    inputExo.setAttribute("type", "text");
    inputExo.setAttribute("name", "exo");
    inputExo.setAttribute("placeholder", "exercice à faire");

    var inputTime = document.createElement('input');
    inputTime.setAttribute("type", "number");
    inputTime.setAttribute("name", "temps");

    var span = document.createElement('span');
    span.textContent = " sec."

    var p = document.createElement('p');
    p.appendChild(inputExo);
    p.appendChild(inputTime);
    p.appendChild(span);

    return p;
  },



  /**
   * Method to create the different html elements at start up
   */
  initiateHtml: function() {
    // Creation of the form (to enter the exercices and times)
    var form = document.createElement('form');

    var h2 = document.createElement("h2");
    h2.textContent = "Série d'exercies et leur temps d'exécution :";

    var p = this.addNewExercice();

    var newExerciceButton = document.createElement('button');
    newExerciceButton.textContent = "Ajouter un exercice";
    newExerciceButton.setAttribute("class", "addExercice");

    form.appendChild(h2);
    form.appendChild(p);
    form.appendChild(newExerciceButton);

    this.targetDiv.appendChild(form);

    // Creation of the buttons to start the exercices and save the serie of exercices
    var p2 = document.createElement("p");

    var startExerciceButton = document.createElement("button");
    startExerciceButton.textContent = "Commencer la série d'exercices";
    startExerciceButton.setAttribute("class", "startExercices");
    p2.appendChild(startExerciceButton);

    var saveButton = document.createElement('button');
    saveButton.textContent = "Enregistrer la série";
    saveButton.setAttribute("class", "save");
    p2.appendChild(saveButton);

    this.targetDiv.appendChild(p2);
  },



  /**
   * Method called when the "add exercice" button is clicked
   */
  onAddExerciceClicked: function(event) {
    event.preventDefault();
    var p = this.addNewExercice();
    var button = this.targetDiv.querySelector('.addExercice');
    var form = this.targetDiv.querySelector('form');
    form.insertBefore(p, button);
  },





  // test lecture du formulaire
  // var exos = document.querySelectorAll('#GymTimer input[name="exo"]');
  // var temps = document.querySelectorAll('#GymTimer input[name="temps"]');
  // console.log(exos, temps);








  start: function() {
    // html Form building
    this.initiateHtml();

    // event listener start up
    document.querySelector("#GymTimer .addExercice").addEventListener("click", this.onAddExerciceClicked.bind(this));
  }
}