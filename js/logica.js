


//Vuelve a la Pantalla Principal
var volverPantallaInicio = function(){
  jQuery('#slider').animate({'margin-left': '-1300px'}, 500);
};


var moverDetallePersonaje = function(){
   $('#slider').animate({'margin-left': '-2600px'}, 500);
};


var moverCrearPersonaje = function(){
   $('#slider').animate({'margin-left': '0px'}, 500);
};


//-------Event Listeners---------//

$(document).ready(function(){
//Botones de la interfas grafica:

  //Boton de Volver a Pantalla principal 
  $('.volver').click(function(){
        volverPantallaInicio();
    });

   //Boton de resetar el formulario
    $('#resetear').click(function(){
      $('.has-error').removeClass('has-error');
      resetearInputs();
    }); 


    $('.move').click(function(){  
      moverDetallePersonaje();
    })

    $('#returMain').click(function(){  
      volverPantallaInicio();
    })

    $('#newPerBtn').click(function(){  
      moverCrearPersonaje();
    })

    $('.back').click(function(){  
      volverPantallaInicio();
    })



});