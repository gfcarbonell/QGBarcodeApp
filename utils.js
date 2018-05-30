"use strict";


exports.genCharArray = function (charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

exports.addLetterKeyToJson = function (key, value) {
      switch (key) {
         case "A":
                 return {"A": value};
                 break;
         case "B":
                 return {"B": value};
                 break;
         case "C":
                 return {"C": value};
                 break;
         case "D":
                 return {"D": value};
                 break;
         case "E":
                 return {"E": value};
                 break;
         case "F":
                 return {"F": value};
                 break;
         case "G":
                 return {"G": value};
                 break;
         case "H":
                 return {"H": value};
                 break;
         case "I":
                 return {"I": value};
                 break;
         case "J":
                 return {"J": value};
                 break;
         case "K":
                 return {"K": value};
                 break;
         case "L":
                 return {"L": value};
                 break;
         case "M":
                 return {"M": value};
                 break;
         case "N":
                 return {"N": value};
                 break;
         case "O":
                 return {"O": value};
                 break;
         case "P":
                 return {"P": value};
                 break;
         case "Q":
                 return {"Q": value};
                 break;
         case "R":
                 return {"R": value};
                 break;
         case "S":
                 return {"S": value};
                 break;
         case "T":
                 return {"T": value};
                 break;
         case "U":
                 return {"U": value};
                 break;
         case "W":
                 return {"W": value};
                 break;
         case "X":
                 return {"X": value};
                 break;
         case "Y":
                 return {"Y": value};
                 break;
         case "Z":
                 return {"Z": value};
                 break;
     }
}