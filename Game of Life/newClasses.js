/*Neue Klasses für das "Game of life Programm" 
Sie beinhaltet zwei neue Klassen, die jewiels an dem Gras und dem Grazer angelehnt sind.
Die neuen Klassen "evolvedGrass" und "evolvedFrazer". Sind Typen der bekannten Klassen, die sich in ihrem OffDeff,
und Reproduktionsgeschwindigkeit gegenÃ¼ber ihren Vorfahren unterscheiden. Mit jeder neuen Generation besteht die chance, 
dass aus einem Grass oder Grassfresser
ein jeweiliger Mutant entsteht. Dieser hat einen leicht anderen Ton (der Ausschluss Ã¼ber seinen OffDeff gibt).
Der OffDeff ist eine neue Größe, die bei den Vorfahren 10 betrÃ¤gt und sich mit der Mutation verÃ¤ndern kann.
Dieser Wert sagt aus, ob Objakte von ihren Angreifern gefressen werden kÃ¶nnen. Diese mÃ¼ssen nÃ¤mlich seitens des Angreifers hÃ¶her sein
als vom Verteidiger (bei Gleichstand--> kein Fressen). Dieser Wert beeinflusst jedoch die Fortpflanzugsgeschwindigkeit.
Je hÃ¶her der OffDeff desto geringer (einfach abgezogen) die Reproduktionsgeschwindigkeit.
*/

class EvolvedGrass extends LivingCreature
{
    constructor(x,y, offDeff)
    {
        super(x, y);
        this.offDeff = offDeff;
        this.multiplyBoarder = 5 + this.offDeff; //Der Multiplikator wird durch den offDeff Wert verÃ¤ndert
    } 

    multiply()
    {
        this.multiplyer++;
        if(this.multiplyer > this.multiplyBoarder) //je hÃ¶her offDeff desto mehr Zeit vergeh zwischen den multiplies
        {
            let emptyFields = this.choseField(0);
            if(emptyFields.length > 0)
            {
                let theChoosenField = random(emptyFields);
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                let oldOffDeff = this.offDeff;
                let evolvedGrassObj = new EvolvedGrass(newX, newY,oldOffDeff); //offDeff Wert Ã¤ndert sich nicht
                //wegen nomaler Fortpflanzung
                evolvedGrassArr.push(evolvedGrassObj);
                matrix[newY][newX] = oldOffDeff;
            }
            this.multiplyer = 0;
        }
        this.roundCounter++;
    }

    mutate()
    {
        if(this.roundCounter >= 10) 
        {
            let emptyFields = this.choseField(0);
            // wenn das Array nicht leer ist
            if(emptyFields.length > 0)
            {
                let theChoosenField = random(emptyFields);
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                // neue OffDeff Werte generieren
                let mutateNum = Math.floor(random(-1, 3)); // VerÃ¤nderung des OffDeff Werts (wieder)
                let newOffDeff = this.offDeff + mutateNum;
                // dann evolvedgras-Objekt erstellen
                let evolvedGrassObj = new EvolvedGrass(newX, newY, newOffDeff);
                // EvolvedGras-Objekt der Liste mit vorhandne evolvedgrasObjekten hinzufÃ¼gen
                evolvedGrassArr.push(evolvedGrassObj);
                matrix[newY][newX] = newOffDeff;
            }
            this.roundCounter = 0;
        }
    }
}

class EvolvedGrazer 
{
    constructor(x, y, offDeff)
    {
        this.x = x;
        this.y = y;
        this.lives = 5;
        this.multiply = 0;
        this.offDeff = offDeff; //abhÃ¤ngig von zufallszalh bei grazer.mutate()
        this.roundCounter = 0;
        this.multiplyBoarder = 10 + offDeff; //s.o.
        this.directions = [
            [this.x-1, this.y-1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }
    
    newDirections()
    {
        this.directions = [
            [this.x-1, this.y-1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }


    chooseField(character)
    {
        this.newDirections();
        let found = [];
        for(let i in this.directions)
        {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
            {
                if(matrix[y][x] == character)
                {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    chooseBetterField(maxOffDeff) // neue Funktion gibt alle GrÃ¤ser
    //unter dem eigenen OffDeff Wert an
    {
        this.newDirections();
        let found = [];
        for(let i in this.directions)
        {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
            {
                for(let h in grassArray) //alle normalen GrÃ¤ser abgeglichen
                {
                    let grassObj = grassArray[h];
                    if(grassObj.x == x && grassObj.y == y)
                    {
                        found.push(this.directions[i]);
                    }
                }
                for(let h in evolvedGrassArr) //alle evolved GrÃ¤ser abgeglichen
                {
                    let evolvedGrassObj = evolvedGrassArr[h];
                    if(evolvedGrassObj.x == x && evolvedGrassObj.y == y && evolvedGrassObj.offDeff < maxOffDeff)
                    //nur, wenn der offDeff Wert des Grazers hÃ¶her ist als der vom Gras
                    {
                        found.push(this.directions[i]);
                    }
                }
            }
        }
        return found;
    }

    move()
    {
        
        let emptyFields = this.chooseField(0);
        if(emptyFields.length > 0)
        {
            let theChoosenField = random(emptyFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = this.offDeff;
            this.multiply = 0;
        }
    }
    
    eat()
    {
        this.roundCounter++;
        let grassFields = this.chooseBetterField(this.offDeff);
        if(grassFields.length > 0)
        {
            let theChoosenField = random(grassFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            matrix[newY][newX] = this.offDeff;
            this.multiply++;

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
            if(this.multiply >= this.multiplyBoarder)
            {
                this.multiplyer();
            }
            this.lives = 5;
        }
        else if(this.lives <= 0)
        {
            this.die();
        }
        else 
        {
            this.lives--;
            this.move();
        }
    }
    
    die()
    {
        matrix[this.y][this.x] = 0;
        for(let i in evolvedGrazerArr)
        {
            let evolvedGrazer = evolvedGrazerArr[i];
            if(evolvedGrazer.x == this.x && evolvedGrazer.y == this.y)
            {
                evolvedGrazerArr.splice(i, 1);
                break;
            }
        }
 
    }

    multiplyer()
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
        this.multiply = 0;
    }

    mutate()
    {
        if(this.roundCounter >= 10) 
        {
            let emptyFields = this.chooseField(0);
            if(emptyFields.length > 0)
            {
                let theChoosenField = random(emptyFields);
                console.log(theChoosenField);
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