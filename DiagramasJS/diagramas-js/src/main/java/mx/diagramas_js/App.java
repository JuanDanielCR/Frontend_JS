package mx.diagramas_js;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFileLocation;

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

    	//Sección Sistema de Calidad
        get(new FreeMarkerRoute("/") {
            @Override
            public ModelAndView handle(Request request, Response response) {
                Map<String, Object> attributes = new HashMap<String, Object>();
                return modelAndView(attributes, "home.ftl");
            }
        });
        //POST Login
        post(new FreeMarkerRoute("/prueba") {
            @Override
            public ModelAndView handle(Request request, Response response) {
            	System.out.println(request.queryParams("name"));
				response.redirect("/");
                return null;
            }
        });
    }

}
