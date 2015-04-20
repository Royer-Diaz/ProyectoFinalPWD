
var Weapon = function (_nameWeapon, _diceQuant, _diceNumber, _plus) {
  var nameWeapon = _nameWeapon,
       diceQuant = _diceQuant,
      diceNumber = _diceNumber,
            plus = _plus;

  this.getNameWeapon = function () {
    return nameWeapon;
  };
  
  this.getDiceQuant = function () {
    return diceQuant;
  };
  
  this.getDiceNumber = function () {
    return diceNumber;
  };
  this.getPlus = function () {
    return plus;
  };

  this.toJSON = function () {
    var result = '{';

    result += '"nameWeapon":"'+ nameWeapon + '",';
    result += '"diceQuant":"'+ diceQuant + '",';
    result += '"diceNumber":"'+ diceNumber + '",';
    result += '"plus":"'+ plus + '"';

    result += '}';
    return result;
  }
}; 

var Armor = function (_nameArmor, _protection) {
 var nameArmor = _nameArmor,
     protection = _protection;

  this.getNameArmor = function () {
    return nameArmor;
  };

  this.getProtection = function () {
    return protection;
  };
  

  this.toJSON = function () {
    var result = '{';

    result += '"nameArmor":"'+ nameArmor + '",';
    result += '"protection":"'+ protection + '"';

    result += '}';
    return result;
  }
};



var EffectStattus = function (_type, _nameEffect, _modifierEffect, _attributeEffect) {
 
        var type = _type,
      nameEffect = _nameEffect,
  modifierEffect = _modifierEffect,
 attributeEffect = _attributeEffect;

  this.getType = function () {
    return type;
  };
  this.getNameEffect = function () {
    return nameEffect;
  };
  this.getModifier = function () {
    return modifierEffect;
  };
  this.getAttribut = function () {
    return attributeEffect;
  };

  this.toJSON = function () {
    var result = '{';

    result += '"type":"'+ type + '",';
    result += '"nameEffect":"'+ nameEffect + '",';
    result += '"modifierEffect":"'+ modifierEffect + '",';
    result += '"attributeEffect":"'+ attributeEffect + '"';

    result += '}';
    return result;
  }
};


var Personaje = function( _imgURL, _name, _clase, _raza, _genero, _nameWeapon, _diceQuant, _diceNumber, _plus, _nameArmor, _protection, _hp, _str, _con, _dex, _int, _wis, _char ){
  var imgURL = _imgURL,
    name = _name,
    clase = _clase,
    raza = _raza,
    genero = _genero,
    weapon = new Weapon( _nameWeapon, _diceQuant, _diceNumber, _plus),
    armor  = new Armor( _nameArmor, _protection),
    hp = _hp,
    str = _str,
    con = _con,
    dex = _dex,
    int = _int,
    wis = _wis,
    char = _char,
    effects = []; 

  this.getImgURL = function(){
   return imgURL
  };
   
  this.getName = function () {
    return name;
  };
  this.getClase = function () {
    return clase;
  };
  this.getRaza = function () {
    return raza;
  };
  this.getGenero = function () {
    return genero;
  };
  this.getWeapon = function () {
    return weapon;
  };
  this.getArmor = function () {
    return armor;
  };
  this.getHP = function () {
    return hp;
  };
  this.getStr = function () {
    return str;
  };
  this.getCon = function () {
    return con;
  };
  this.getDex = function () {
    return dex;
  };
  this.getInt = function () {
    return int;
  };
  this.getWis = function () {
    return wis;
  };
  this.getChar = function () {
    return char;
  };
  this.getEffectsToJSON = function () {
    var effectToJSON = [];
    effects.forEach( function (oneEffect) {
      effectToJSON.push(oneEffect.toJSON())
    });
    return effectToJSON;
  };
  this.getEffects = function(){
   return effects;
  };

  this.toJSON = function () {
    var result = '{';

    result += '"imgURL":"'+ imgURL + '",';
    result += '"name":"'+ name + '",';
    result += '"clase":"'+ clase + '",';
    result += '"raza":"'+ raza + '",';
    result += '"genero":"'+ genero + '",';

    result += '"weapon":' + weapon.toJSON(); + '';
    result += '"armor":' + armor.toJSON(); + '';

    result += '"hp":"'+ hp + '",';
    result += '"str":"'+ str + '",';
    result += '"con":"'+ con + '",';
    result += '"dex":"'+ dex + '",';
    result += '"int":"'+ int + '",';
    result += '"wis":"'+ wis + '",';
    result += '"char":"'+ char + '",';

    result += '"Effects":"'+ this.getEffectsToJSON + '",';

    result += '}';
    return result;
  };

  
  this.setEffect = function (_type, _nameEffect, _modifierEffect, _attributeEffect) {
    effects.push( new EffectStattus(_type, _nameEffect, _modifierEffect, _attributeEffect));
    return this;
  };

  this.setHp = function(newHP){
    hp = newHP;
    return this;
  };

  this.setStr = function(newStr){
    str = newStr;
    return this;
  };

  this.setCon = function(newCon){
    con = newCon;
    return this;
  };

  this.setDex = function(newDex){
    dex = newDex;
    return this;
  };

  this.setInt = function(newInt){
    int = newInt;
    return this;
  };

  this.setWis = function(newWis){
    wis = newWis;
    return this;
  };

  this.setChar = function(newChar){
    char = newChar;
    return this;
  };



  
};




















