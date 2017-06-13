jQuery(document).ready(function(){
	
	/*Botones*/
	var btnGuardar = jQuery("#btnGuardar");
	var btnCodigo = jQuery("#btnCodigo");
	var btnCargar = jQuery("#btnCargar");
	var divCodigo = jQuery("#codigoContainer");
	/* Usando $ como contexto: go.GraphObject.make */
	var $ = go.GraphObject.make;
	
	/*Creando nuestro diagrama y agregando propiedades*/
	var diagrama = $(go.Diagram,"diagramContainer",{
		initialContentAlignment: go.Spot.Center, //Centrar el contenido del diagrama vertical y horizontalmente
      	allowDrop: true, //Permite hacer drag & drop de las figuras así como modificar información con la pallete
      	"undoManager.isEnabled": true,  // enable Ctrl-Z to undo and Ctrl-Y to redo
      	"LinkDrawn" : showLinkLabel,    //Listener of the Diagram
      	"LinkRelinked": showLinkLabel //Listener of the Diagram
	});
	/*Make labels visible if they come from a conditional*/
	function showLinkLabel(e){
		var label = e.subject.findObject("LABEL");
	    if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
	}
	/*Agregando Listener a un Diagrama*/
	diagrama.addDiagramListener("Modified",function(e){
		var isModified = diagrama.isModified;
		btnGuardar.prop('disabled', !isModified);
	});
	
	/*Funcion para establecer algunas propiedades del estilo de un nodo*/
	function nodeStyle() {
      return [
        //Coordenadas del centro del nodo
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
          isShadowed: false,
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function (e, obj) { showPorts(obj.part, true); },
          mouseLeave: function (e, obj) { showPorts(obj.part, false); }
        }
      ];
    }
	
	/*Funcion para los circulos del resize de un nodo en el mouseEnter/Leave*/
	function showPorts(node, show) {
	  var diagram = node.diagram;
	  if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
	  node.ports.each(function(port) {
		  port.stroke = (show ? "white" : null);
	  });
	}
	
	/*Funcion para crear los puntos de conexion entre nodos*/
	function makePort(name, spot, output, input) {
	// the port is basically just a small circle that has a white stroke when it is made visible
		return $(go.Shape, "Circle",
			{
				fill: "transparent",
	            stroke: null,  // this is changed to "white" in the showPorts function
	            desiredSize: new go.Size(8, 8),
	            alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
	            portId: name,  // declare this object to be a "port"
	            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
	            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
	            cursor: "pointer"  // show a different cursor to indicate potential link point
			});
	    }
	/*Definiendo los Templates para los nodos haciendo uso de sus propiedades
	 * y de las funciones previamente declaradas makePort(), nodeStyle()*/
	
	//Nodo de inicio
	diagrama.nodeTemplateMap.add("Inicio",
		$(go.Node, "Spot", nodeStyle(),
		// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
		$(go.Panel, "Auto",
		$(go.Shape, "Terminator", new go.Binding("stroke","colorStroke"),new go.Binding("fill","color")),
		$(go.TextBlock,{ 
			font: "bold 11pt Helvetica, Arial, sans-serif", 
			stroke: "whitesmoke", 
			margin: 8,  
			maxSize: new go.Size(160, NaN), 
			wrap: go.TextBlock.WrapFit, 
			editable: true 
			},
		new go.Binding("text")
			)),
		makePort("L", go.Spot.Left, true, false), 
		makePort("R", go.Spot.Right, true, false),
		makePort("B", go.Spot.Bottom, true, false)
		)
	);
	//Nodo de termino
	diagrama.nodeTemplateMap.add("Fin",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Terminator",new go.Binding("stroke","colorStroke"),new go.Binding("fill","color")),
			$(go.TextBlock,{
				font: "bold 11pt Helvetica, Arial, sans-serif", 
				stroke: "whitesmoke",
				margin: 8,  
				maxSize: new go.Size(160, NaN), 
				wrap: go.TextBlock.WrapFit, 
				editable: true 
			},			
			new go.Binding("text").makeTwoWay())),
			makePort("T", go.Spot.Top, false, true), 
			makePort("L", go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, false, true)
		)
	);

	//Nodo de Sentencia Simple
	diagrama.nodeTemplateMap.add("",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Rectangle", new go.Binding("stroke","colorStroke"),new go.Binding("fill","color")
			,new go.Binding("figure", "figure")),
			$(go.TextBlock,{ 
				font: "bold 11pt Helvetica, Arial, sans-serif", 
				stroke:"whitesmoke", 
				margin: 8,  
				maxSize: new go.Size(160, NaN), 
				wrap: go.TextBlock.WrapFit, 
				editable: true 
			},
			new go.Binding("text"))),
			makePort("T", go.Spot.Top, false, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false)
		)
	);
	
	//Nodo de Declaración de variable - CreateRequest
	//Nodo de Entrada de Datos - Document
	//Nodo de Salida de Datos - Card
	//Nodo Condicional - Diamond
	
	/*Creación del menu contenedor de Elementos*/
	 myPalette =
	      $(go.Palette, "paletteContainer",  // must name or refer to the DIV HTML element
	        {
	          "animationManager.duration": 800, // slightly longer than default (600ms) animation
	          nodeTemplateMap: diagrama.nodeTemplateMap,  // share the templates used by myDiagram
	          model: new go.GraphLinksModel([  // specify the contents of the Palette
	            { category: "Inicio", text: "Inicio", color: "#9ffea0" ,colorStroke:"#9ffea0"},
	            { figure: "Diamond", text: "<??>",  color: "#E0C879" ,colorStroke:"brown"},
	            { category: "Fin", text: "Fin", color: "#A37A74" ,colorStroke:"#A37A74"},
	            { figure: "Rectangle", text: "<Instrucción>", color: "#E0C879" ,colorStroke:"brown"},
	            { figure: "CreateRequest", text:"<Variable>", color: "#E0C879" ,colorStroke:"brown"},
	            { figure: "Document", text:"<Entrada>", color: "#E0C879" ,colorStroke:"brown"},
	            { figure: "Card", text:"<Salida>",  color: "#E0C879" ,colorStroke:"brown"}
	          ])
	        });
	 
	/*Creando a la arista de conexión */
	diagrama.linkTemplate =
	      $(go.Link,  // the whole link panel
	        {
	          routing: go.Link.AvoidsNodes,
	          curve: go.Link.JumpOver,
	          corner: 5, toShortLength: 4,
	          relinkableFrom: true,
	          relinkableTo: true,
	          reshapable: true,
	          resegmentable: true,
	          // mouse-overs subtly highlight links:
	          mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
	          mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
	        },
	        new go.Binding("points").makeTwoWay(),
	        $(go.Shape,  // the highlight shape, normally transparent
	          { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
	        $(go.Shape,  // the link path shape
	          { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
	        $(go.Shape,  // the arrowhead
	          { toArrow: "standard", stroke: null, fill: "gray"}),
	        $(go.Panel, "Auto",  // the link label, normally not visible
	          { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
	          new go.Binding("visible", "visible").makeTwoWay(),
	          $(go.Shape, "RoundedRectangle",  // the label shape
	            { fill: "#F8F8F8", stroke: null }),
	          $(go.TextBlock, "true",  // the label
	            {
	              textAlign: "center",
	              font: "10pt helvetica, arial, sans-serif",
	              stroke: "#333333",
	              editable: true
	            },
	            new go.Binding("text").makeTwoWay())
	        )
	      );
	 
	/*Construir el Diagrama de acuerdo a un json inicial*/
	 diagrama.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
	 diagrama.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
	load(true);  // load an initial diagram from some JSON text
	 

	/*Evitar scroll cuando alguna acción se realize en la paleta o el diagrama*/
	 function customFocus() {
	      var x = window.scrollX || window.pageXOffset;
	      var y = window.scrollY || window.pageYOffset;
	      go.Diagram.prototype.doFocus.call(this);
	      window.scrollTo(x, y);
	    }

	    diagrama.doFocus = customFocus;
	    myPalette.doFocus = customFocus;
	/*Funciones para guardar y cargar un Diagrama*/
	function save(){
		/*Creación del JSON*/
		//var code = generarCodigo();
		var finalJSON = {
			diagrama: diagrama.model.toJson()
			//nombre: code
		};
		console.log(finalJSON);
		//console.log(code);
		
		/*Peticion Ajax*/
		jQuery.ajax({
			method: "POST",
			url: "/diagrama",
			data: { contenido:  diagrama.model.toJson(), nombre: "prueba.json"}
		}).done(function( msg ) {
			alert( "Ajax");
		});
	}
	
	function load(isFirst){
		var json ="";
		if(isFirst==true){
			json = { "class": "go.GraphLinksModel",
					  "linkFromPortIdProperty": "fromPort",
					  "linkToPortIdProperty": "toPort",
					  "nodeDataArray": [],
					  "linkDataArray": []
				}
			jQuery.ajax({
				method: "GET",
				url: "/diagrama",
				data: {nombre: "prueba.json" },
				success: function(data){
					console.log(data);
					json = data;
					diagrama.model = go.Model.fromJson(json);
				}
			})
			console.log("Primero");
			return;
		}
		else{
			jQuery.ajax({
				method: "GET",
				url: "/diagrama",
				data: {nombre: "prueba.json" },
				success: function(data){
					console.log(data);
					json = data;
					diagrama.model = go.Model.fromJson(json);
				}
			})
		}
	}
	
	/*Agregando snippet para cambiar color en el diagrama*/
    /*Contenedor para la pallete*/
    var inspector = new Inspector('myInspectorDiv', diagrama,
    	{
    	// uncomment this line to only inspect the named properties below instead of all properties on each object:
    	// includesOwnProperties: false,
    	properties: {
    		"text": {},
    	    // color would be automatically added for nodes, but we want to declare it a color also:
    	    "color": { show: Inspector.showIfPresent, type: 'color' },
    	    "colorStroke":{show: Inspector.showIfPresent, type: 'color'},
    	    "LinkComments": { show: Inspector.showIfLink },
    	    }
    	});
    btnGuardar.on("click",function(){ save() });
	btnCargar.on("click",function(){ load(false) });
	
	btnCodigo.on("click",function(){
		var codigo = generarCodigo(diagrama);
		divCodigo.append(codigo);
	})
	
})

/*Generar código*/
function generarCodigo(diagrama){
	
	/*objetos para obtener el codigo*/
	var objetoDiagrama = diagrama.model;
	var nodos =  objetoDiagrama.nodeDataArray;
	var relaciones = objetoDiagrama.linkDataArray;
	/*Variables para el analisis*/
	var ifs = [];
	var elses = [];
	var fors = [];
	var nodosActuales = []
	var keys = [];
	var variables = [];
	var hasNext = true;
	var codigoGenerado = "#include 'stdlib.h' <br> #include'stdio.h' <br> main(){<br>";
	
	//El nodo de inicio siempre tiene el key -1
	var nodoActual = nodos[nodoInicial(nodos)];
	keys.push(-1);
	
	while(nodoActual.category != "Fin" ){
		nodoActual = nodos[nodoSiguiente(nodos,relaciones,keys)];
		//agregamos la llave, del ultimo nodo del camino principal
		keys.push(nodoActual.key);
		
		if(nodoActual.figure == "Rectangle"){
			codigoGenerado = codigoGenerado + "<br>" + nodoActual.text;
		}else if(nodoActual.figure == "CreateRequest"){
			codigoGenerado = codigoGenerado + "<br>" + analizarVariable(nodoActual.text,variables,nodoActual.key);
		}else if(nodoActual.figure == "Document"){
			//scanf() ver que variable desea escanear
			var k;
			for(k = 0; k < variables.length; k++){
				if(variables[k].nombre == nodoActual.text){
					codigoGenerado = codigoGenerado + "<br>" + analizarEntrada(variables[k]);
				}else{
					codigoGenerado = codigoGenerado + "Error: Not variable found"
				}
			}
			
		}else if(nodoActual.figure == "Card"){
			codigoGenerado = codigoGenerado + "<br>" + analizarSalida(nodoActual.text);
		}//Si se tiene un if() o un for() hacemos un push de la llave del nodo que nos permite salir del ciclo para continuar ahi
		else if(nodoActual == "Diamond"){
			
		}
	}
	
	codigoGenerado = codigoGenerado + "<br> return 0; <br> }";
	console.log(codigoGenerado)
	return codigoGenerado;
}
/*Obtener primer nodo*/
function nodoInicial(nodos){
	var i;
	console.log(nodos[0]);
	for(i=0; i <nodos.length; i++){
		if(nodos[i].category=="Inicio"){
			return i;
		}
	}
}
/*Obtener siguiente nodo*/
function nodoSiguiente(nodos, relaciones, keys){
	var caminos = [];
	//ver de donde viene
	var i;
	for(i=0; i <relaciones.length; i++){
		if(relaciones[i].from==keys[keys.length-1]){
			var keyActual = relaciones[i].to;
			//obtener el indice de ese nodo
			var j;
			for(j=0; j <nodos.length; j++){
				if(nodos[j].key==keyActual){
					caminos.push(j);
				}
			}
		}
	}
	return caminos;
}
/*Analisis de una asignación de variable*/
function analizarVariable(contenido, stackVariables, key){
	var sentencia = "";
	var objetoVariable = {};
	var arreglo_aux = contenido.split("=");
	//Analisis del tipo de variable para Lenguaje C
	if(!isNaN(arreglo_aux[1])){ //Numero
		var numero = arreglo_aux[1].split(".");
		if(numero.length == 1){//int o float
			sentencia = sentencia + "int ";
			objetoVariable.tipo = "int"
		}else{//float
			sentencia = sentencia + "float ";
			objetoVariable.tipo = "float"
		}
	}else{ //Caracter o arreglo de caracteres
		if((c.length-2)==1){ //Menos 2 por las ''
			sentencia = sentencia + "char ";
			objetoVariable.tipo = "char"
		}else{
			sentencia = sentencia +"char["+(c.length-2)+"] ";
			objetoVariable.tipo = "char[]"
		}
	}
	objetoVariable.nombre = arreglo_aux[0];
	objetoVariable.keys = key;
	stackVariables.push(objetoVariable);
	sentencia = sentencia + arreglo_aux[0] +" = "+ arreglo_aux[1]+";";
	return sentencia;
}
/*Analisis salida de una variable*/
function analizarSalida(contenido){
	var sentencia = "<br>printf(\""+contenido+"\");";
	return sentencia;
}
/*Analisis entrada de una variable*/
function analizarEntrada(variable){
	var sentencia = "<br> scanf(";
	if(variable.tipo=="int"){
		sentencia = sentencia + "'%d',";
	}else if(variable.tipo=="float"){
		sentencia = sentencia + "'%f',";
	}else{
		sentencia = sentencia + "'%c',";
	}
	
	sentencia = sentencia + " &"+variable.nombre;
	sentencia = sentencia + ");";
	return sentencia;
}
/*Analizando si es un ciclo o un if*/
function analizarDiamante(){
	
}

/*
 * 
 * Stack variables
	var variables = [];
	var keys = [];
	var caminos = [];
	var nodosActuales = [];


keys.push(-1);
	caminos.push(keys);
	//var nodosUsados = []; usados para los if y for, si su llave ya esta aqui cerramos
	//Llenar array con los keys secuencialmente
	while(nodoActual.category != "Fin" ){
		var caminosActual = nodoSiguiente(nodos,relaciones,keys);;
		if(caminosActual.length > 1){
			//es un if o un for creamos un nuevo camino con caminosActual[1] y un nuevo nodo actual
			var aux = new Array();
			caminos.push(aux);
		}
		//llenamos nuestros nodosActuales para cada camino
		var i;
		for(i=0; i< caminos.length; i++){
			caminos[i].push(nodos[caminosActual[i]])
		}
		//nodoActual = nodos[];
		//keys.push(nodoActual.key);
	}
	
	console.log(caminos)
	console.log(keys)
	//Recorrer las keys ya ordenadas
	var i;
	for(i = 1; i < keys.length-1; i++){ //Emepzamos en 1 y terminamos uno antes por los nodos de inicio y fin
		var j;
		for(j=0; j < nodos.length; j++){
			if(nodos[j].key == keys[i]){
				//Ver que tipo de nodo es con el figure
				if(nodos[j].figure == "Rectangle"){
					codigoGenerado = codigoGenerado + "<br>" + nodos[j].text;
				}else if(nodos[j].figure == "CreateRequest"){
					codigoGenerado = codigoGenerado + "<br>" + analizarVariable(nodos[j].text,variables,keys[i]);
				}else if(nodos[j].figure == "Document"){
					//scanf() ver que variable desea escanear
					var k;
					for(k = 0; k < variables.length; k++){
						if(variables[k].nombre == nodos[j].text){
							codigoGenerado = codigoGenerado + "<br>" + analizarEntrada(variables[k]);
						}else{
							codigoGenerado = codigoGenerado + "Error: Not variable found"
						}
					}
					
				}else if(nodos[j].figure == "Card"){
					codigoGenerado = codigoGenerado + "<br>" + analizarSalida(nodos[j].text);
				}else if(nodos[j].figure == "Diamond"){
					
				}
			}
		}
	}
 * 
 */