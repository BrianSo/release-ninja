const crypto = require('crypto');
const bcrypt = require('bcrypt');
const util = require('util');

const bcryptHashAsync = util.promisify(bcrypt.hash);
const bcryptCompareAsync = util.promisify(bcrypt.compare);

const BCRYPT_SALT_DEFAULT_ROUND = 11;
const HMAC_KEY = "bc6es7yo28n4bgt73kvm3";

module.exports = {
  sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
  },
  sha256Buffer(str) {
    return crypto.createHash('sha256').update(str).digest();
  },
  async bcrypt(str, cost = BCRYPT_SALT_DEFAULT_ROUND) {
    return bcryptHashAsync(str, cost);
  },
  async bcryptCompare(str, cryptedStr) {
    return bcryptCompareAsync(str, cryptedStr);
  },


  async encrypt(text, key) {
    const IV = new Buffer(crypto.randomBytes(16)); // ensure that the IV (initialization vector) is random
    const encryptor = crypto.createCipheriv('AES-256-CBC', KEY, IV);

    encryptor.setEncoding('hex');
    encryptor.write(text);
    encryptor.end();

    const cipherText = encryptor.read();

    const hmac = crypto.createHmac('SHA256', HMAC_KEY);
    hmac.update(cipherText);
    hmac.update(IV.toString('hex')); // ensure that both the IV and the cipher-text is protected by the HMAC

    // The IV isn't a secret so it can be stored along side everything else
    return cipherText + "$" + IV.toString('hex') + "$" + hmac.digest('hex')
  },

  async decrypt(cryptedText, key) {
    const cipher_blob = cryptedText.split("$");
    const ct = cipher_blob[0];
    const IV = new Buffer(cipher_blob[1], 'hex');
    const hmac = cipher_blob[2];

    const chmac = crypto.createHmac('SHA256', HMAC_KEY);
    chmac.update(ct);
    chmac.update(IV.toString('hex'));

    if (!constant_time_compare(chmac.digest('hex'), hmac)) {
      throw new Error("Encrypted Blob has been tampered");
    }

    const decryptor = crypto.createDecipheriv('AES-256-CBC', KEY, IV);
    const decryptedText = decryptor.update(ct, 'hex', 'utf-8');
    return decryptedText + decryptor.final('utf-8');
  }
};

const constant_time_compare = function (val1, val2) {
  let sentinel = 0;

  if (val1.length !== val2.length) {
    return false;
  }


  for (let i = 0; i <= (val1.length - 1); i++) {
    sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
  }

  return sentinel === 0
};
