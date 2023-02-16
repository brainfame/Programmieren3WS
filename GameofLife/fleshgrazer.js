class FleshGrazer extends LivingMovingCreature
{
    constructor(x, y)
    {
        super(x, y);
        this.lives = 15; //lebensanzeige
        this.offDeff = 10; //Standart OffDeff Wert fÃ¼r Grazer

    }

    // newDirections()
    // {
    //     this.directions = [
    //         [this.x-1, this.y-1],
    //         [this.x, this.y-1],
    //         [this.x+1, this.y-1],
    //         [this.x-1, this.y],
    //         [this.x+1, this.y],
    //         [this.x-1, this.y+1],
    //         [this.x, this.y+1],
    //         [this.x+1, this.y+1]
    //     ];
    // }




    // move()
    // {
    //     let emptyFields = this.chooseField(0);
    //     if(emptyFields.length > 0)
    //     {
    //         this.lives--; //verliert erst energie, wenn er sich bewegt, sonsts schnelles Sterben
    //         //wegen Einkesselung von GrÃ¤sern
    //         let theChoosenField = random(emptyFields);
    //         let newX = theChoosenField[0];
    //         let newY = theChoosenField[1];
    //         matrix[this.y][this.x] = 0;
    //         this.x = newX;
    //         this.y = newY;
    //         matrix[newY][newX] = this.offDeff;
    //     }


    // }

    // chooseBetterField(maxOffDeff) // neue Funktion gibt alle GrÃ¤ser
    // //unter dem eigenen OffDeff Wert an
    // {
    //     this.newDirections();
    //     let found = [];
    //     for(let i in this.directions)
    //     {
    //         let x = this.directions[i][0];
    //         let y = this.directions[i][1];
    //         if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
    //         {
    //             for(let h in grazerArr) //normale Grazer-positionen werden mit jetziger Position verglichen
    //             {
    //                 let grazerObj = grazerArr[h];
    //                 if(grazerObj.x == x && grazerObj.y == y)
    //                 {
    //                     found.push(this.directions[i]); //alle passenden normalen Grazer kommen in das Array
    //                 }
    //             }
    //             for(let j in evolvedGrazerArr) //s.o.
    //             {
    //                 let evolvedGrazerObj = evolvedGrazerArr[j];
    //                 if(evolvedGrazerObj.x == x && evolvedGrazerObj.y == y && evolvedGrazerObj.offDeff < maxOffDeff) //es dÃ¼rfen nur Grazer mit niederigerem
    //                 //offDeff Wert gefressen werden
    //                 {
    //                     found.push(this.directions[i]); //s.o.
    //                 }
    //             }
    //         }
    //     }
    //     return found;
    // }

    eat()
    {
        let grazerFields = this.chooseBetterField(this.offDeff, "fleshGrazer");
        if(grazerFields.length > 0)
        {
            let theChoosenField = random(grazerFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = this.offDeff;
            this.multiplyer++;

            for(let i in grazerArr) //entfernen von potenziell gefressenem Grazer
            {
                let grazerObj = grazerArr[i];
                if(grazerObj.x == newX && grazerObj.y == newY)
                {
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            for(let i in evolvedGrazerArr) //entfernen von potenziell gefressenem Evolved-Grazer
            {
                let evolvedGrazerObj = evolvedGrazerArr[i];
                if(evolvedGrazerObj.x == newX && evolvedGrazerObj.y == newY)
                {
                    evolvedGrazerArr.splice(i, 1);
                    break;
                }
            }
            this.lives = 8;
            if(this,this.multiplyer >= 3)
            {
                this.multiply();
            }
        }else if(this.lives <= 0) // wenn keine Energie vorhanden - stirb
        {
            this.die("fleshGrazer");
        }
        else
        {
            this.lives--;
            this.move(this.offDeff);
        }
    }

    // die()
    // {
    //     matrix[this.y][this.x] = 0;
    //     for(let i in fleshGrazerArr)
    //     {
    //         let fleshGrazer = fleshGrazerArr[i];
    //         if(fleshGrazer.x == this.x && fleshGrazer.y == this.y)
    //         {
    //             fleshGrazerArr.splice(i, 1);
    //             break;
    //         }
    //     }
    // }

    multiply()
    {
        let freeCell = this.chooseField(0);
        if(freeCell.length > 0)
        {
            let chosenCell = random(freeCell);
            let newX = chosenCell[0];
            let newY = chosenCell[1];
            let fleshObj = new FleshGrazer(newX, newY);
            fleshGrazerArr.push(fleshObj);
            matrix[newY][newX] = 10;
        }
        this.multiplyer = 0;
    }
}
