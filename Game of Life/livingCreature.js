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

}