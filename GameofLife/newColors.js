/*diese Datei gibt die verwendeten Farben fĆ¼r das "Game of Life" Projekt.
Hier werden mittels der zwei Funktionen abhĆ¤ngig von den offDeff Werten der Objekte ihnen ihre Farbe zugeordnet.*/

//Grass Colors
let evolvedgrasColor = [];
function colorGrassFinder(offDeff)
{
    if(offDeff <= 1)
    {
        let evolvedgrasColor = [37, 122, 37];
        return evolvedgrasColor;
    }
    if(offDeff == 2 || offDeff == 3)
    {
        let evolvedgrasColor = [0, 0, 0];
        return evolvedgrasColor;
    }
    if(offDeff == 4)
    {
        let evolvedgrasColor = [0, 255, 154];
        return evolvedgrasColor;
    }
    if(offDeff >= 5)
    {
        let evolvedgrasColor = [0, 153, 153];
        return evolvedgrasColor;
    }
}

//Grass Colors
let evolvedgrazerColor = [];
function colorGrazerFinder(offDeff)
{
    if(offDeff <= 5)
    {
        let evolvedgrazerColor = [247, 206, 1];
        return evolvedgrazerColor;
    }
    if(offDeff == 6 || offDeff == 7)
    {
        let evolvedgrazerColor = [102, 120, 0];
        return evolvedgrazerColor;
    }
    if(offDeff == 8 || offDeff == 9)
    {
        let evolvedgrazerColor = [255, 128, 0];
        return evolvedgrazerColor;
    }
    if(offDeff >= 10)
    {
        let evolvedgrazerColor = [102, 51, 0];
        return evolvedgrazerColor;
    }
}