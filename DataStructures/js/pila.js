window.onload = function() {
	init();
};

function init(){
	//Variables
	var nodo =  null;
	var stack;
	//Elementos
	var btnNodo = document.getElementById("btnNodo");
	var btnPush = document.getElementById("btnPush");
	var btnPop  = document.getElementById("btnPop");
	var txtNodo = document.getElementById("txtNodo");
	//Crear Nodo
	btnNodo.addEventListener("click",function(){
		var contenido = txtNodo.value;
		nodo = new Nodo(contenido);
		console.log(nodo)
	},false);
	//push 
	btnPush.addEventListener("click",function(){
		if(nodo != null){
			stack.push(nodo);
			console.log("Pushing: "+nodo.value);
			nodo = null;
		}else{
			alert("Primero crea un nodo");
		}
	},false);
	//pop
	btnPop.addEventListener("click",function(){
		console.log("Sz: "+stack.getSize());
		var value = stack.pop();
		console.log("Salio: "+value)
		console.log("Sz: "+stack.getSize());
	},false);
	//Creando una pila
	stack =  new Stack(0);
	
	//VISTA
	
}

//Clase Pila
function Stack(sz){
	this.size = sz;
	this.first = null;
}
//isEmpty
Stack.prototype.isEmpty = function() {
	return this.first == null;
};
//push
Stack.prototype.push = function(nodo) {
	var old = this.first;
	this.first = nodo;
	nodo.next = old;
	this.size++;

};
//pop
Stack.prototype.pop = function() {
	if(this.isEmpty() != true){
		var nodo = this.first;
		this.first = nodo.next;
		this.size--;
		return nodo.value;
	}else{
		alert("Pila vacia");
		return -1;
	}
};
//size
Stack.prototype.getSize = function(first_argument) {
	return this.size;
};
//Clase Nodo
function Nodo(val){
	this.value = val;
	this.next = null;
}