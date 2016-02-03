/*
Compilation of code explaining a subset of the good parts of JS.
Juan Daniel Castillo Reyes
http://juandanielcr.me

JS THE GOOD PARTS

OBJECTS

INDEX:
	Object Literals
	Retrieval
	Update
	Reference
	Prototype
	Reflection
	Enumeration
	Delete
	Global Abatement

An object is a container of properties, each prop has its own property.name and its property value.
Object in JS are mutable keyed collections.
Numbers, Strings and Booleans are Object-liked, becuase they have methods that are inmmutable.

The following statements are Objects: arrays, functions, regular expressions, objects.

The Property Name = Always a String
The Property Value = Any JS value except for undefined

Objects are class-free.

Prototype Linked Feature = Function that allows an Object to inherit properties and methods from another object.

*/

//Example of a Literal Object 
var empty_object = {};

//Example of an Object with properties
var stooge = {
	"first-name":"Jhon"
	"last-name":"Smith"
}

//Retrieval
stooge["first-name"] == stooge.first-name; //true

//Update 
stooge.first-name = "Monica"; //Updates the property
stooge.age = 18 //Creates a new property an its added to stooge

//Reference 
//Objects are passed by reference, they are never copied. Just like a pointer in C-Languaje
var stooge2 = stooge;
stooge.first-name==stooge2.first-name; //true

//Filling default values with ||

var middle = stooge["middle-name"] || "none"; //stooge.middle-name doesnt exists, so var middle = "none"

//Prototype
//The prototype is an object tha calls the Prototype Linked Feature, this allow us to inherit mehots and properties from one object to other
//Object Literal inherits from Object.prototype that comes with JS..

//We can choose from which pbject are we going to inherit 
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
//Si el objeto creado no es una funcion, actualizamos la propiedad .create de Object.
//Object.create es actualizado con una nueva funcion que recibe un objeto del cual heredaremos.
var another_stooge = Object.create(stooge);
//another_stooge has all the properties of stooge just like first-name, etc.

//Prototype Chain and Delegation
//The Delegation its a process that uses de Prototype Chain, if we look for a property in an object and we can find it, JS will
//look for this prop in the object that we have as a prototype (del que heredamos), this will happens succesivily

//Function as a property value:
//If an object has a function in a property value we will invoke it with its name + (); 

var message = {"saludo":function(o){console.log(o)}};
message.saludo; //function(){...}
message.saludo("hola"); //hola en consola

//Reflection: The action of inspect an object to determine its properties, and examine the propo values
//type of operator retrieves the type of the prop value

typeof message.saludo; //function
typeof stooge.first-name; //String

message.hasOwnPropertiy('saludo'); //true -  hasOwnPropertiy('property name');

//Enumeration: Method that loops all the properties names in an object.
//Methods for enumeration for in( ) - random order, for() + array in order.
var names;
for(names in stooge){
	console.log(names +": = " stooge[names]);
}

var props_stooge = ['first-name','last-name'];
var i;
for(i=0; i<props_stooge.length; i++){
	console.log(stooge.props_stooge[i]);
}

//Delete: delete object.prop_name; Deletes a property from an object.

delete message.saludo;

/*
	FUNCTIONS
	Functions are a set of statements
	Functions are the fundamental modular unit in JS, they describe the behavior of an Object.
		-Code Reuse
		-Information Hiding 
		-Composition

	Functions are Objects, so they are linked to Function.prototype
	Objects has properties.
	Functions has two hidden properties:
	-context
	-behavior (content)

	It also has a prototype propertie.

	Since functions are Objects they can be stored in variables, they have methods, 
	they can be passed as arguments or they can be returned.

	Function Literal

	A function object is created by a function literal, it has four parts:
	1. reserved word 'function'
	2. function name (opcional) - if a function doesn´t have a name it is an anonymus function
	3. funtcion params -  They will be treat as variables and will be initialized at the moment of invocation.
	   If we send more params than expected JS will ignore them, how ever if we send less the missing params will be undefined.
	4. body {block}

	"The function object created by a function literal contains a link to its outer context". Closure definition
*/

var outer = 1;
function closure1(increment){
	var innner = 10;
	outer++;
	//We can acces outer because closure1() is linked to the outer context.
	return inner + outer;
}

//inner++; Causes an error because inner is inside closure1()

/*
	Invocation
	Passing the program control and parameters to a new function.

	THIS AND ARGUMENTS
	In addition to the normal params that any function recieves, it will receive two extra params:
	-this: The value of 'this' its determined by the invocation method that we use.
	-arguments

	We have four invocation pattern:
	1. Method Pattern.
	2. Function Pattern.
	3.Constructor Pattern.
	4. Apply Pattern.

*/