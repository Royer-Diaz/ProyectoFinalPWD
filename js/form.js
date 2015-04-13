//Vuelve a la Pantalla Principal
var volverPantallaInicio = function(){
  $('#slider').animate({'margin-left': '-1300px'}, 500);
};

//Mueve slider a pantalla de Juego
var moverDetallePersonaje = function(){
   $('#slider').animate({'margin-left': '-2600px'}, 500);
};


//Mueve a slider creacion personaje
var moverCrearPersonaje = function(){
   $('#slider').animate({'margin-left': '0px'}, 500);
};

//Cambia la imagen que aparece en la creacion del personaje y crea el URL de la imagen a usar.
var cambioImagenPersonaje = function(){
  var  nuevoURL ,
          clase = $("#slt-class").val(),
           raza = $("#slt-race").val(),
         gender = $("#slt-gender").val();
    nuevoURL = "img_por_trabajar/" + raza + "/" + raza + "_" + clase + "_" + gender + ".jpg";
   $('#img-personaje').attr('src', nuevoURL);
 
 return nuevoURL;
};


//Crea los valosres de las casetillas de inputs dados
function rollDice(){
    //Contados de Tiros.
    var chances = 3,

    //Tiros faltandes para los dados
    status = document.getElementById("status-dice");
    status.innerHTML = chances;
    

    if(chances === 0){
       console.log("no quedan mas chances!!!")
    } else {

    //Espacios de los resultados en los dados
    var doutput1 = document.getElementById("diceoutput1"),
        doutput2 = document.getElementById("diceoutput2"),
        doutput3 = document.getElementById("diceoutput3"),
        doutput4 = document.getElementById("diceoutput4"),
        doutput5 = document.getElementById("diceoutput5"),
        doutput6 = document.getElementById("diceoutput6");
    //Dados de resultado, 4 por cada casilla.
    var d1  = Math.floor(Math.random() * 6) + 1,
        d2  = Math.floor(Math.random() * 6) + 1,
        d3  = Math.floor(Math.random() * 6) + 1,
        d4  = Math.floor(Math.random() * 6) + 1,
        d5  = Math.floor(Math.random() * 6) + 1,
        d6  = Math.floor(Math.random() * 6) + 1,
        d7  = Math.floor(Math.random() * 6) + 1,
        d8  = Math.floor(Math.random() * 6) + 1,
        d9  = Math.floor(Math.random() * 6) + 1,
        d10 = Math.floor(Math.random() * 6) + 1,
        d11 = Math.floor(Math.random() * 6) + 1,
        d12 = Math.floor(Math.random() * 6) + 1,
        d13 = Math.floor(Math.random() * 6) + 1,
        d14 = Math.floor(Math.random() * 6) + 1,
        d15 = Math.floor(Math.random() * 6) + 1,
        d16 = Math.floor(Math.random() * 6) + 1,
        d17 = Math.floor(Math.random() * 6) + 1,
        d18 = Math.floor(Math.random() * 6) + 1,
        d19 = Math.floor(Math.random() * 6) + 1,
        d20 = Math.floor(Math.random() * 6) + 1,
        d21 = Math.floor(Math.random() * 6) + 1,
        d22 = Math.floor(Math.random() * 6) + 1,
        d23 = Math.floor(Math.random() * 6) + 1,
        d24 = Math.floor(Math.random() * 6) + 1;
    //Suma de resultados de los dados
    var diceTotal1 = d1 + d2 + d3 + d4,
        diceTotal2 = d5 + d6 + d7 + d8,
        diceTotal3 = d9 + d10 + d11 + d12,
        diceTotal4 = d13 + d14 + d15 + d16,
        diceTotal5 = d17 + d18 + d19 + d20,
        diceTotal6 = d21 + d22 + d23 + d24;
    //Asignacion de resultados a el formulario correspondiente.
    doutput1.value = diceTotal1;
    doutput2.value = diceTotal2;
    doutput3.value = diceTotal3;
    doutput4.value = diceTotal4;
    doutput5.value = diceTotal5;
    doutput6.value = diceTotal6;
    }
}


//-------Event Listeners---------//

$(document).ready(function(){
//Botones de la interfas grafica:

  //Boton de Volver a Pantalla principal 
  $('.volver').click(function(){
        volverPantallaInicio();
    });

   //Boton de resetar el formulario
    $('.reset-all').click(function(){
      $('input').val('');
      $('select').val('default');
    }); 

    //Deja que cada personaje se vea en la pantalla de Juego
    $('.move').click(function(){  
      moverDetallePersonaje();
    });

    //Devuelve a la Pantalla Princuipal
    $('#returMain').click(function(){  
      volverPantallaInicio();
    });
    
    //Mueve a la pantalla de Creacion del Personaje
    $('#newPerBtn').click(function(){  
      moverCrearPersonaje();
    });

    //
    $('.back').click(function(){ 
     // crearPersonaje();   
     // refrescarPersonajes(); 
      volverPantallaInicio();
    });

    $('.rolldice').click(function(){
      rollDice();
    });

    $('#form-personaje').change( function(){
    cambioImagenPersonaje();
    console.log("Cambio");
  });
});
