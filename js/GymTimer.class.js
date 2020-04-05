/**
 *
 *  TO DO !
 *  - Au démarrage : récupérer tous les exercices enregistrés en ocalStorage
 *  - Gérer le bouton "START" !
 *
 *

 */


"use strict";
/**
 * GymTimer class
 */
var GymTimer = function() {
  this.targetDiv = document.getElementById('GymTimer');
}

GymTimer.prototype = {
  /** ------------------------------------------------- **\
   *                  UTILITIES METHODS
  \** -------------------------------------------------  */

  /**
   * Create a new paragraph with inpult fields representing a new exercice
   */
  addNewExercice: function() {
    // create new input for name
    var inputExo = document.createElement('input');
    inputExo.setAttribute("type", "text");
    inputExo.setAttribute("name", "exo");
    inputExo.setAttribute("placeholder", "exercice à faire");
    // create new input for time
    var inputTime = document.createElement('input');
    inputTime.setAttribute("type", "number");
    inputTime.setAttribute("name", "temps");
    // create a span tu put unit
    var span = document.createElement('span');
    span.textContent = " sec."
    // create delete button
    var deleteBtn = document.createElement('a');
    deleteBtn.setAttribute("href", "#");
    deleteBtn.setAttribute("class", "delete");
    var fas = document.createElement('i');
    fas.setAttribute('class', 'fas fa-trash');
    deleteBtn.appendChild(fas);
    // addEventListener on the belete button
    deleteBtn.addEventListener('click', this.onDeleteBtnClicked);
    // insert the right things at the right place
    var p = document.createElement('p');
    p.appendChild(inputExo);
    p.appendChild(inputTime);
    p.appendChild(span);
    p.appendChild(deleteBtn);

    return p;
  },


  /**
   * Create the different html elements at start up
   */
  initiateHtml: function() {
    if (window.localStorage.getItem('GYM_TIMER_SERIE')) {
      console.log(JSON.parse(window.localStorage.getItem('GYM_TIMER_SERIE')));
    }


    // Creation of the form (to enter the exercices and times)
    var form = document.createElement('form');

    var h2 = document.createElement("h2");
    h2.textContent = "Série d'exercies et leur temps d'exécution :";

    var p = this.addNewExercice();

    var newExerciceButton = document.createElement('button');
    newExerciceButton.setAttribute("class", "addExercice");
    var fas =  document.createElement('i');
    fas.setAttribute("class", "fas fa-plus-circle");
    newExerciceButton.appendChild(fas);

    form.appendChild(h2);
    form.appendChild(p);
    form.appendChild(newExerciceButton);

    this.targetDiv.appendChild(form);

    // Creation of the buttons to start the exercices and save the serie of exercices
    var p2 = document.createElement("p");

    var startExerciceButton = document.createElement("button");
    startExerciceButton.textContent = "START";
    startExerciceButton.setAttribute("class", "startExercices");
    p2.appendChild(startExerciceButton);

    var saveButton = document.createElement('button');
    saveButton.textContent = "SAVE";
    saveButton.setAttribute("class", "save");
    p2.appendChild(saveButton);

    this.targetDiv.appendChild(p2);
  },



  /**
   * Read and format the form
   */
  readForm: function() {
    // form reading and formating
    var exos = document.querySelectorAll('#GymTimer input[name="exo"]');
    var temps = document.querySelectorAll('#GymTimer input[name="temps"]');
    var serie = []
    for (var i = 0; i < exos.length; i++) {
      serie[i] = {
        exo: exos[i].value,
        temps: temps[i].value
      }
    }
    return serie;
  },


  /** ------------------------------------------------- **\
   *             METHODS TRIGGERED BY EVENTS
  \** -------------------------------------------------  */


  /**
   * Called when "add exercice" button is clicked
   */
  onAddExerciceClicked: function(event) {
    event.preventDefault();
    // create new exercice line
    var p = this.addNewExercice();
    // select useful elements
    var button = this.targetDiv.querySelector('.addExercice');
    var form = this.targetDiv.querySelector('form');
    // insert the new line at the right place
    form.insertBefore(p, button);
  },


  /**
   * Called when "delete exercice" button is clicked
   */
  onDeleteBtnClicked: function(event) {
    this.parentNode.remove();
  },



  /**
   * Called when "START" button is clicked
   */
  onStartExerciceClicked: function(event) {
    event.preventDefault();
    // read and format the exercices form
    var serie = this.readForm();

    console.log(serie);
    // Faire disparaitre le form et tout
    // afficher le nom et le compte à rebours

  },



  /**
   * Called when "SAVE" button is clicked
   */
  onSaveClicked: function(event) {
    // read the form
    var serie = this.readForm();
    // Save the serie of exercice in the localStorage (as JSON)
    window.localStorage.setItem('GYM_TIMER_SERIE', JSON.stringify(serie));
  },




  /** ------------------------------------------------- **\
   *                 APPLICATION START UP
  \** -------------------------------------------------  */


  start: function() {
    // html Form building
    this.initiateHtml();

    // event listener start up
    document.querySelector("#GymTimer .addExercice").addEventListener("click", this.onAddExerciceClicked.bind(this));

    document.querySelector('#GymTimer .startExercices').addEventListener('click', this.onStartExerciceClicked.bind(this));

    document.querySelector('#GymTimer .save').addEventListener('click', this.onSaveClicked.bind(this));
  }

}