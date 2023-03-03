const Grass = require("./grass");
const FleshGrazer = require("./fleshgrazer");
const Grazer = require("./grazer");
const ColorFinder = require("./newColors");
let matrix = [];

function getRandom(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
  

function getRandomMatrix(hoehe, laenge)
{
    let matrix = [];
    for(let y = 0; y < hoehe; y++)
    {
        matrix[y] = [];
        for(let x = 0; x < laenge; x++)
        {
            matrix[y][x] = 0;
        }
    }

    for(let i = 0; i < 1800; i++) //Anzahl der Fleischfresser
    {
        let y = Math.floor(getRandom(0, hoehe));
        let x = Math.floor(getRandom(0, laenge));
        matrix[y][x] = 1;
    }
    for(let i = 0; i < 25; i++) //Anzahl der Fleischfresser
    {
        let y = Math.floor(getRandom(0, hoehe));
        let x = Math.floor(getRandom(0, laenge));
        matrix[y][x] = 10;
    }
    for(let i = 0; i < 30; i++) //Anzahl der Grasfresser
    {
        let y = Math.floor(getRandom(0, hoehe));
        let x = Math.floor(getRandom(0, laenge));
        matrix[y][x] = 5;
    }
    return matrix;
}


function main()
{

    let side = 10;
    let grassArray = [];
    let grazerArr = [];
    let fleshGrazerArr = [];
    let evolvedGrassArr= []; //neues Array fÃ¼r evolved-Klasse
    let evolvedGrazerArr = []; //neues Array fÃ¼r evolved-Klasse
    
    
    function setup()
    {
        textSize(10);
        matrix = getRandomMatrix(60, 60);
        frameRate(5);
        createCanvas(matrix[0].length * side +1, matrix.length * side+1);
        background("#acacac");
        
        for(let y = 0; y < matrix.length; y++)
        {
            for(let x = 0; x < matrix[y].length; x++)
            {
                if(matrix[y][x] == 1)
                {
                    let grassObj = new Grass(x, y);
                    grassArray.push(grassObj);
                }
                else if(matrix[y][x] == 5)//5
                {
                    let grazerObj = new Grazer(x, y);
                    grazerArr.push(grazerObj);
                }
                else if(matrix[y][x] == 10)//10
                {
                    let fleshObj = new FleshGrazer(x, y);
                    fleshGrazerArr.push(fleshObj);
                }
            }
        }
        
    }
    
    
    function draw(){
        
        frameRate(5);
        for(let i in grassArray)
        {
            let grassObj = grassArray[i];
            grassObj.multiply();
            grassObj.mutate();
        }
        for(let i in evolvedGrassArr)
        {
            let evolvedGrassObj = evolvedGrassArr[i];
            evolvedGrassObj.multiply();
            evolvedGrassObj.mutate();
        }
        for(let i in grazerArr)
        {
            let grazerObj = grazerArr[i];
            grazerObj.eat();
            grazerObj.mutate();
        }
        for(let i in evolvedGrazerArr)
        {
            let evolvedGrazerObj = evolvedGrazerArr[i];
            evolvedGrazerObj.eat();
            evolvedGrazerObj.mutate();
        }
        for(let i in fleshGrazerArr)
        {
            let fleshObj = fleshGrazerArr[i];
            fleshObj.eat();
        }
        
        for(let y = 0; y < matrix.length; y++)
        {
            loop1: //Wenn eine Farbe gefunden wurde, fÃ¤ngt die for for Schleife wieder von vorne an
            for(let x = 0; x < matrix[y].length; x++)
            {
                for(let i in grassArray)
                {
                    let grass = grassArray[i];
                    if(grass.x == x && grass.y == y) //Gleicht jetzige Position mit der von jedem Grass-Objekt ab(umstÃ¤ndlich).
                    {
                        let colorReal = ColorFinder(grass.offDeff, 0);
                        fill(colorReal);
                        rect(x * side, y *side , side, side);
                        continue loop1;
                    }
                }
                for(let i in grazerArr)
                {
                    let grazer = grazerArr[i];
                    if(grazer.x == x && grazer.y == y)
                    {
                        let colorReal = ColorFinder(grazer.offDeff, 1);
                        fill(colorReal);
                        rect(x * side, y *side , side, side);
                        continue loop1;
                    }
                }
                for(let i in fleshGrazerArr)
                {
                    let flesh = fleshGrazerArr[i];
                    if(flesh.x == x && flesh.y == y)
                    {
                        fill(255, 0, 0);
                        rect(x * side, y *side , side, side);
                        continue loop1;
                    }
                }
                for(let i in evolvedGrassArr)
                {
                    let evolvedGrass = evolvedGrassArr[i];
                    if(evolvedGrass.x == x && evolvedGrass.y == y)
                    {
                        let colorReal = ColorFinder(evolvedGrass.offDeff, 0); //Funktion, um nach Generation die Farbe zu verÃ¤ndern
                        fill(colorReal);
                        rect(x * side, y *side , side, side);
                        continue loop1;
                    }
                }
                for(let i in evolvedGrazerArr)
                {
                    let evolvedGrazer = evolvedGrazerArr[i];
                    if(evolvedGrazer.x == x && evolvedGrazer.y == y)
                    {
                        let colorReal = ColorFinder(evolvedGrazer.offDeff, 1); //Funktion, um nach Generation die Farbe zu verÃ¤ndern
                        fill(colorReal);
                        rect(x * side, y *side , side, side);
                        continue loop1;
                    }
                }
                fill("white");
                rect(x * side, y *side , side, side);
            }
        }
    }
    
}
module.exports = {matrix, allarrays, }