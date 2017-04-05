//Variables
var btnEnviar =  document.getElementById("btnEnviar");
var formElements = document.forms[0].elements
rellenarFormulario();
btnEnviar.addEventListener("click",function(event){
	event.preventDefault();
  	//Obtener cada elemento del formulario
	 	for(var i = 0; i <formElements.length;i++){
	 		var tag = formElements[i].tagName.toLowerCase();
	 		if( tag == "input"){
	 			if(formElements[i].type == "text"){
	 				document.cookie = formElements[i].id +"="+ formElements[i].value;
	 			}else if(formElements[i].type == "checkbox"){
	 				if(formElements[i].checked){
	 					document.cookie = formElements[i].id +"="+ formElements[i].value;
	 				}else{
	 					document.cookie = formElements[i].id +"="+ formElements[i].value+";expires=Thu, 01 Jan 1970 00:00:01 GMT"
	 				}
	 			}else if(formElements[i].type == "radio"){
		 			var radios = document.getElementsByName("rdEscuela");
		 			for (var item of radios) 
		 				if(item.checked)
		 					document.cookie = formElements[i].id +"="+ item.value;
	 			}
	 		}else if(tag == "select"){
	 			var select = formElements[i];
	 			var indice = select.selectedIndex;
	 			if(indice >= 0){
	 				var valor = select.options[indice].value;
	 				document.cookie = formElements[i].id +"="+ valor;
	 			}
	 		}else if(tag =="textarea"){
	 			document.cookie = formElements[i].id +"="+ formElements[i].value;
	 		}
	 	}
});
function rellenarFormulario(){
	var elementosForm = (document.cookie).split(";");
	for(var i = 0; i < elementosForm.length; i++){
		var elementoIndividual = elementosForm[i].split("=");
		var id = elementoIndividual[0];
		id = formato(id);
		var elementoDOM = document.getElementById(id);
		if(elementoDOM!=null){
			if(elementoDOM.type == "text"){
				elementoDOM.value = elementoIndividual[1];
			}else if(elementoDOM.tagName.toLowerCase() == "select" || elementoDOM.tagName.toLowerCase() == "textarea"){
				elementoDOM.value = elementoIndividual[1];
			}else if(elementoDOM.name == "rdEscuela"){
				if(elementoDOM.value == elementoIndividual[1])
					elementoDOM.checked = true;
			}if(elementoDOM.type == "checkbox"){
				elementoDOM.checked =  true;
			}
		}

	}
}
function formato(texto){
	var id = "";
	for(var i = 0; i< texto.length; i++)
		if(texto[i] != ' ')
			id += texto[i];
	return id;
}