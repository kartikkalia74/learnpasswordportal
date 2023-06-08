import  crypto from 'crypto-js'


export function encrypt(text:string, password:string) {
  const cipher = crypto.AES.encrypt(text, password).toString();
 
  return cipher;
}

export function decrypt(encryptedText:string, password:string) {
  const decipher = crypto.AES.decrypt(encryptedText, password).toString();

  return decipher;
}

