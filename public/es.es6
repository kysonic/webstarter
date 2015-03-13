/* Class */
class Animal {
    constructor(name){
        this.name = name;
    }
    toString(){
        return "This is:" + this.name;
    }
}
class Cat extends Animal {
    constructor(name, ownerName) {
        super.constructor(name);
        this.ownerName = ownerName;
    }
    toString(){
        return super.toString() + ' owned by '+ this.ownerName;
    }
}
let cat  = new Cat('Barsik','Anton');
/* Class */
/* Array function */
let fn = (x)=>x*x;
var o = {
    name: 'John',
    makeSomething: ()=>console.log(this.name),
    handler: ()=>document.addEventListener('click',(e)=>this.makeSomething())
}
/* Array function */
/* Generators */
// Generators dont work without node_modules compiler for browsers, like a broserify or systemjs
// But we want try https://github.com/facebook/regenerator

function* graph(){
    let x = 0;
    let y = 0;
    while(true){
        yield {x:x, y:y}
        x += 2;
        y += 1;
    }
}


var graphGenerator = graph();
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
/* Generators */
/* Sets and Maps */
var cities = new Set();
cities.add('Taaganrog');
cities.values().next().value;

var mapper = new Map();
mapper.add('A',1);
mapper.add('A',2);

mapper.get('A'); // 1
mapper.delete('B');
mapper.keys();
mapper.values();
/* Sets and Maps */
/* String templates */
var salutation = "Hello";
var place = "planet";
var greeting = `

${salutation},
    You
       Crazy         ${place}

       How
   Are
        You


`;
// Function in template string
function tag(strings, ...values){
    if(values[0] < 20) {
        values[1] = "awake";
    }
    return `${strings[0]}${values[0]}${strings[1]}${values[1]}`
}
var message = tag`It's ${new Date().getHours()} I'm ${""}`
/* String templates */
/* Objects */
var color = "red";
var speed = 10;
var drive = "go";
var car = {
    color,
    speed,
    [drive]: function(){
        console.log("vroom");
    }
};
console.log(car.color);
console.log(car.speed);
car[drive]();
/* Objects */

/*  Arrays */
// Get custom data in object in objects array.. Super!  Don't work in 6to5 ((
let people = [
    {
        "firstName": "Melinda",
        "phone": "1-607-194-5530",
        "email": "dignissim.Maecenas.ornare@lacusAliquam.co.uk"
    },
    {
        "firstName": "Elizabeth",
        "phone": "1-155-446-1624",
        "email": "cursus.et.magna@nislsemconsequat.edu"
    },
    {
        "firstName": "Ferris",
        "phone": "1-871-927-1710",
        "email": "est@Vivamus.co.uk"
    }
]
let emails = [for({email, firstName} of people) if(firstName === "Melinda") email]

Aray.from(document.querySelector('div')); // Don't work in 6to5
Array.keys();
Array.entries();
Array.values();
/*  Arrays */



