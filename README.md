# GymTimer
A simple timer to follow your own serie of exercices  

## Operation
You can add as much exercices as you want, and its execution time.  
You can delete an exercice, if wanted.  
Tere are no resting time between exercice, but a resting time can be added manually, in place of an exercice.  
The serie of exercice can be saved. I don't want to bother the user with an account creation, and also I want to keep it simple, so the serie will be stored as JSON in the browser's LocalStorage.  
When the series of exercice is started, several timers (timeouts and intervales) are triggered to display a countdown for each exercice. It also displays the next exercice to perform to get ready !  
A bip sounds every 10 seconds before the end of the exercice (10 sec, 20 sec, 30 sec, etc.), also every seconds at the last 3 seconds of the exercice.
