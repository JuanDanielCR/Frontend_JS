<!DOCTYPE html>
<head>
	<meta charset="utf8">
	<meta charset="utf-8"/>
    <meta name="description" content="Sistema de administración de archivos para empresas"/>
	<meta name="author" content="Juan Daniel Castillo Reyes" />
	<meta name="robots" content="all"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<title>Go JS</title>
	<script src="/js/jquery.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
	<script src="release/go.js"></script>
	<script src="js/dataInspector.js"></script>
	<script src="assets/js/goSamples.js"></script>
	<link rel="stylesheet" type="text/css" href="https://bootswatch.com/lumen/bootstrap.min.css"/>
	<link rel="stylesheet" href="css/index.css">
	<link rel='stylesheet' href='css/dataInspector.css' />

</head>
<body>
	<nav class="navbar navbar-default" id="menu">
	  <div class="container-fluid">
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="#">Stark UML<span class="sr-only">(current)</span></a></li>
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Mis Documentos<span class="caret"></span></a>
	          <ul class="dropdown-menu" role="menu">
	            <li><a href="#">Action</a></li>
	          </ul>
	        </li>
	      </ul>
	      <div class="navbar-form navbar-left" role="search">
	        <div class="form-group">
	          <input type="text" id="nombreArchivo" class="form-control" placeholder="Nombre documento">
	        </div>
	        <button id="btnGuardar" class="btn btn-primary">Guardar</button>
	        <button id="btnCargar" class="btn btn-success">Cargar</button>
	        <button id="btnCodigo" class="btn btn-warning">Generar Código</button>
	      </div>
	      <ul class="nav navbar-nav navbar-right">
	        <li><a href="https://github.com/JuanDanielCR/Frontend_JS/tree/master/DiagramasJS">Github</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>
	<!--Cualquier gráfico creado con GOJS necesita un div como contenedor-->
	<div id="myInspectorDiv" class="inspector"></div>
	<div id="paletteContainer" class="palette goDiagram"></div>
	<div id="diagramContainer" class="diagram goDiagram"></div>  
    <div id="codigoContainer"></div>
    
	<script type="text/javascript" src="js/index.js"></script>
</body>

