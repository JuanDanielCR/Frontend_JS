jQuery(document).ready(function(){
	/* Using $ as an abbreviation for go.GraphObject.make */
	var $ = go.GraphObject.make;
	
	/*	go - namespace para el diagrama de GOJS, todas las clases de GOJS
			 usarán este prefijo 
	*/
	var diagrama = $(go.Diagram,"diagramContainer",{
		initialContentAlignment: go.Spot.Center, // center Diagram contents
      	"undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
	});

	/*----STYLES TO NODES------
	Nodes are styled by creating templates consisting of GraphObjects.
	Graph Object Classes:
		Shape, to display pre-defined or custom geometry with colors
		TextBlock, to display (potentially editable) text in various fonts
		Picture, to display images
		Panel, containers to hold a collection of other objects that can be positioned and sized in different manners according to the type of the Panel (like tables, vertical stacks, and stretching containers)
	*/
	diagrama.nodeTemplate =
  	$(go.Node, "Horizontal", { background: "#44CCFF" },
    	$(go.Picture,{ margin: 10, width: 50, height: 50},new go.Binding("background"), new go.Binding("source")),
      	// Pictures should normally have an explicit width and height.
      	// This picture has a red background, only visible when there is no source set
      	// or when the image is partially transparent.
      	// Picture.source is data bound to the "source" attribute of the model data
    	$(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },new go.Binding("text"))
  	);

  	/*----STYLES TO LINKS------
		
  	*/
  	diagrama.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, $(go.Shape, { strokeWidth: 3, stroke: "#555" }) );

  	/*----DIAGRAMS AND MODELS-----
	The Nodes and Links of a Diagram are visualizations of data that is managed by a Model.
	Tipos de modelo:
		1. data
		2. link
	*/
	var modelo = $(go.GraphLinksModel);
	modelo.nodeDataArray = [{key:"A",background:"green", text:"me"},{key:"B", background:"red", text:"la"},{key:"C", background:"blue", text:"pelas"}];
	modelo.linkDataArray = [{from: "A", to: "B"},{from: "A", to: "C"}];

	diagrama.model = modelo;
	$.ajax({
	  method: "POST",
	  url: "/prueba",
	  data: { name: "John", location: "Boston" }
	})
	  .done(function( msg ) {
	    alert( "Data Saved: " + msg );
	  });
})