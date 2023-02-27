class Grass extends LivingCreature
{
    constructor(x,y)
    {
        super(x, y);
    } 
    
    multiply()
    {
        this.roundCounter++;
        //console.log(this.roundCounter);
        this.multiplyer++;
        // jetzt darf sich vermehrt werden
        if(this.multiplyer > 5)
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
    mutate() //Funktion zum Mutieren
    {
        if(this.roundCounter >= 10) //Alle 10 Runden soll sich das normale Gras mutieren dÃ¼rfen
        {
            let emptyFields = this.choseField(0);
            if(emptyFields.length > 0)
            {
                let theChoosenField = random(emptyFields);
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                // neuen OffDeff Wert generieren
                let mutateNum = Math.floor(random(3)); // VerÃ¤nderung des OffDeff Werts
                let newOffDeff = this.offDeff + mutateNum;
                // dann evolved-Gras-Objekt erstellen
                let evolvedGrassObj = new EvolvedGrass(newX, newY, newOffDeff); //Evolved Klassen haben 3. Parameter -->offDeff WErt
                // EvolvedGras-Objekt der Liste mit vorhandne evolvedgrasObjekten hinzufÃ¼gen
                evolvedGrassArr.push(evolvedGrassObj);
                matrix[newY][newX] = newOffDeff; //GrÃ¤ser sind nicht alle 1 in der Matrix, sondern nehmen ihren offDeff wert an
            }
            this.roundCounter = 0;
        }
    }
}