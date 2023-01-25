class LivingMovingCreature extends LivingCreature
{
    constructor()
    {
        super();
        this.lives;
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
    //unter dem eigenen OffDeff Wrt an
    {
        // aktualisiere meine Nachbarfelder
        this.newDirections();

        let found = [];
        // Liste mit allen leeren Nachbarfelder
        for(let i in this.directions)
        {
            // hole die Position
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            // ÃœberprÃ¼fe die Spielfeldgrenzen
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
            {
                for(let h in grassArray)
                {
                    let grassObj = grassArray[h];
                    if(grassObj.x == x && grassObj.y == y)
                    {
                        found.push(this.directions[i]);
                    }
                }
                for(let j in evolvedGrassArr)
                {
                    let evolvedGrassObj = evolvedGrassArr[j];
                    if(evolvedGrassObj.x == x && evolvedGrassObj.y == y && evolvedGrassObj.offDeff < maxOffDeff)
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
            
            // alte Position in der Matrix bekommt 0
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            // spielfeld aktualisieren mit der neuen Pos
            matrix[newY][newX] = 5;
            this.multiply = 0;
        }
        
        
    }

    eat()
    {
        this.roundCounter++;
        let grassFields = this.chooseBetterField(this.offDeff);
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
            this.multiply++;
            
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
            if(this.multiply >= 5)
            {
                this.multiplyer();
            }
        }
        else if(this.lives <= 0) // wenn keine Energie vorhanden - stirb
        {
            this.die();
        }
        else 
        {
            this.lives--;
            this.move();
        }
    }
    
}