/*diese Datei gibt die verwendeten Farben fĆ¼r das "Game of Life" Projekt.
Hier werden mittels einer Klasse abhĆ¤ngig von den offDeff Werten der Objekte ihnen ihre Farbe zugeordnet.*/


module.exports = function colorFinder(offDeff, a)
{
    if(a == 0)
    {
        //Grass Colors
        let evolvedgrasColor;
        if(offDeff <= 1)
        {
            evolvedgrasColor = [100, 231, 100];
        }
        else if(offDeff <= 3)
        {
            evolvedgrasColor = [37, 122, 37];
        }
        else
        {
            evolvedgrasColor = [24, 78, 24];
        }
        return evolvedgrasColor;
    }
    
    elseif(a == 1)
    {
        //grazer Colors    
        let evolvedgrazerColor;
        if(offDeff <= 5)
        {
            evolvedgrazerColor = [247, 206, 1];
        }
        else if(offDeff <= 7)
        {
            evolvedgrazerColor = [204, 102, 0];
        }
        else
        {
            evolvedgrazerColor = [255, 102, 153];
        }
        return evolvedgrazerColor;
           
    }
}