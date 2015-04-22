

Personajes = [];



var refrescarPersonaje = function (personajeIndex) {
       var personajeActual = Personajes[personajeIndex],
                     armor = personajeActual.getArmor(),
                    weapon = personajeActual.getWeapon(),
                   effects = personajeActual.getEffects(),
                         i = personajeIndex,
                       STR = calcModif(personajeActual.getStr()),
                       CON = calcModif(personajeActual.getCon()),
                       DEX = calcModif(personajeActual.getDex()),
                       INT = calcModif(personajeActual.getInt()),
                       WIS = calcModif(personajeActual.getWis()),
                      CHAR = calcModif(personajeActual.getChar()),
                strInitial = 0,
                conInitial = 0,
                dexInitial = 0,
                intInitial = 0,
                wisInitial = 0,
               charInitial = 0,
      resultCalcDiceAttack;
  

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
  $('.initCalAttack').remove();
  $('.saveEffect').remove();
  $('.un-effect').remove();
  $('#damage').remove();
  $('.delete').remove();
  $('.gotit').remove();
  $('.ouch').remove();
  

  //Saca el valor del modificador de cada atribut
    
    if(STR < 0){ $('#strModifier').css('color', 'red'); $('#strModifier').html( STR ); } else { $('#strModifier').css('color', 'green'); $('#strModifier').html('+' + STR ); };

    if(CON < 0){ $('#conModifier').css('color', 'red'); $('#conModifier').html( CON ); } else { $('#conModifier').css('color', 'green'); $('#conModifier').html('+' + CON); };

    if(DEX < 0){ $('#dexModifier').css('color', 'red'); $('#dexModifier').html( DEX ); } else { $('#dexModifier').css('color', 'green'); $('#dexModifier').html('+' + DEX); };

    if(INT < 0){ $('#intModifier').css('color', 'red'); $('#intModifier').html( INT ); } else { $('#intModifier').css('color', 'green'); $('#intModifier').html('+' + INT); };

    if(WIS < 0){ $('#wisModifier').css('color', 'red'); $('#wisModifier').html( WIS ); } else { $('#wisModifier').css('color', 'green'); $('#wisModifier').html('+' + WIS); };

    if(CHAR < 0){ $('#charModifier').css('color', 'red'); $('#charModifier').html( CHAR ); } else { $('#charModifier').css('color', 'green'); $('#charModifier').html('+' + CHAR); };



  //Inyecta todos los effectos en una tabla para interactuar con ellos
  effects.forEach(function (effect, i) { 

   //Condiciona el tipo de efecto que se agrega 
    var modifSign,
       modEffect =  calcModif(parseInt(effect.getModifier()));


    if(effect.getType() === "buff"){ modifSign = '+'; } else { modifSign = '-'; };

   //Constructor que inyecta cada uno de los efectos en la tabla de efectos
    $('#Effects tbody').append('<tr class="un-effect" data-index="' + i + '" ><td><b>[' 
      + (effect.getType()) +'] </b> ' + (effect.getNameEffect()) + '(' 
      + modifSign + (effect.getModifier()) + ' ' 
      + (effect.getAttribut()) + ') </td><td><i data-index="' + i +'" class="remove btn fa fa-times-circle"></i></td>' 
      + '</tr>');

    //Determina si se suma o se resta el efecto toma el valor del html y le resta o suma de acuerdo al modificador 
    switch(effect.getAttribut()){

      //tengo que setear variables para determinar el valor de cada casilla de efecto y poder sumar y restar todo
      case'str':
        
        if(modifSign === '-'){
          $('#strEffect').css('color', 'red');
          $('#strEffect').html( strInitial - modEffect);
        } else {
          $('#strEffect').css('color', 'green');
          $('#strEffect').html( '+' + strInitial + modEffect);
        }

        break;
      case'con':

        if(modifSign === '-'){
          $('#conEffect').css('color', 'red');strEffect
          $('#conEffect').html( conInitial - modEffect );
        } else {
          $('#conEffect').css('color', 'greed');
          $('#conEffect').html( '+' + conInitial + modEffect );
        }
        break;
      case'dex':
     
        if(modifSign === '-'){
          $('#dexEffect').css('color', 'red');
          $('#dexEffect').html( dexInitial - modEffect);
        } else {
          $('#dexEffect').css('color', 'greed');
          $('#dexEffect').html( '+' + dexInitial + modEffect);
        }
        break;
      case'int':

        if(modifSign === '-'){
          $('#intEffect').css('color', 'red');
          $('#intEffect').html( intInitial - modEffect);
        } else {
          $('#intEffect').css('color', 'green');
          $('#intEffect').html( '+' + intInitial + modEffect);
        }
        break;
      case'wis':

        if(modifSign === '-'){
          $('#wisEffect').css('color', 'red');
          $('#wisEffect').html( wisInitial - modEffect);
        } else {
          $('#wisEffect').css('color', 'green');
          $('#wisEffect').html( '+' + wisInitial + modEffect);
        }
        break;
      default:

        if(modifSign === '-'){
          $('#charEffect').css('color', 'red');
          $('#charEffect').html( charInitial - modEffect);
        } else {
          $('#charEffect').css('color', 'green');
          $('#charEffect').html( '+' + charInitial + modEffect);
        }
    };

  });

  $('#Effects .remove').click(function () { effects.splice($(this).data('index'), 1); refrescarPersonaje(i); });
  
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
    Personajes[$(this).data('index')].setEffect($('#slt-type-eff').val(), $('#inputNameEffect').val(), $('#inputModifierEffect').val(), $('#slt-attr-eff').val()); 
    refrescarPersonaje($(this).data('index')); 
    resetValues();  });

  //Inyectar el boton de recibir dano
  $('<button id="damage" data-index="' + i + '" type="button" class="btn  btn-danger" data-toggle="modal" data-target=".bs-damage-modal-lg">Take Damage</button>').insertAfter('#modalCalAttack');
  $('#tkDam').append('<button data-index="' + i + '" type="button" class="btn btn-primary ouch btn-lg" data-dismiss="modal">Ouch!</button>');
  $('#damage').click(function(){

       var resultCalcDanho = Personajes[$(this).data('index')].getArmor(),
                  bonArmor = resultCalcDanho.getProtection(),
                    modCon = conInitial + CON,
                 resultSum = 0;
                
          $('#currentArmor').html(bonArmor);
          $('#armorMod').html(modCon);
      
          $('#inputAttackReceived').on('change', function(){ 
            resultSum = parseInt($('#inputAttackReceived').val()); + bonArmor + modCon;
            $('#totalDamTaked').html(resultSum);
          });
          $('.ouch').click(function(){
             
            var nuevohp = parseInt($('#hp-left').html());
             
            $('#hp-left').html(nuevohp - resultSum);
          });

  });

  //Inyectar el boton de calcular dados
  $('#calAttack').append('<button id="attack" data-index="' + i + '" type="button" class="btn btn-primary gotit btn-lg" data-dismiss="modal">Got It!</button>');
  $('<button type="button" data-index="' + i + '" class="btn initCalAttack btn-success" data-toggle="modal" data-target=".bs-attack-modal-lg">Calculate Attack</button>').insertAfter('#btnInitCalAttack');
  $('.initCalAttack').click(function(){

    //Calcula el tiro de los dados basado en las indicaciones en el arma
    var resultCalcDiceAttack = Personajes[$(this).data('index')].getWeapon(),
                 diceNumberW = resultCalcDiceAttack.getDiceNumber(),
                   quantDice = resultCalcDiceAttack.getDiceQuant(),
                     prodFin = 0;

      for(i = 0; i < quantDice; i += 1){
       prodFin += Math.floor(Math.random() * diceNumberW) + 1;
      }

      $('#cantDados').html(diceNumberW);
      $('#cantCaras').html(quantDice);
      $('#resultDados').html(strInitial);
      $('#resultEffect').html(STR);
      $('#modifArma').html(weapon.getPlus());
      $('#weaponResult').html(prodFin);
      $('#totalAttack').html(prodFin + weapon.getPlus() + (strInitial + STR));
    });

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
  $('body').css('background','transparent url("img/profile_background/demon_bg.jpg") no-repeat fixed center center / cover');
  $('#slider').animate({'margin-left': '-1300px'}, 500);
};

//Mueve slider a pantalla de Juego
 var moverDetallePersonaje = function(){
   $('body').css('background','transparent url("img/profile_background/Griselbrand_AVR_bg.jpg") no-repeat fixed');
   $('#slider').animate({'margin-left': '-2600px'}, 500);
};


//Mueve a slider creacion personaje
var moverCrearPersonaje = function(){
   $('body').css('background','transparent url("img/profile_background/lillianas_vess_bg.jpg") no-repeat fixed');
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

//Botones de la interfas grafica:
$(document).ready(function(){
  

    //Boton de Volver a Pantalla principal 
    $('.volver').click(function(){ volverPantallaInicio(); });

   //Boton de resetar el formulario
    $('.reset-all').click(function(){ resetValues(); }); 

    //Deja que cada personaje se vea en la pantalla de Juego
    $('.move').click(function(){ console.log('si sirve');  moverDetallePersonaje(); });

    //Devuelve a la Pantalla Princuipal
    $('#returMain').click(function(){ volverPantallaInicio(); });
    
    //Mueve a la pantalla de Creacion del Personaje
    $(document).on('click', '#newPerBtn', moverCrearPersonaje);

    //Gira los inputs de los dados
    $('.rotor').click(function(){ rotarInputs(); });

    //rotarInputs();
    $('.rolldice').click(function(){ rollDice(); setValRadioButtons(); setCounterRolls(); });

    $('#form-personaje').on('change', function(){ cambioImagenPersonaje(); });

    $('input[form="form1"]').on('change', function(){ $('input[form="form1"]').not(this).prop('checked', false); });

    $('input[form="form2"]').on('change', function(){ $('input[form="form2"]').not(this).prop('checked', false); });

    $('input[form="form3"]').on('change', function(){ $('input[form="form3"]').not(this).prop('checked', false); });

    $('input[form="form4"]').on('change', function(){ $('input[form="form4"]').not(this).prop('checked', false); });

    $('input[form="form5"]').on('change', function(){ $('input[form="form5"]').not(this).prop('checked', false); });

    $('input[form="form6"]').on('change', function(){ $('input[form="form6"]').not(this).prop('checked', false); });

    $('.str').on('change', function(){ $('.str').not(this).prop('checked', false);});

    $('.con').on('change', function(){ $('.con').not(this).prop('checked', false);});

    $('.dex').on('change', function(){ $('.dex').not(this).prop('checked', false);});

    $('.int').on('change', function(){ $('.int').not(this).prop('checked', false);});

    $('.wis').on('change', function(){ $('.wis').not(this).prop('checked', false);});

    $('.char').on('change', function(){ $('.char').not(this).prop('checked', false);});


   Personajes.push(new Personaje("img/human/human_warrior_female_1.png", "Akroma", "warrior", "human", "female_1", "Tenza", 2, 4, 2, "Exosqueletal Armor", 8, 20, 16, 5, 8, 9, 18, 24, 16));

  

   refreshContainer();
    //Boton de submit el formulario
    $('.submit').click( function(){
     if (validate()){

      var STRsub = parseInt($(".str[type='radio']:checked").val()),
          CONsub = parseInt($(".con[type='radio']:checked").val()),
          DEXsub = parseInt($(".dex[type='radio']:checked").val()),
          INTsub = parseInt($(".int[type='radio']:checked").val()),
          WISsub = parseInt($(".wis[type='radio']:checked").val()),
          CHARsub = parseInt($(".char[type='radio']:checked").val());
      
      var nuevoPersonaje = new Personaje( $('#img-personaje').attr('src'), $('#inputNamePersonaje').val(), $('#slt-class').val(), $('#slt-race').val(), $('#slt-gender').val(), $('#weapon-Name').val(), $('#inputDamage').val(), $('#inputDices').val(), $('#inputPlus').val(), $('#armor-Name').val(), $('#armor-Protection').val(), $('#inputHP').val(), STRsub, CONsub, DEXsub, INTsub, WISsub, CHARsub);
      Personajes.push(nuevoPersonaje);   
      refreshContainer();
      volverPantallaInicio();
      resetValues();
      $('.has-error').removeClass('has-error');
      $('.has-success').removeClass('has-success');
      $('#btnRoll').removeClass('hidden');
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


Local storage:

tomo el array de objetos y uno por uno los paso a Json, lo almaceno en el Local Storage.

Convierto el JSON y lo convierto a literalde Objetos y lo mando a array de Objetos de Nuevo.

Este proceso se repetira cada ves que se cree un nuevo objeto o se refresquen los persajes en la pagina princpal.

});


*/


//Calcula cualquier numero entrante y lo convierte en un modidficador

var calcModif = function(_numberToTreat){
 
  var modifierRaw = _numberToTreat;

  if(modifierRaw === 4 || modifierRaw === 5){
    return -3;
  }
  if(modifierRaw === 6 || modifierRaw === 7){
    return -2;
  }
  if(modifierRaw === 8 || modifierRaw === 9){
    return -1;
  }
  if(modifierRaw === 10 || modifierRaw === 11){
    return 0;
  }
  if(modifierRaw === 12 || modifierRaw === 13){
    return 1;
  }
  if(modifierRaw === 14 || modifierRaw === 15){
    return 2;
  }
  if(modifierRaw === 16 || modifierRaw === 17){
    return 3;
  }
  if(modifierRaw === 18 || modifierRaw === 19){
    return 4;
  }
  if(modifierRaw === 20 || modifierRaw === 21){
    return 5;
  }
  if(modifierRaw === 22 || modifierRaw === 23){
    return 6;
  }
  if(modifierRaw === 12){
    return 7;
  }

};
