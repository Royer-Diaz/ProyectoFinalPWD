

Personajes = [];

var refrescarPersonaje = function (personajeIndex) {
  var personajeActual = Personajes[personajeIndex],
                armor = personajeActual.getArmor(),
               weapon = personajeActual.getWeapon(),
              effects = personajeActual.getEffects(),
              i = personajeIndex;
  
  $('#imgPerDis').attr('src', personajeActual.getImgURL());
  $('#namePer span').html(personajeActual.getName());
  $('#clasePer span').html(personajeActual.getClase());
  $('#razaPer span').html(personajeActual.getRaza());
  $('#genderPer span').html(personajeActual.getGenero());

  $('#weaponName').html(weapon.getNameWeapon());
  $('#weaponDiceNumber').html(weapon.getDiceNumber());
  $('#weaponDiceQuant').html(weapon.getDiceQuant());
  $('#weaponPlus').html(weapon.getPlus());

  $('#armorName').html(armor.getNameArmor());
  $('#armorProtection').html(armor.getProtection());
  
  $('#hp-left').html(personajeActual.getHP());
  $('#hp-initial').html(personajeActual.getHP());

  $('#strBase').html(personajeActual.getStr());
  $('#conBase').html(personajeActual.getCon());
  $('#dexBase').html(personajeActual.getDex());
  $('#intBase').html(personajeActual.getInt());
  $('#wisBase').html(personajeActual.getWis());
  $('#charBase').html(personajeActual.getChar());
  
  
  //Elimina todas las instancias inyectadas en el ciclo pasado para prevenir que aparescan mas botones
  $('.saveEffect').remove();
  $('.un-effect').remove();
  $('.delete').remove();


//Inyecta todos los effectos en una tabla para interactuar con ellos
  effects.forEach(function (effect, i) {
     var modifSign;
    if(effect.getType() === "buff"){
      modifSign = '+';
    } else {
      modifSign = '-';
    }

    $('#Effects tbody').append('<tr class="un-effect" data-index="' + i + '" ><td><b>[' 
       + (effect.getType())
       +'] </b> ' + (effect.getNameEffect())
       + '(' + modifSign + (effect.getModifier()) + ' '
       + (effect.getAttribut())
       + ') </td><td><i data-index="' + i +'" class="remove btn fa fa-times-circle"></i></td>'
       + '</tr>');

 /*  switch(effect.getAttribut()){
    
    case'str';
      
    $('#strEffect')

   }

   
conEffect
dexEffect
intEffect
wisEffect
charEffect



   
   switch ($('#select-tipo').val()) {
    case 'camion':
      nuevoVehiculo = new Camion($('#input-marca').val(), $('#input-modelo').val(), $('#input-color').val(), $('#input-serie').val(), $('#input-cilindraje').val());
      break;
    case 'moto':
      nuevoVehiculo = new Moto($('#input-marca').val(), $('#input-modelo').val(), $('#input-color').val(), $('#input-serie').val(), $('#input-cilindraje').val());
      break;
    default:
      nuevoVehiculo = new Automovil($('#input-marca').val(), $('#input-modelo').val(), $('#input-color').val(), $('#input-serie').val(), $('#input-cilindraje').val());
    }*/








  });

  $('#Effects .remove').click(function () {
    effects.splice($(this).data('index'), 1);
    refrescarPersonaje(i);
  });
  
  //Inyeccion del boton de borrar el personaje
  $('#btnsDisplayPer').append('<button type="button"  data-index="' + i + '"class="btn delete btn-danger">Delete</button>');

  $('.delete').click(function () {
    Personajes.splice($(this).data('index'), 1);
    refreshContainer();
    volverPantallaInicio();
  });

 //Inyaccion del boton de crear effecto
 $('#btn-inyect-save').append('<button id="effect" data-index="' + i + '" type="button" class="btn btn-primary saveEffect btn-lg" >Save</button>'); 

 $('.saveEffect').click(function () {
    Personajes[$(this).data('index')].setEffect($('#slt-type-eff').val(),$('#inputNameEffect').val(),$('#inputModifierEffect').val(),$('#slt-attr-eff').val());
    refrescarPersonaje($(this).data('index'));
    resetValues();
  });
  
  //Inyectar el boton de recibir dano
  $('#tkDam').append('<button id="damage" data-index="' + i + '" type="button" class="btn btn-primary ouch btn-lg" data-dismiss="modal">Ouch!</button>');

  //Inyectar el boton de calcular dano
  $('#calAttack').append('<button id="attack" data-index="' + i + '" type="button" class="btn btn-primary gotit btn-lg" data-dismiss="modal">Got It!</button>');


  $('#Effects tbody').data('personaje-index', personajeIndex);
  $('.un-effect').slideDown();
};


var refreshContainer = function () {

  var personajeRow;

  $('#row6paH').html('');

  Personajes.forEach(function (personaje, i) {
   personajeRow = '<div  data-index="' + i + '" class="col-lg-2 center-block text-center">';
   personajeRow += '<img data-index="' + i + '" src="' + personaje.getImgURL() + '" class="img-rounded btn move playerthumb">';
   personajeRow += '<p >' + personaje.getName() + '</p>';
   personajeRow += '<p >' + personaje.getRaza() + ' ' + personaje.getClase() + '</p>';
   personajeRow += '<p><span data-index="' + i + '" class="delete btn">&otimes;</span></p>';
   personajeRow += '</div>';    

    $('#row6paH').append(personajeRow);
  });

  $('#row6paH .delete').click(function () {
    Personajes.splice($(this).data('index'), 1);
    refreshContainer();
  });
  $('#row6paH .move').click(function () {
    refrescarPersonaje($(this).data('index'));
    moverDetallePersonaje();
  });
};

var resetValues = function(){
  $('input').val('');
  $('select').val('default');
  $('input').attr("checked", false);
};

//Vuelve a la Pantalla Principal
var volverPantallaInicio = function(){
  $('body').css('background','transparent url("img/profile_background/demon_bg.jpg") no-repeat fixed center center');
  $('#slider').animate({'margin-left': '-1300px'}, 500);
};

//Mueve slider a pantalla de Juego
 var moverDetallePersonaje = function(){
   $('body').css('background','transparent url("img/profile_background/human_thief_male_bg.jpg") no-repeat fixed center center ');
   $('#slider').animate({'margin-left': '-2600px'}, 500);
};


//Mueve a slider creacion personaje
var moverCrearPersonaje = function(){
   $('body').css('background','transparent url("img/profile_background/human_warrior_female_bg.jpg") no-repeat fixed center center');
   $('#slider').animate({'margin-left': '0px'}, 500);
};

var removerRotor = function(){

      $('.rotate-box').css({
        //for firefox
          "-moz-animation-name":"",
          "-moz-animation-duration":"",
          "-moz-animation-iteration-count":"",
              "-moz-animation-fill-mode":"",

          //for safari & chrome
          "-webkit-animation-name":"",
          "-webkit-animation-duration":"",
          "-webkit-animation-iteration-count":"",
          "-webkit-animation-fill-mode" : "",
        });
};

var rotarInputs = function(){
      $('.rotate-box').css({
        //for firefox
          "-moz-animation-name":"rotatebox",
          "-moz-animation-duration":"0.4s",
          "-moz-animation-iteration-count":"1",
              "-moz-animation-fill-mode":"forwards",

          //for safari & chrome
          "-webkit-animation-name":"rotatebox",
          "-webkit-animation-duration":"0.4s",
          "-webkit-animation-iteration-count":"1",
          "-webkit-animation-fill-mode" : "forwards",
        });
      setTimeout(function(){removerRotor();}, 1000);
};

var setCounterRolls = function(){
  var status = $('#status-dice'),
     chances = parseInt($('#status-dice').html());
     
     chances = chances - 1;

    //Tiros faltandes para los dados
     if (chances === 0){
       $('#btnRoll').addClass('hidden');
     }
      
    status.html(chances);
};

//Cambia la imagen que aparece en la creacion del personaje y crea el URL de la imagen a usar.
var cambioImagenPersonaje = function(){
  var  nuevoURL ,
          clase = $("#slt-class").val(),
           raza = $("#slt-race").val(),
         gender = $("#slt-gender").val();
    nuevoURL = "img/" + raza + "/" + raza + "_" + clase + "_" + gender + ".png";
   $('#img-personaje').attr('src', nuevoURL);
 
 return nuevoURL;
};


//Crea los valosres de las casetillas de inputs dados
var rollDice = function(){


    //Espacios de los resultados en los dados
    var doutput1 = document.getElementById("diceoutput1"),
        doutput2 = document.getElementById("diceoutput2"),
        doutput3 = document.getElementById("diceoutput3"),
        doutput4 = document.getElementById("diceoutput4"),
        doutput5 = document.getElementById("diceoutput5"),
        doutput6 = document.getElementById("diceoutput6");

    //Dados de resultado, 4 por cada casilla.
    function dieMath(){
       dieResult = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1 ) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1 );
      return dieResult;
    }
 
    //Suma de resultados de los dados
    var diceTotal1 = dieMath(),
        diceTotal2 = dieMath(),
        diceTotal3 = dieMath(),
        diceTotal4 = dieMath(),
        diceTotal5 = dieMath(),
        diceTotal6 = dieMath();
    //Asignacion de resultados a el formulario correspondiente.
        doutput1.value = diceTotal1;
        doutput2.value = diceTotal2;
        doutput3.value = diceTotal3;
        doutput4.value = diceTotal4;
        doutput5.value = diceTotal5;
        doutput6.value = diceTotal6;
};

//Setea el valos de las casillas de los dados 
var setValRadioButtons = function(){
  var form1 = $('input[form=form1]').val( $('#diceoutput1').val()),
      form2 = $('input[form=form2]').val( $('#diceoutput2').val()),
      form3 = $('input[form=form3]').val( $('#diceoutput3').val()),
      form4 = $('input[form=form4]').val( $('#diceoutput4').val()),
      form5 = $('input[form=form5]').val( $('#diceoutput5').val()),
      form6 = $('input[form=form6]').val( $('#diceoutput6').val());
};

//-------Event Listeners---------//

$(document).ready(function(){
  
//Botones de la interfas grafica:

    //Boton de Volver a Pantalla principal 
    $('.volver').click(function(){
        volverPantallaInicio();
    });

   //Boton de resetar el formulario
    $('.reset-all').click(function(){
      resetValues();
    }); 

    //Deja que cada personaje se vea en la pantalla de Juego
    $('.move').click(function(){  
      console.log('si sirve');
      moverDetallePersonaje();
    });

    //Devuelve a la Pantalla Princuipal
    $('#returMain').click(function(){  
      volverPantallaInicio();
    });
    
    //Mueve a la pantalla de Creacion del Personaje
    $(document).on('click', '#newPerBtn', moverCrearPersonaje);

    $('.rotor').click(function(){
      rotarInputs();
    });

    $('.rolldice').click(function(){
      //rotarInputs();
      rollDice();
      setValRadioButtons();
      setCounterRolls();
    });

    $('#form-personaje').on('change', function(){
      cambioImagenPersonaje();
    });

    $('input[form="form1"]').on('change', function(){
        $('input[form="form1"]').not(this).prop('checked', false);
    });

    $('input[form="form2"]').on('change', function(){
        $('input[form="form2"]').not(this).prop('checked', false);
    });

    $('input[form="form3"]').on('change', function(){
        $('input[form="form3"]').not(this).prop('checked', false);
    });

    $('input[form="form4"]').on('change', function(){
        $('input[form="form4"]').not(this).prop('checked', false);
    });

    $('input[form="form5"]').on('change', function(){
        $('input[form="form5"]').not(this).prop('checked', false);
    });

    $('input[form="form6"]').on('change', function(){
        $('input[form="form6"]').not(this).prop('checked', false);
    });

    $('.str').on('change', function(){
        $('.str').not(this).prop('checked', false);
    });

    $('.con').on('change', function(){
        $('.con').not(this).prop('checked', false);
    });

    $('.dex').on('change', function(){
        $('.dex').not(this).prop('checked', false);
    });

    $('.int').on('change', function(){
        $('.int').not(this).prop('checked', false);
    });

    $('.wis').on('change', function(){
        $('.wis').not(this).prop('checked', false);
    });

    $('.char').on('change', function(){
        $('.char').not(this).prop('checked', false);
    });


   Personajes.push(new Personaje("img/human/human_cleric_male_1.png", "Vathy il Vec", "cleric", "human", "male_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16));
   Personajes.push(new Personaje("img/human/human_cleric_female_1.png", "Paghe the Untochable", "cleric", "human", "female_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16));
   Personajes.push(new Personaje("img/human/human_warrior_male_1.png", "Khamal, fist of Krosa", "warrior", "human", "male_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16));
   Personajes.push(new Personaje("img/human/human_warrior_female_1.png", "Akroma", "warrior", "human", "female_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16));

  

   refreshContainer();
    //Boton de submit el formulario
    $('.submit').click( function(){
     if (validate()){

      var STR = $(".str[type='radio']:checked").val(),
          CON = $(".con[type='radio']:checked").val(),
          DEX = $(".dex[type='radio']:checked").val(),
          INT = $(".int[type='radio']:checked").val(),
          WIS = $(".wis[type='radio']:checked").val(),
          CHAR = $(".char[type='radio']:checked").val();
      
      var nuevoPersonaje = new Personaje( $('#img-personaje').attr('src'), $('#inputNamePersonaje').val(), $('#slt-class').val(), $('#slt-race').val(), $('#slt-gender').val(), $('#weapon-Name').val(), $('#inputDamage').val(), $('#inputDices').val(), $('#inputPlus').val(), $('#armor-Name').val(), $('#armor-Protection').val(), $('#inputHP').val(), STR, CON, DEX, INT, WIS, CHAR);
      Personajes.push(nuevoPersonaje);   
      refreshContainer();
      volverPantallaInicio();
      resetValues();
     } else {
      console.log("No Valida");
     }  

    }); 
});



//Validaciones del Formulario

var validate = function () {
  //Declaracion de Variables
   var result = true,
       imgUrl = $('#img-personaje').attr('src'),
      namePer = $('#inputNamePersonaje'), 
     classPer = $('#slt-class'), 
      racePer = $('#slt-race'),
    genderPer = $('#slt-gender'), 
   weaponName = $('#weapon-Name'), 
    diceQuant = $('#inputDamage'),
     diceType = $('#inputDices'),
     dicePlus = $('#inputPlus'), 
    armorName = $('#armor-Name'), 
    armorProtection = $('#armor-Protection'), 
           hp = $('#inputHP');
  //Removemos primero si ya habia error en el formulario
  $('.has-error').removeClass('has-error');
  //Validaciones
  if (!namePer.val()){result = false; namePer.closest('.form-group').addClass('has-error');} else { namePer.closest('.form-group').addClass('has-success');};
  if (classPer.val() === "default"){result = false; classPer.closest('.form-group').addClass('has-error');} else {classPer.closest('.form-group').addClass('has-success');};
  if (racePer.val() === "default"){result = false; racePer.closest('.form-group').addClass('has-error');} else {racePer.closest('.form-group').addClass('has-success');};
  if (genderPer.val() === "default"){result = false; genderPer.closest('.form-group').addClass('has-error');} else {genderPer.closest('.form-group').addClass('has-success');};
  if (!weaponName.val()){result = false; weaponName.closest('.input-group').addClass('has-error');} else {weaponName.closest('.input-group').addClass('has-success');};
  if (!diceQuant.val()){result = false; diceQuant.closest('.form-group').addClass('has-error');} else {diceQuant.closest('.form-group').addClass('has-success');};
  if (!diceType.val()){result = false; diceType.closest('.form-group').addClass('has-error');} else {diceType.closest('.form-group').addClass('has-success');};
  if (!dicePlus.val()){result = false; dicePlus.closest('.form-group').addClass('has-error');} else {dicePlus.closest('.form-group').addClass('has-success');};
  if (!armorName.val()){result = false; armorName.closest('.input-group').addClass('has-error');} else {armorName.closest('.input-group').addClass('has-success');};
  if (!armorProtection.val()){result = false; armorProtection.closest('.input-group').addClass('has-error');} else {armorProtection.closest('.input-group').addClass('has-success');};
  if (!hp.val()){result = false; hp.closest('.form-group').addClass('has-error');} else {hp.closest('.form-group').addClass('has-success');};
 
  return result;

};

/*


Crear un metodo que busque entre los efectos y modifique los stats, los resultados deben ser exibidos en los  
boton de Ouch = .ouch

   take damage input  =  #inputAttackReceived


boton de Got It! = .gotit

al hacer el cambio de pantalla de pagina principal a pagina de display se debe setear el hp inicial
agregar funcion que guarde un numero pero no lo toque 








si el effecto es Buff suma y debuff resta



Local storage:

tomo el array de objetos y uno por uno los paso a Json, lo almaceno en el Local Storage.

Convierto el JSON y lo convierto a literalde Objetos y lo mando a array de Objetos de Nuevo.

Este proceso se repetira cada ves que se cree un nuevo objeto o se refreque los persajes en la pagina princpal.



});

var personajeNuevo = new Personaje("img_por_trabajar/human/human_cleric_male_1.jpg", "Vathy il Vec", "cleric", "human", "male_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16);
personajeNuevo.setEffect( "buff", "Tomela con Leche", 8, "str");

*/











