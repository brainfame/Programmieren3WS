// //Lekion am 19.02.2022


// class Grass extends LivingCreature
// {
//     multiply()
//     {
//         this.roundCounter++;
//         //console.log(this.roundCounter);
//         this.multiplyer++;
//         // jetzt darf sich vermehrt werden
//         if(this.multiplyer > 6)
//         {
//             // gibt es leere nachbarfelder - chooseField(0)
//             let emptyFields = this.choseField(0);
//            //console.log(emptyFields);
//             if(emptyFields.length > 0)
//             {
//                 // dann zufÃ¤llig ein Position eines NB-Field aus der Liste
//                 let theChoosenField = random(emptyFields);
//                 //[x, y]
//                 let newX = theChoosenField[0];
//                 let newY = theChoosenField[1];
//                 // dann gras-Objekt erstellen
//                 let grassObj = new Grass(newX, newY);
//                 // Gras-Objekt der Liste mit vorhandne grasObjekten hinzufÃ¼gen
//                 grassArray.push(grassObj);
//                 // Spielfeld aktualisieren
//                 matrix[newY][newX] = 1;
//             }
//             // reset rundenzähler
//             this.multiplyer = 0;
//         }
//     }
//     mutate() //Funktion zum Mutieren
//     {
//         if(this.roundCounter >= 10) //Alle 10 Runden soll sich das normale Gras mutieren dÃ¼rfen
//         {
//             let emptyFields = this.choseField(0);
//             if(emptyFields.length > 0)
//             {
//                 let theChoosenField = random(emptyFields);
//                 let newX = theChoosenField[0];
//                 let newY = theChoosenField[1];
//                 // neuen OffDeff Wert generieren
//                 let mutateNum = Math.floor(random(3)); // VerÃ¤nderung des OffDeff Werts
//                 let newOffDeff = this.offDeff + mutateNum;
//                 // dann evolved-Gras-Objekt erstellen
//                 let evolvedGrassObj = new EvolvedGrass(newX, newY, newOffDeff); //Evolved Klassen haben 3. Parameter -->offDeff WErt
//                 // EvolvedGras-Objekt der Liste mit vorhandne evolvedgrasObjekten hinzufÃ¼gen
//                 evolvedGrassArr.push(evolvedGrassObj);
//                 matrix[newY][newX] = newOffDeff; //GrÃ¤ser sind nicht alle 1 in der Matrix, sondern nehmen ihren offDeff wert an
//             }
//             this.roundCounter = 0;
//         }
//     }
// }




// class Grazer extends LivingMovingCreature
// {
//     constructor(x, y)
//     {
//         super(x, y);
//         this.lives = 5;
//         this.offDeff = 5; //Standart OffDeff WErt fÃ¼r Grazer
//     }

//     eat()
//     {
//         this.roundCounter++;
//         let grassFields = this.chooseBetterField(this.offDeff, "grazer");
//         //console.log(grassFields);     
//         if(grassFields.length > 0)
//         {
//             let theChoosenField = random(grassFields);
//             let newX = theChoosenField[0];
//             let newY = theChoosenField[1];
//             //console.log(newX, newY);
            
//             // alte Position in der Matrix bekommt 0
//             matrix[this.y][this.x] = 0;
//             // die Neue Position
//             this.x = newX;
//             this.y = newY;
//             matrix[newY][newX] = 5;
//             // spielfeld aktualisieren mit der neuen Pos
//             this.multiply++;
            
//             // Entferne aus dem Gras-Array entfernen
//             for(let i in grassArray)
//             {
//                 let grassObj = grassArray[i];
//                 if(grassObj.x == newX && grassObj.y == newY)
//                 {
//                     // lÃ¶sche grassObj
//                     grassArray.splice(i, 1);
//                     break;
//                 }
//             }
//             for(let i in evolvedGrassArr)
//             {
//                 let evolvedObj = evolvedGrassArr[i];
//                 if(evolvedObj.x == newX && evolvedObj.y == newY)
//                 {
//                     evolvedGrassArr.splice(i, 1);
//                     break;
//                 }
//             }
//             this.lives = 5;
//             if(this.multiply >= 5)
//             {
//                 this.multiplyer();
//             }
//         }
//         else if(this.lives <= 0) // wenn keine Energie vorhanden - stirb
//         {
//             this.die();
//         }
//         else 
//         {
//             this.lives--;
//             this.move(5);
//         }
//     }
    
    

//     multiplyer()
//     {
//         let freeCell = this.chooseField(0);
//         //console.log(freeCell);
//         if(freeCell.length > 0)
//         {
//             let chosenCell = random(freeCell);
//             let newX = chosenCell[0];
//             let newY = chosenCell[1];
//             let grazerObj = new Grazer(newX, newY);
//             grazerArr.push(grazerObj);
//             matrix[newY][newX] = 5;
//         }
//         this.multiply = 0;
//     }

//     mutate()
//     {
//         if(this.roundCounter >= 10) //Alle 15 Runden soll sich das normale Gras mutieren dÃ¼rfen
//         {
//             let emptyFields = this.chooseField(0);
//             if(emptyFields.length > 0){
//                 let theChoosenField = random(emptyFields);
//                 let newX = theChoosenField[0];
//                 let newY = theChoosenField[1];
//                 let mutateNum = Math.floor(random(-1, 3)); // VerÃ¤nderung des OffDeff Werts
//                 let newOffDeff = this.offDeff + mutateNum;
//                 let evolvedGrazerObj = new EvolvedGrazer(newX, newY, newOffDeff);
//                 evolvedGrazerArr.push(evolvedGrazerObj);
//                 matrix[newY][newX] = newOffDeff;
//             }
//             this.roundCounter = 0;
//         }
//     }
// }




// class FleshGrazer 
// {
//     constructor(x, y)
//     {
//         this.x = x;
//         this.y = y;
//         this.lives = 8; //lebensanzeige
//         this.multiply = 0; //s.o.
//         this.offDeff = 10; //Standart OffDeff Wert fÃ¼r Grazer
//         this.directions = [
//             [this.x-1, this.y-1],
//             [this.x, this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x, this.y+1],
//             [this.x+1, this.y+1]
//         ];
//     }
    
//     newDirections()
//     {
//         this.directions = [
//             [this.x-1, this.y-1],
//             [this.x, this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x, this.y+1],
//             [this.x+1, this.y+1]
//         ];
//     }


    
    
//     move()
//     {
//         let emptyFields = this.chooseField(0);
//         if(emptyFields.length > 0)
//         {
//             this.lives--; //verliert erst energie, wenn er sich bewegt, sonsts schnelles Sterben
//             //wegen Einkesselung von GrÃ¤sern
//             let theChoosenField = random(emptyFields);
//             let newX = theChoosenField[0];
//             let newY = theChoosenField[1];
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;
//             matrix[newY][newX] = this.offDeff;
//         }
        
        
//     }

//     // chooseBetterField(maxOffDeff) // neue Funktion gibt alle GrÃ¤ser
//     // //unter dem eigenen OffDeff Wert an
//     // {
//     //     this.newDirections();
//     //     let found = [];
//     //     for(let i in this.directions)
//     //     {
//     //         let x = this.directions[i][0];
//     //         let y = this.directions[i][1];
//     //         if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
//     //         {
//     //             for(let h in grazerArr) //normale Grazer-positionen werden mit jetziger Position verglichen
//     //             {
//     //                 let grazerObj = grazerArr[h];
//     //                 if(grazerObj.x == x && grazerObj.y == y)
//     //                 {
//     //                     found.push(this.directions[i]); //alle passenden normalen Grazer kommen in das Array
//     //                 }
//     //             }
//     //             for(let j in evolvedGrazerArr) //s.o.
//     //             {
//     //                 let evolvedGrazerObj = evolvedGrazerArr[j];
//     //                 if(evolvedGrazerObj.x == x && evolvedGrazerObj.y == y && evolvedGrazerObj.offDeff < maxOffDeff) //es dÃ¼rfen nur Grazer mit niederigerem
//     //                 //offDeff Wert gefressen werden
//     //                 {
//     //                     found.push(this.directions[i]); //s.o.
//     //                 }
//     //             }
//     //         }
//     //     }
//     //     return found;
//     // }
    
//     eat()
//     {
//         let grazerFields = this.chooseBetterField(this.offDeff, "fleshGrazer");
//         if(grazerFields.length > 0)
//         {
//             let theChoosenField = random(grazerFields);
//             let newX = theChoosenField[0];
//             let newY = theChoosenField[1];
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;
//             matrix[newY][newX] = this.offDeff;
//             this.multiply++;
            
//             for(let i in grazerArr) //entfernen von potenziell gefressenem Grazer
//             {
//                 let grazerObj = grazerArr[i];
//                 if(grazerObj.x == newX && grazerObj.y == newY)
//                 {
//                     grazerArr.splice(i, 1);
//                     break;
//                 }
//             }
//             for(let i in evolvedGrazerArr) //entfernen von potenziell gefressenem Evolved-Grazer
//             {
//                 let evolvedGrazerObj = evolvedGrazerArr[i];
//                 if(evolvedGrazerObj.x == newX && evolvedGrazerObj.y == newY)
//                 {
//                     evolvedGrazerArr.splice(i, 1);
//                     break;
//                 }
//             }
//             this.lives = 8;
//             if(this,this.multiply >= 3)
//             {
//                 this.multiplyer();
//             }
//         }else if(this.lives <= 0) // wenn keine Energie vorhanden - stirb
//         {
//             this.die();
//         }
//         else 
//         {
//             this.move();
//         }
//     }
    
//     // die()
//     // {
//     //     matrix[this.y][this.x] = 0;
//     //     for(let i in fleshGrazerArr)
//     //     {
//     //         let fleshGrazer = fleshGrazerArr[i];
//     //         if(fleshGrazer.x == this.x && fleshGrazer.y == this.y)
//     //         {
//     //             fleshGrazerArr.splice(i, 1);
//     //             break;
//     //         }
//     //     }
//     // }

//     multiplyer()
//     {
//         let freeCell = this.chooseField(0);
//         if(freeCell.length > 0)
//         {
//             let chosenCell = random(freeCell);
//             let newX = chosenCell[0];
//             let newY = chosenCell[1];
//             let fleshObj = new FleshGrazer(newX, newY);
//             fleshGrazerArr.push(fleshObj);
//             matrix[newY][newX] = 10;
//         }
//         this.multiply = 0;
//     }
// }