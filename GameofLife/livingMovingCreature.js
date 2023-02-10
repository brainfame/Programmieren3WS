class LivingMovingCreature extends LivingCreature
{
    constructor()
    {
        super();
        this.lives = 5; //default für Grazer; Bei anderen soll überschrieben werden
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
    
    chooseBetterField(maxOffDeff, creatureName) // creatureName kann entweder grazer oder fleshGrazer sein
    { //choose Function für alle Kreaturen, die sich bewegen
        this.newDirections();// aktualisiere meine Nachbarfelder

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
                if(creatureName  == "grazer" || creatureName == "evolvedGrazer") // Suche nur in den Grass Arrays wenn ein Grazer die Function aufruft
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
                
                if(creatureName  == "fleshGrazer") // Suche nur in den grazer Arrays wenn ein fleshgrazer die Function aufruft
                {
                    for(let h in grazerArr) //normale Grazer-positionen werden mit jetziger Position verglichen
                    {
                        let grazerObj = grazerArr[h];
                        if(grazerObj.x == x && grazerObj.y == y)
                        {
                            found.push(this.directions[i]); //alle passenden normalen Grazer kommen in das Array
                        }
                    }
                    for(let j in evolvedGrazerArr) //s.o.
                    {
                        let evolvedGrazerObj = evolvedGrazerArr[j];
                        if(evolvedGrazerObj.x == x && evolvedGrazerObj.y == y && evolvedGrazerObj.offDeff < maxOffDeff)
                        //nur Tiere mit niedrigierem offDeff wert dürfen gefressen werden
                        {
                            found.push(this.directions[i]); //s.o.
                        }
                    }
                }
            }
        }
        return found;
    }

    move(creatureOffDeff)
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
            matrix[newY][newX] = creatureOffDeff;
            this.multiply = 0;
        }
        
        
    }

    die(creatureName) //Function soll übergreifend für alle bewegenden Tiere nutzbar sein
    {
        // Spielfeld aktualisieren - Wert 0
        matrix[this.y][this.x] = 0;
        // Grasfresser Liste aktualisieren - gelÃ¶scht
        // wir suchen in der Grasfresser Liste ein Objekt mit gleich x und y Werten
        if(creatureName == "grazer")
        {
            for(let i in grazerArr)
            {
                let grazer = grazerArr[i];
                if(grazer.x == this.x && grazer.y == this.y)
                {
                    // gefunden - nun lÃ¶schen
                    grazerArr.splice(i, 1);
                    break;
                }
            }
        }
        if(creatureName == "fleshGrazer")
        {
            for(let i in fleshGrazerArr)
            {
                let fleshGrazer = fleshGrazerArr[i];
                if(fleshGrazer.x == this.x && fleshGrazer.y == this.y)
                {
                    fleshGrazerArr.splice(i, 1);
                    break;
                }
            }
        }
        if(creatureName == "evolvedGrazer")
        {
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
    }
    
}