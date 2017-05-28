jQuery(document).ready(function(){
	
	/*Botones*/
	var btnGuardar = jQuery("#btnGuardar");
	var btnCodigo = jQuery("#btnCodigo");
	
	/* Usando $ como contexto: go.GraphObject.make */
	var $ = go.GraphObject.make;
	
	/*Creando nuestro diagrama y agregando propiedades*/
	var diagrama = $(go.Diagram,"diagramContainer",{
		initialContentAlignment: go.Spot.Center, //Centrar el contenido del diagrama vertical y horizontalmente
      	allowDrop: true, //Permite hacer drag & drop de las figuras
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
		$(go.Shape, "Terminator", { fill: "#9ffea0", stroke:"#9ffea0" }, new go.Binding("figure", "figure")),
		$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
		new go.Binding("text").makeTwoWay())),
		// four named ports, one on each side:
		makePort("T", go.Spot.Top, false, true), //Habilitado para salir pero no para llegar
		makePort("L", go.Spot.Left, true, true), //Habilitado para salir y llegar
		makePort("R", go.Spot.Right, true, true),
		makePort("B", go.Spot.Bottom, true, false)
		)
	);
	//Nodo de termino
	diagrama.nodeTemplateMap.add("Fin",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Terminator", { fill: "#A37A74", stroke:"#A37A74" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, false, true), //Habilitado solo para llegada
			makePort("L", go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, false, true)
		)
	);

	//Nodo de Sentencia Simple
	diagrama.nodeTemplateMap.add("Simple",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Rectangle", { fill: "#E0C879", stroke:"#E0C879" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke:"whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)
		)
	);
	
	//Nodo de Declaración de variable
	diagrama.nodeTemplateMap.add("Variable",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "CreateRequest", { fill: "#7180AC", stroke:"#2B4570" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)
		)
	);
	
	//Nodo de Entrada de Datos
	diagrama.nodeTemplateMap.add("Entrada",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Document", { fill: "#E49273", stroke:"#E49273" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)
		)
	);
	//Nodo de Salida de Datos
	diagrama.nodeTemplateMap.add("Salida",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Card", { fill: "#5FB49C", stroke:"#5FB49C" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)
		)
	);
	
	//Nodo de Salida de Datos
	diagrama.nodeTemplateMap.add("Condicional",
			$(go.Node, "Spot", nodeStyle(),
			// the main object is a Panel that surrounds a TextBlock with a rectangular Shape
			$(go.Panel, "Auto",
			$(go.Shape, "Diamond", { fill: "#5FB49C", stroke:"#5FB49C" }, new go.Binding("figure", "figure")),
			$(go.TextBlock,{ font: "bold 11pt Helvetica, Arial, sans-serif", stroke: "whitesmoke", margin: 8,  maxSize: new go.Size(160, NaN), wrap: go.TextBlock.WrapFit, editable: true },
			new go.Binding("text").makeTwoWay())),
			// four named ports, one on each side:
			makePort("T", go.Spot.Top, true, true), 
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, true)
		)
	);
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
	          $(go.TextBlock, "Yes",  // the label
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
	// load();  // load an initial diagram from some JSON text
	 
	/*Creación del menu contenedor de Elementos*/
	 myPalette =
	      $(go.Palette, "paletteContainer",  // must name or refer to the DIV HTML element
	        {
	          "animationManager.duration": 800, // slightly longer than default (600ms) animation
	          nodeTemplateMap: diagrama.nodeTemplateMap,  // share the templates used by myDiagram
	          model: new go.GraphLinksModel([  // specify the contents of the Palette
	            { category: "Inicio", text: "Inicio" },
	            { category: "Condicional", text: "<??>" },
	            { category: "Fin", text: "Fin" },
	            { category: "Simple", text: "<Instrucción>" },
	            { category: "Variable", text:"<Variable>"},
	            { category: "Entrada", text:"<Entrada>"},
	            { category: "Salida", text:"<Salida>"}
	          ])
	        });
	/*Evitar scroll cuando alguna acción se realize en la paleta o el diagrama*/
	 function customFocus() {
	      var x = window.scrollX || window.pageXOffset;
	      var y = window.scrollY || window.pageYOffset;
	      go.Diagram.prototype.doFocus.call(this);
	      window.scrollTo(x, y);
	    }

	    myDiagram.doFocus = customFocus;
	    myPalette.doFocus = customFocus;
	/*Funciones para guardar y cargar un Diagrama*/

	  
	
	var modelo = $(go.GraphLinksModel);
	modelo.nodeDataArray = [{key:"A",background:"green", text:"me"},{key:"B", background:"red", text:"la"},{key:"C", background:"blue", text:"pelas"}];
	modelo.linkDataArray = [{from: "A", to: "B"},{from: "A", to: "C"}];

	diagrama.model = modelo;
	
	
	/*Logica de Negocio*/
	jQuery.ajax({
	  method: "POST",
	  url: "/prueba",
	  data: { name: "John", location: "Boston" }
	}).done(function( msg ) {
	    alert( "Ajax");
	  });
})