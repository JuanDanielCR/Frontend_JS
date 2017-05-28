package mx.diagramas_js;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFileLocation;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.template.freemarker.FreeMarkerRoute;

public class App 
{
    public static void main( String[] args ){
    	//Route for saving our js,css and images
    	staticFileLocation("/public");

    	//Pagina Principal
        get(new FreeMarkerRoute("/") {
            @Override
            public ModelAndView handle(Request request, Response response) {
                Map<String, Object> attributes = new HashMap<String, Object>();
                response.status(200);
                response.type("text/html");
                return modelAndView(attributes, "home.ftl");
            }
        });
        //Guardar Diagrama
        post(new FreeMarkerRoute("/diagrama") {
            @Override
            public ModelAndView handle(Request request, Response response) {
            	guardarArchivo(request.queryParams("nombre"),request.queryParams("contenido"));
				response.redirect("/");
                return null;
            }
        });
        //Obtener Diagrama
        get(new FreeMarkerRoute("/diagrama") {
            @Override
            public ModelAndView handle(Request request, Response response) {
                Map<String, Object> attributes = new HashMap<String, Object>();
                response.status(200);
                response.type("application/json");
                String json = "";
                try {
					json = lecturaArchivo(request.queryParams("nombre"));
				} catch (IOException e) {
					System.out.println("Archivo no encontrado");
				}
                attributes.put("content", json);
                return modelAndView(attributes, "data.ftl");
            }
        });
    }
    public static void guardarArchivo(String nombre, String contenido){
    	try{
            //creo la ruta de mi archivo: ruta + nombre
            FileWriter writer= new FileWriter("C:/Users/djaqcu1/Documents/JS/Frontend_JS/DiagramasJS/diagramas-js/src/main/resources/public/files/"+nombre);
            //Mando el String a escribir
            writer.write(contenido);
            writer.close();
        }catch(Exception e){
            System.out.println("Error;");
        }
    }
    public static String lecturaArchivo(String nombre) throws IOException{
    	BufferedReader br = new BufferedReader(new FileReader("C:/Users/djaqcu1/Documents/JS/Frontend_JS/DiagramasJS/diagramas-js/src/main/resources/public/files/"+nombre));
    	StringBuilder sb = new StringBuilder();
    	try {
    	    String line = br.readLine();

    	    while (line != null) {
    	        sb.append(line);
    	        sb.append(System.lineSeparator());
    	        line = br.readLine();
    	    }
    	} finally {
    	    br.close();
    	}
    	return sb.toString();
    }
}
