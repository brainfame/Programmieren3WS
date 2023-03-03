const LivingMovingCreature = require("./livingMovingCreature");
module.exports = class Grazer extends LivingMovingCreature
{
    constructor(x, y)
    {
        super(x, y);
        this.offDeff = 5; //Standart OffDeff WErt fÃ¼r Grazer
    }

    eat()
    {
        this.roundCounter++;
        let grassFields = this.chooseBetterField(this.offDeff, "grazer");
        //console.log(grassFields);     
        if(grassFields.length > 0)
        {
            let theChoosenField = random(grassFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            //console.log(newX, newY);
            
            // alte Position in der Matrix bekommt 0
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = 5;
            // spielfeld aktualisieren mit der neuen Pos
            this.multiplyer++;
            
            // Entferne aus dem Gras-Array entfernen
            for(let i in grassArray)
            {
                let grassObj = grassArray[i];
                if(grassObj.x == newX && grassObj.y == newY)
                {
                    // lÃ¶sche grassObj
                    grassArray.splice(i, 1);
                    break;
                }
            }
            for(let i in evolvedGrassArr)
            {
                let evolvedObj = evolvedGrassArr[i];
                if(evolvedObj.x == newX && evolvedObj.y == newY)
                {
                    evolvedGrassArr.splice(i, 1);
                    break;
                }
            }
            this.lives = 5;
            if(this.multiplyer >= 7)
            {
                this.multiply();
            }
        }
        else if(this.lives <= 0) // wenn keine Energie vorhanden - stirb
        {
            this.die("grazer");
        }
        else 
        {
            this.lives--;
            this.move(5);
        }
    }
    
    

    multiply()
    {
        let freeCell = this.chooseField(0);
        //console.log(freeCell);
        if(freeCell.length > 0)
        {
            let chosenCell = random(freeCell);
            let newX = chosenCell[0];
            let newY = chosenCell[1];
            let grazerObj = new Grazer(newX, newY);
            grazerArr.push(grazerObj);
            matrix[newY][newX] = 5;
        }
        this.multiplyer = 0;
    }

    mutate()
    {
        if(this.roundCounter >= 10) //Alle 15 Runden soll sich das normale Gras mutieren dÃ¼rfen
        {
            let emptyFields = this.chooseField(0);
            if(emptyFields.length > 0){
                let theChoosenField = random(emptyFields);
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                let mutateNum = Math.floor(random(-1, 3)); // VerÃ¤nderung des OffDeff Werts
                let newOffDeff = this.offDeff + mutateNum;
                let evolvedGrazerObj = new EvolvedGrazer(newX, newY, newOffDeff);
                evolvedGrazerArr.push(evolvedGrazerObj);
                matrix[newY][newX] = newOffDeff;
            }
            this.roundCounter = 0;
        }
    }
}