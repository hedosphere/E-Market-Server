export const RandomNumber = (quantity = 6) => {
  //

  //
  const returnValue = (num) => {
    let value = "";

    if (num == 10) value = "a";
    else if (num == 11) value = "b";
    else if (num == 12) value = "c";
    else if (num == 13) value = "d";
    else if (num == 14) value = "e";
    else if (num == 15) value = "f";
    else if (num == 16) value = "g";
    else if (num == 17) value = "h";
    else if (num == 18) value = "i";
    else if (num == 19) value = "j";
    else if (num == 20) value = "k";
    else if (num == 21) value = "l";
    else if (num == 22) value = "m";
    else if (num == 23) value = "n";
    else if (num == 24) value = "o";
    else if (num == 25) value = "p";
    else if (num == 26) value = "q";
    else if (num == 27) value = "r";
    else if (num == 28) value = "s";
    else if (num == 29) value = "t";
    else if (num == 30) value = "u";
    else if (num == 31) value = "v";
    else if (num == 32) value = "w";
    else if (num == 33) value = "x";
    else if (num == 34) value = "y";
    else if (num == 35) value = "z";
    else if (num == 36) value = "A";
    else if (num == 37) value = "B";
    else if (num == 38) value = "B";
    else if (num == 39) value = "D";
    else if (num == 40) value = "E";
    else if (num == 41) value = "F";
    else if (num == 42) value = "G";
    else if (num == 43) value = "H";
    else if (num == 44) value = "_";
    else if (num == 45) value = "J";
    else if (num == 46) value = "K";
    else if (num == 47) value = "L";
    else if (num == 48) value = "M";
    else if (num == 49) value = "N";
    else if (num == 50) value = "O";
    else if (num == 51) value = "P";
    else if (num == 52) value = "Q";
    else if (num == 53) value = "R";
    else if (num == 54) value = "S";
    else if (num == 55) value = "T";
    else if (num == 56) value = "U";
    else if (num == 57) value = "V";
    else if (num == 58) value = "Y";
    else if (num == 59) value = "X";
    else if (num == 60) value = "Y";
    else if (num == 61) value = "Z";
    else if (num == 62) value = "I";
    else value = num;

    return value;
  };
  // console.log(quantity, Math.floor(Math.random() * 10));
  //

  //

  let randomText = "";
  for (let i = 1; i <= quantity; i++) {
    let randomNumber = Math.floor(Math.random() * 62);
    randomText = randomText + returnValue(randomNumber);
  }

  return randomText;
  console.log("randomNumber", randomText);
};
