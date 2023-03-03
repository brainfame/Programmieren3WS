const LivingMovingCreature = require("./livingMovingCreature");
module.exports = class EvolvedGrazer extends LivingMovingCreature
{
    constructor(x, y, offDeff)
    {
        super(x, y);
        this.offDeff = offDeff; //abhÃ¤ngig von zufallszalh bei grazer.mutate()
        this.multiplyBoarder = 10 + offDeff;
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


    // chooseField(character)
    // {
    //     this.newDirections();
    //     let found = [];
    //     for(let i in this.directions)
    //     {
    //         let x = this.directions[i][0];
    //         let y = this.directions[i][1];
    //         if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
    //         {
    //             if(matrix[y][x] == character)
    //             {
    //                 found.push(this.directions[i]);
    //             }
    //         }
    //     }
    //     return found;
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
    //             for(let h in grassArray) //alle normalen GrÃ¤ser abgeglichen
    //             {
    //                 let grassObj = grassArray[h];
    //                 if(grassObj.x == x && grassObj.y == y)
    //                 {
    //                     found.push(this.directions[i]);
    //                 }
    //             }
    //             for(let h in evolvedGrassArr) //alle evolved GrÃ¤ser abgeglichen
    //             {
    //                 let evolvedGrassObj = evolvedGrassArr[h];
    //                 if(evolvedGrassObj.x == x && evolvedGrassObj.y == y && evolvedGrassObj.offDeff < maxOffDeff)
    //                 //nur, wenn der offDeff Wert des Grazers hÃ¶her ist als der vom Gras
    //                 {
    //                     found.push(this.directions[i]);
    //                 }
    //             }
    //         }
    //     }
    //     return found;
    // }

    // move()
    // {
        
    //     let emptyFields = this.chooseField(0);
    //     if(emptyFields.length > 0)
    //     {
    //         let theChoosenField = random(emptyFields);
    //         let newX = theChoosenField[0];
    //         let newY = theChoosenField[1];
    //         matrix[this.y][this.x] = 0;
    //         this.x = newX;
    //         this.y = newY;
    //         matrix[newY][newX] = this.offDeff;
    //         this.multiplyer = 0;
    //     }
    // }
    
    eat()
    {
        this.roundCounter++;
        let grassFields = this.chooseBetterField(this.offDeff, "evolvedGrazer");
        if(grassFields.length > 0)
        {
            let theChoosenField = random(grassFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = this.offDeff;
            this.multiplyer++;

            for(let i in grassArray) //potenziell gegessenes Gras entfernen
            {
                let grassObj = grassArray[i];
                if(grassObj.x == newX && grassObj.y == newY)
                {
                    grassArray.splice(i, 1);
                    break;
                }
            }
            for(let i in evolvedGrassArr) //potenziell gegessenes evolvedGras entfernen
            {
                let evolvedObj = evolvedGrassArr[i];
                if(evolvedObj.x == newX && evolvedObj.y == newY)
                {
                    evolvedGrassArr.splice(i, 1);
                    break;
                }
            }
            if(this.multiplyer >= this.multiplyBoarder)
            {
                this.multiply();
            }
            this.lives = 5;
        }
        else if(this.lives <= 0)
        {
            this.die("evolvedGrazer");
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
    //     for(let i in evolvedGrazerArr)
    //     {
    //         let evolvedGrazer = evolvedGrazerArr[i];
    //         if(evolvedGrazer.x == this.x && evolvedGrazer.y == this.y)
    //         {
    //             evolvedGrazerArr.splice(i, 1);
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
            let evolvedGrazerObj = new EvolvedGrazer(newX, newY, this.offDeff); //gleicher offDeff Wert
            evolvedGrazerArr.push(evolvedGrazerObj);
            matrix[newY][newX] = this.offDeff;
        }
        this.multiplyer = 0;
    }

    mutate()
    {
        if(this.roundCounter >= 7) 
        {
            let emptyFields = this.chooseField(0);
            if(emptyFields.length > 0)
            {
                let theChoosenField = random(emptyFields);
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                let mutateNum = Math.floor(random(-1, 4)); // VerÃ¤nderung des OffDeff Werts
                let newOffDeff = this.offDeff + mutateNum;
                let evolvedGrazerObj = new EvolvedGrazer(newX, newY, newOffDeff);
                evolvedGrazerArr.push(evolvedGrazerObj);
                matrix[newY][newX] = newOffDeff;
            }
            this.roundCounter = 0;
        }
    }
}