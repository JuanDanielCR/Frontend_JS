//Variables
var btnEnviar =  document.getElementById("btnEnviar");
var formElements = document.forms[0].elements

btnEnviar.addEventListener("click",function(event){
	event.preventDefault();
  	//Obtener cada elemento del formulario
	 	for(var i = 0; i <formElements.length;i++){
	 		var tag = formElements[i].tagName.toLowerCase();
	 		if( tag == "input"){
	 			if(formElements[i].type == "text"){
	 				document.cookie = formElements[i].id +"="+ formElements[i].value;
	 			}else if(formElements[i].type == "checkbox"){

	 			}else if(formElements[i].type == "radio"){
		 			var radios = document.getElementsByName("rdEscuela");
		 			for (var item of radios) {
		 				if(item.checked){
		 					document.cookie = formElements[i].name +"="+ item.value;
		 				}				  
					}
	 			}
	 		}else if(tag == "select"){
	 			var select = formElements[i];
	 			var indice = select.selectedIndex;
	 			var valor = select.options[indice].value;
	 			document.cookie = formElements[i].id +"="+ valor;
	 		}else if(tag =="textarea"){
	 			document.cookie = formElements[i].id +"="+ formElements[i].value;
	 		}
	 	}
	 	console.log(document.cookie);
});
