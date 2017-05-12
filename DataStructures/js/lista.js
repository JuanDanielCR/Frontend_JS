window.onload = function() {
	init();
};

function init(){
	//Variables
	var nodo =  null;
	var nodosDiv = [];
	//Elementos
	var btnNodo = document.getElementById("btnNodo");
	var AF = document.getElementById("AF");
	var AP = document.getElementById("AP");
	var txtPos = document.getElementById("txtPos");
	var btnPush = document.getElementById("btnPush");
	var btnPop  = document.getElementById("btnPop");
	var DelF = document.getElementById("DelF");
	var DelP = document.getElementById("DelP");
	var txtDPos = document.getElementById("txtDPos");
	var DelVn = document.getElementById("DelVn");
	var txtVn = document.getElementById("txtVn");
	var txtNodo = document.getElementById("txtNodo");
	var spanNodo = document.getElementById("nodoValue");
	var nodoElem = document.getElementById("nodoBase");
	var mensaje = document.getElementById("msjContainer");
	var stackContainer = document.getElementById("stackDiv");
	var imagen = document.getElementById("imageContainer");
	
//--------------------------------------------------------------------------
	//Crear Nodo
	btnNodo.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		var contenido = txtNodo.value;
		if(contenido == ""){
			mensaje.innerHTML="Ingresa el contenido del nodo";
			
			nodoBase.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}else{
			nodo = new Nodo(contenido);
			spanNodo.innerHTML = contenido;
			mensaje.innerHTML = "Nodo Creado"
			nodoBase.classList.add("acepta");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/CNo.png' class='big'>"
		}
	},false);
	//-----------------------------------------------------------------------
	//Agregar al inicio
	btnPush.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		if(nodo != null){
			nodosDiv.unshift(nodo);
			console.log(nodosDiv);
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
			imagen.innerHTML = "<img src='../images/Ainicio.png' class='big'>"
		}else{
			mensaje.innerHTML = "Primero crea un Nodo"
			nodoBase.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
	},false);

	//-----------------------------------------------------------------
	//Agregar Final
	AF.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		if(nodo != null){
			nodosDiv.push(nodo);
			console.log(nodosDiv);
		//actualizando la vista del nodo base
			spanNodo.innerHTML = "-";
			txtNodo.value = ""
		//actualizando el stack
			var innerStack = stackContainer.innerHTML;
			innerStack = innerStack + nodoVista.replace("{valor}",nodo.value) ;
			stackContainer.innerHTML = innerStack;
			mensaje.innerHTML = "Nodo Agregado"
		//devolviendo nodo a null
			nodo = null;
			stackContainer.classList.remove("derecha");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/AFinal.png' class='big'>"
		}else{
			
			mensaje.innerHTML = "Primero crea un Nodo"
			nodoBase.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
	},false);
	//------------------------------------------------------------------------
	//Agregar por posicion :'V
	AP.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		var pos = txtPos.value;
		var c;
		if(nodo != null){
			nodosDiv.splice(pos,0,nodo);
			console.log(nodosDiv);
			//actualizando la vista del nodo base
			spanNodo.innerHTML = "-";
			txtNodo.value = ""
		//actualizando el stack
			var nodos = stackContainer.childNodes;
			var aux = [0];
			console.log(nodos);

			var elem = document.createElement('div');
			elem.classList.add("nodoStack");
   			elem.innerHTML =nodito.replace("{valor}",nodo.value);
			stackContainer.insertBefore(elem, stackContainer.children[pos]);
			mensaje.innerHTML = "Nodo Agregado"
			console.log(nodos);
		//devolviendo nodo a null
			nodo = null;
			stackContainer.classList.remove("derecha");
			imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/APos.png' class='big'>"
		}
		else{
			mensaje.innerHTML="Ingresa posicion";
			txtPos.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
	},false);

	//------------------------------------------------------------------------
	//Eliminar primer nodo
	btnPop.addEventListener("click",function(){
		var value = nodosDiv.shift();
		console.log(nodosDiv);
		if(value == -1){
			//mensaje.innerHTML = "Array vacio";imagen.innerHTML = "<img src='../images/error.png'>"
			imagen.innerHTML = "<img src='../images/error.png'>"
		}else{
			//mensaje.innerHTML = "Eliminando a "+value;
			var hijo = stackContainer.firstChild;
			hijo.classList.add("pop");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		stackContainer.removeChild(hijo);
        		stackContainer.classList.add("fuera");
        	},1000);
        	stackContainer.classList.remove("fuera");
        	imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/Elp.png' class='big'>"
		}
	},false);
	//---------------------------------------------------------------------------
	//Eliminar ultimo nodo
	DelF.addEventListener("click",function(){
		var value = nodosDiv.pop();
		console.log(nodosDiv);
		if(value == -1){
			//mensaje.innerHTML = "La pila esta vacía";
			imagen.innerHTML = "<img src='../images/error.png'>"
		}else{
			//mensaje.innerHTML = "Pop a "+value;
			var hijo = stackContainer.lastChild;
			hijo.classList.add("pop");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		stackContainer.removeChild(hijo);
        		stackContainer.classList.add("fuera");
        	},1000);
        	stackContainer.classList.remove("fuera");
        imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/EUL.png' class='big'>"

		}
	},false);
	//--------------------------------------------------------------------------
	//Eliminar por posicion
DelP.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		var pos = txtDPos.value;
		if(pos == ""){
			mensaje.innerHTML="Ingresa posicion";
			txtDPos.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
		else{
			var hijo = stackContainer.children[pos];
			hijo.classList.add("pop");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		stackContainer.removeChild(hijo);
        		stackContainer.classList.add("fuera");
        	},1000);
        	stackContainer.removeChild(hijo);
        	stackContainer.classList.remove("fuera");
        	imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/APos.png' class='big'>"
		}
	},false);
	//--------------------------------------------------------------------------
	//Por valor 
	DelVn.addEventListener("click",function(){
		nodoBase.classList.remove("desaparecer");
		var index;
		var dato = txtVn.value;
		if(dato == ""){
			mensaje.innerHTML="Ingresa Valor";
			txtVn.classList.add("desaparecer");
			imagen.innerHTML = "<img src='../images/error.png'>"
		}
		else{
			var aux = nodosDiv.length
			for (var i =0; i<aux; i++) {
				if (nodosDiv[i].value==dato) {
					console.log("for i:"+i)
					index = i;
					break;
				}
				else{
					mensaje.innerHTML="Valor no encontrado";
				}
			}
			console.log("dato:" +dato+"I:"+index);
			nodosDiv.splice(index,1);
			console.log(nodosDiv);
			var hijo = stackContainer.firstChild;
			hijo.classList.add("pop");
			hijo.classList.add("izquierda");
			setTimeout(function(){
        		stackContainer.removeChild(hijo);
        		stackContainer.classList.add("fuera");
        	},1000);
        	stackContainer.classList.remove("fuera");
        	imagen.innerHTML = "";
			imagen.innerHTML = "<img src='../images/BVa.png' class='big'>"
		}
	},false);
	//------------------------------------------------------------------------
	//VISTA
	var nodoVista = "<div class='nodoStack'><div class='content'><h4>Nodo</h4><p>{valor}<br><p></div><div class='arrow'>-</div></div>";
	var nodito = "<div class='content'><h4>Nodo</h4><p>{valor}<br><p></div><div class='arrow'>-</div>";
	
}
//Clase Nodo
function Nodo(val){
	this.value = val;
	this.next = null;
}