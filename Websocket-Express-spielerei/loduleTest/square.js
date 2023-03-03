const { appendFile } = require("fs");

module.exports = class DoubleCounter
{
    constructor(doubleNumber)
    {
        this.num = doubleNumber;
    }

    double()
    {
        return this.num * 2;
    }
}