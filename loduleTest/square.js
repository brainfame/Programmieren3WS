//Square Klassen Modul

module.exports = class Square
{
    constructor(a, b)
    {
        this.length = a;
        this.height = b;
    }

    getArea()
    {
        return this.height*this.length;
    }
}