window.onload = function(){ 
  //Creando mi objeto
  var miCalculadora = new Calculadora();

  pantalla=document.getElementById("textoPantalla");
  //Obteniendo los botones
  var boton1 = document.getElementById("1");
    boton1.addEventListener("click",function(){
      miCalculadora.numero('1');
    },false);

  var boton2 = document.getElementById("2");
    boton2.addEventListener("click",function(){
      miCalculadora.numero('2');
    },false);
  var boton3 = document.getElementById("3");
    boton3.addEventListener("click",function(){
      miCalculadora.numero('3');
    },false);
  var boton4 = document.getElementById("4");
    boton4.addEventListener("click",function(){
      miCalculadora.numero('4');
    },false);
  var boton5 = document.getElementById("5");
    boton5.addEventListener("click",function(){
      miCalculadora.numero('5');
    },false);
  var boton6 = document.getElementById("6");
    boton6.addEventListener("click",function(){
      miCalculadora.numero('6');
    },false);
  var boton7 = document.getElementById("7");
    boton7.addEventListener("click",function(){
      miCalculadora.numero('7');
    },false);
  var boton8 = document.getElementById("8");
    boton8.addEventListener("click",function(){
      miCalculadora.numero('8');
    },false);
  var boton9 = document.getElementById("9");
    boton9.addEventListener("click",function(){
      miCalculadora.numero('9');
    },false);
  var botonCero = document.getElementById("0");
    botonCero.addEventListener("click",function(){
      miCalculadora.numero('0');
    },false);
  var punto =  document.getElementById("punto");
  punto.addEventListener("click",function(){
    miCalculadora.numero('.');
  },false);

  var botonMas = document.getElementById("mas");
  botonMas.addEventListener("click",function(){
    miCalculadora.operar("+");
  },false);
  var botonMenos = document.getElementById("menos");
  botonMenos.addEventListener("click",function(){
    miCalculadora.operar("-");
  },false);
  var botonMult = document.getElementById("por");
  botonMult.addEventListener("click",function(){
    miCalculadora.operar("*");
  },false);
  var botonDiv = document.getElementById("entre");
  botonDiv.addEventListener("click",function(){
    miCalculadora.operar("/");
  },false);
  
  var binario = document.getElementById("binario");
    binario.addEventListener("click",function(){
      x = (x >>> 0).toString(2);
      pantalla.innerHTML=x;
      op="no";
      xi=1;
    },false);

  var botonIgual = document.getElementById("igual");
  botonIgual.addEventListener("click",function(){
    miCalculadora.igualar();
  },false);
  var botonBorrar = document.getElementById("borrar");
  botonBorrar.addEventListener("click",function(){
    pantalla.innerHTML=0; 
    x="0"; 
    coma=0; 
    ni=0;
    op="no";
  },false);
}
x="0"; xi=1; 
coma=0; ni=0; op="no"; 
//Definición de mi clase

  function Calculadora(){
    this.oper;
    this.result;
  }
  Calculadora.prototype.numero = function(xx) {
    if (x=="0" || xi==1  ) {  
    pantalla.innerHTML=xx;
    x=xx;
    if (xx==".") { 
    pantalla.innerHTML="0.";
    x=xx; 
    coma=1;
    }
  }
  else {
    if (xx=="." && coma==0) {
    pantalla.innerHTML+=xx;
    x+=xx;
    coma=1; 
  }
  else if (xx=="." && coma==1) {} 
    else {
      pantalla.innerHTML+=xx;
      x+=xx
    }
  }
  xi=0
  };

  Calculadora.prototype.operar = function(s) {
    this.igualar(); 
    ni=x; 
    op=s; 
    xi=1; 
  };
  Calculadora.prototype.igualar = function(first_argument) {
  if (op=="no") { 
      pantalla.innerHTML=x; 
      }
    else {
      sl=ni+op+x;
      sol=eval(sl) 
      pantalla.innerHTML=sol 
      x=sol; 
      op="no"; 
      xi=1;
      }
  };
