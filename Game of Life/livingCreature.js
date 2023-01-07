class LivingCreature // soll als übergeordnete Klasse für Grass, Grazor, fleshgrazer und deren Evolutionen dienen
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.multiplyer = 0; //sorgt für normale Fortpflanzung
        this.roundCounter = 0; //Zählt Runden. Ist verantworlich für periodische Mutation nach 10 runden für alle Klassen
        this.offDeff = 1; //Standart OffDeff Wert für Grass; wird bei anderen Klassen überschrieben
        this.directions = 
        [
            [this.x-1, this.y-1],
            [this.x  , this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y  ],
            [this.x+1, this.y  ],
            [this.x-1, this.y+1],
            [this.x  , this.y+1],
            [this.x+1, this.y+1]
        ]
    } 

    choseField(character)
    {
        let found = [];

        for(let i in this.directions)
        {
            let pos = this.directions[i];
            let x = pos[0];
            let y = pos[1];

            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) // Nur Positionen innerhalb der Matrix
            {
                if(matrix[y][x] == character) //Vergleich mit demm Wert des gegebenen Objekts
                {
                    found.push(pos);  //push stellt den Parameter an das Ende des Arrays
                }

            }
        }

        return found
    }

    multiply()
    {
        this.roundCounter++;
        //console.log(this.roundCounter);
        this.multiplyer++;
        // jetzt darf sich vermehrt werden
        if(this.multiplyer > 6)
        {
            // gibt es leere nachbarfelder - chooseField(0)
            let emptyFields = this.choseField(0);
           //console.log(emptyFields);
            if(emptyFields.length > 0)
            {
                // dann zufÃ¤llig ein Position eines NB-Field aus der Liste
                let theChoosenField = random(emptyFields);
                //[x, y]
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                // dann gras-Objekt erstellen
                let grassObj = new Grass(newX, newY);
                // Gras-Objekt der Liste mit vorhandne grasObjekten hinzufÃ¼gen
                grassArray.push(grassObj);
                // Spielfeld aktualisieren
                matrix[newY][newX] = 1;
            }
            // reset rundenzähler
            this.multiplyer = 0;
        }
    }
}