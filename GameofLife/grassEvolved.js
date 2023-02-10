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
                matrix[newY][newX] = oldOffDeff; // Der offDeff Wert ist die definition für die Kreatur
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