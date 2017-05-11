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
	var spanNodo = document.getElementById("nodoValue");
	var nodoElem = document.getElementById("nodoBase");
	var mensaje = document.getElementById("msjContainer");
	var imagen = document.getElementById("imageContainer");
	var stackContainer = document.getElementById("stackDiv");
	//Crear Nodo
	btnNodo.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		nodoBase.classList.remove("acepta");
		var contenido = txtNodo.value;
		if(contenido == ""){
			mensaje.innerHTML="Ingresa el contenido del nodo";
			//alert("Ingresa el valor");
			nodoBase.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}else{
			nodo = new Nodo(contenido);
			spanNodo.innerHTML = contenido;
			mensaje.innerHTML = "Nodo Creado"
			nodoBase.classList.add("acepta");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/crear_nodo.png' class='big'>"
		}
	},false);
	//push 
	btnPush.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		if(nodo != null){
			stack.push(nodo);
		//actualizando la vista del nodo base
			spanNodo.innerHTML = "-";
			txtNodo.value = ""
		//actualizando el stack
        	var innerStack = stackContainer.innerHTML;
			innerStack = nodoVista.replace("{valor}",nodo.value) + innerStack;
			stackContainer.innerHTML = innerStack;
			mensaje.innerHTML = "Nodo Agregado"
		//devolviendo nodo a null
			nodo = null;
			stackContainer.classList.remove("derecha");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/push.png' class='big'>"
		}else{
			//alert("Crea un nodo");
			mensaje.innerHTML = "Primero crea un Nodo"
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
	},false);
	//pop
	btnPop.addEventListener("click",function(){
		var value = stack.pop();
		if(value == -1){
			mensaje.innerHTML = "La pila esta vacía";
			imagen.innerHTML = "<img src='../images/error.png'>"
		}else{
			mensaje.innerHTML = "Pop a "+value;
			var hijo = stackContainer.firstChild;
			hijo.classList.add("pop");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		stackContainer.removeChild(hijo);
        		stackContainer.classList.add("fuera");
        	},1000);
        	stackContainer.classList.remove("fuera");
        	imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/pop.png' class='big'>"
		}
	},false);
	//Creando una pila
	stack =  new Stack(0);
	
	//VISTA
	var nodoVista = "<div class='nodoStack'><div class='content'><h4>Nodo</h4><p>{valor}<br><p></div><div class='arrow'>-</div></div>";

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
	if(this.isEmpty() == true){
		this.first = nodo;
	}else{
		var old = this.first;
		this.first = nodo;
		nodo.next = old;
		this.size++;
	}
};
//pop
Stack.prototype.pop = function() {
	if(this.isEmpty() != true){
		var nodo = this.first;
		this.first = nodo.next;
		this.size--;
		return nodo.value;
	}else{
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