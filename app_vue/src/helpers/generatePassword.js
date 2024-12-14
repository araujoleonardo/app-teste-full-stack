function generatePassword(length, useUppercase, useLowercase, useNumbers, useSpecialChars) {
  let charset = "";
  if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (useNumbers) charset += "0123456789";
  if (useSpecialChars) charset += "!@#$%^&*()-_+="; // Adicione mais caracteres especiais

  if (charset === "") {
    console.error("Nenhum tipo de caractere selecionado.");
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default generatePassword;
