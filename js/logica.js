var EffectStattus = function (_type, _name, _modifier, _estAttribute) {
  var type = _type,
    name = _name,
    modifier = _modifier,
    attribute = _estAttribute;

  this.getType = function () {
    return type;
  };
  this.getName = function () {
    return name;
  };
  this.getModifier = function () {
    return modifier;
  };
  this.getAttribute = function () {
    return attribute;
  };

  this.toJSON = function () {
    var result = '{';

    result += '"type":"'+ type + '",';
    result += '"name":"'+ name + '",';
    result += '"modifier":"'+ modifier + '",';
    result += '"attribute":"'+ attribute + '"';

    result += '}';
    return result;
  }
};

var Armor = function (_name, _bonus) {
 var name = _name,
    bonus = _bonus;

  this.getName = function () {
    return name;
  };

  this.getBonus = function () {
    return bonus;
  };
  

  this.toJSON = function () {
    var result = '{';

    result += '"name":"'+ name + '",';
    result += '"bonus":"'+ bonus + '"';

    result += '}';
    return result;
  }
};

var Weapon = function (_name, _diceQuant, _diceNumber, _plus) {
  var name = _name,
 diceQuant = _diceQuant,
diceNumber = _diceNumber,
      plus = _plus;

  this.getName = function () {
    return name;
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

    result += '"name":"'+ name + '",';
    result += '"diceQuant":"'+ diceQuant + '",';
    result += '"diceNumber":"'+ diceNumber + '",';
    result += '"plus":"'+ plus + '"';

    result += '}';
    return result;
  }
}; 





var Personaje = function (_marca, _modelo, _color, _serieMotor, _cilindrajeMotor, _numeroLlantas) {
  var i,
    marca = _marca,
    modelo = _modelo,
    color = _color,
    estado = false,
    motor = new Motor(_serieMotor, _cilindrajeMotor), // agregación 1 - 1
    llantas = []; // agregación 1 - n

  // efecto secundario
  for (i = 0; i < _numeroLlantas; i += 1) {
    llantas.push(new Llanta());
  }

  this.getMarca = function () {
    return marca;
  };
  this.getModelo = function () {
    return modelo;
  };
  this.getColor = function () {
    return color;
  };
  this.getEstado = function () {
    return estado;
  };
  this.getMotor = function () {
    return motor;
  };
  this.getLlantas = function () {
    return llantas;
  };
  this.getTipo = function () {
    return "Vehiculo";
  };

  this.toJSON = function () {
    var result = '{';

    result += '"marca":"'+ marca + '",';
    result += '"modelo":"'+ modelo + '",';
    result += '"color":"'+ color + '",';
    result += '"estado":"'+ estado + '",';
    result += '"tipo":"'+ this.getTipo() + '",';

    result += '"motor":' + motor.toJSON(); + '';

    result += '}';
    return result;
  };

  this.setColor = function (nuevoColor) {
    color = nuevoColor;
    return this;
  };
  this.setMotor = function (nuevoMotor) {
    if (nuevoMotor instanceof Motor) {
      motor = nuevoMotor;
    } else {
      console.warn("Eso no puede asignarse como motor!");
    }
    return this;
  };

  this.pushLlanta = function () {
    llantas.push(new Llanta());
    return this;
  };

  this.arrancar = function () {
    if (estado) {
      console.warn('El vehículo ya está encendido!');
    } else {
      motor.encender();
      estado = true;
    }
    return this;
  };
  this.apagarse = function () {
    if (estado) {
      motor.apagarse();
      estado = false;
      llantas.forEach(function (llanta) {
        llanta.detenerse();
      });
    } else {
      console.warn('El vehículo ya está apagado!');
    }
    return this;
  };

  this.avanzar = function () {
    if (estado) {
      motor.acelerar(20);
      llantas.forEach(function (llanta) {
        llanta.rodar();
      });
    } else {
      console.warn('Debe encender el vehículo!');
    }
    return this;
  };
  this.detenerse = function () {
    var velocidadActual = motor.getVelocidad();
    motor.desacelerar(velocidadActual);
    llantas.forEach(function (llanta) {
      llanta.detenerse();
    });
    return this;
  };
};





