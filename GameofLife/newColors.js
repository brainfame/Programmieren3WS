/*diese Datei gibt die verwendeten Farben fĆ¼r das "Game of Life" Projekt.
Hier werden mittels der zwei Funktionen abhĆ¤ngig von den offDeff Werten der Objekte ihnen ihre Farbe zugeordnet.*/

//Grass Colors
function colorGrassFinder(offDeff)
{
    let evolvedgrasColor;
    if(offDeff <= 1)
    {
        evolvedgrasColor = [37, 122, 37];
    }
    else
    {
        evolvedgrasColor = [0, 0, 0,];
    }
    return evolvedgrasColor;
}

//grazer Colors
function colorGrazerFinder(offDeff)
{
    let evolvedgrazerColor;
    if(offDeff <= 5)
    {
        evolvedgrazerColor = [247, 206, 1];
        return evolvedgrazerColor;
    }
    if(offDeff == 6 || offDeff == 7)
    {
        evolvedgrazerColor = [102, 120, 0];
        return evolvedgrazerColor;
    }
    if(offDeff == 8 || offDeff == 9)
    {
        evolvedgrazerColor = [255, 128, 0];
        return evolvedgrazerColor;
    }
    if(offDeff >= 10)
    {
        evolvedgrazerColor = [102, 51, 0];
        return evolvedgrazerColor;
    }
}