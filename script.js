class Test
{
   constructor()
   {
       this.first1_name = "Abel";
       this.last_name = "Sadoyan";
   }
  
}
let myTestObj = new Test();
let obj = {
    first_name: "Abelo",
    last_name: "Sadoyan",

    sayHello() {
        console.lot (myTestObj.first1_name);
    }
 }
 
 console.log(obj);
 console.log(obj.first_name);obj.sayHello();
