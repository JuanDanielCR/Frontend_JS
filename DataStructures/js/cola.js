window.onload = function() {
	init();
};

function init(){
	//Variables
	var nodo =  null;
	var queue;
	//Elementos
	var btnNodo = document.getElementById("btnNodo");
	var btnFormarse = document.getElementById("btnFormarse");
	var btnDesformarse  = document.getElementById("btnDesformarse");
	var txtNodo = document.getElementById("txtNodo");
	var spanNodo = document.getElementById("nodoValue");
	var nodoElem = document.getElementById("nodoBase");
	var mensaje = document.getElementById("msjContainer");
	var queueContainer = document.getElementById("queueDiv");
	var imagen = document.getElementById("imageContainer");

	//Crear Nodo
	btnNodo.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
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
			//imagen del codigo en C
			nodoBase.classList.add("acepta");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/crear_nodoQ.png' class='big'>"
		}
	},false);
	//formarse
	btnFormarse.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		if(nodo != null){
			queue.formarse(nodo);
		//actualizando la vista del nodo base
			spanNodo.innerHTML = "-";
			txtNodo.value = ""
		//actualizando la cola
			queueContainer.innerHTML+=nodoVista.replace("{valor}",nodo.value);
			mensaje.innerHTML = "Nodo Agregado"
		//devolviendo nodo a null
			nodo = null;
			//Imagen 
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/formarse.png' class='big'>"
		}else{
			//alert("Crea un nodo");
			mensaje.innerHTML = "Primero crea un Nodo"
			nodoBase.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
	},false);
	//desformarse
	btnDesformarse.addEventListener("click",function(){
		var value = queue.desformarse();
		if(value == -1){
			mensaje.innerHTML = "La pila esta vacía";
		}else{
			mensaje.innerHTML = "Se desformo un "+value;
			var hijo = queueContainer.firstChild;
			hijo.classList.add("desformarse");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		queueContainer.removeChild(hijo);
        		queueContainer.classList.add("fuera");
        	},1000);
        	queueContainer.classList.remove("fuera");

        	//Imagen del codigo
        	imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/desformarse.png' class='big'>"
		}
	},false);
	//Creando una pila
	queue =  new Queue(0);
	
	//VISTA
	var nodoVista = "<div class='nodoQueue'><div class='content'><h4>Nodo</h4><p>{valor}<br><p></div><div class='arrow'>-</div></div>";

}

//Clase Cola
function Queue(siz){
	this.size = siz;
	this.first = null;
	this.ultimo = null;
}
//isEmpty
Queue.prototype.isEmpty = function() {
	return this.first == null;
};
//Formarse
Queue.prototype.formarse = function(nodo) {
	if(this.size == 0){
		this.first = nodo;
		this.ultimo =nodo;
		this.size++;
	}else{
		var last = this.ultimo;
		last.next = nodo;
		this.ultimo = nodo;
		this.size++;
	}
};
//Desformarse
Queue.prototype.desformarse = function() {
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
Queue.prototype.getSize = function(first_argument) {
	return this.size;
};
//Clase Nodo
function Nodo(valor){
	this.value = valor;
	this.next = null;
}