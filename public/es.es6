// Class
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
// Fat function
let fn = (x)=>x*x;
// Generators
// Generators dont work without node_modules compiler for browsers, like a broserify or systemjs
// But we want try https://github.com/facebook/regenerator

// Sets and Maps
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

// String templates

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

// Object Enhancements

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

// Arrays
// Array.from is not working in 6to5

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
    },
    {
        "firstName": "Zephania",
        "phone": "1-581-440-7373",
        "email": "egestas.rhoncus@Donecest.ca"
    },
    {
        "firstName": "Melinda",
        "phone": "1-568-162-3621",
        "email": "montes.nascetur@sitamet.co.uk"
    }
]

let emails = [for({email, firstName} of people) if(firstName === "Melinda") email]


console.log(emails);

//
Array.keys();
Array.entries();
Array.values();



