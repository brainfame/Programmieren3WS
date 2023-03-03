let matrix = [[]];
let side = 10;
let fr = 4;
let socket_id = undefined;
let isRaining = false;


window.onload = handleGame;

function handleGame()
{
    const socket = io();

    socket.on('connection', function(data)
    {
     console.log("connection successful: ", data);
     socket_id = data;
    })

    socket.on('send matrix', function(data)
    {
        resizeCanvas(side*matrix[0].length+1, side * matrix.length+1);
        matrix = data;
    })

    socket.on('raining', function(data)
    {
        isRaining = data;
    })
}


function setup()
{
    // createCanvas(side*matrix[0].length+1, side * matrix.length+1);
    background('#acacac');
    frameRate(fr);
}

function draw()
{
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