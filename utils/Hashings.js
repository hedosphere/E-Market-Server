//
import bcrypt from "bcrypt";

//

export const HashPassword = (password) => {
  // bcrypt
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(password, salt, (err, hashed) => {
        if (err) {
          return reject(err);
        }

        resolve(hashed);
      });
    });
  });
};

export const ComparePassword = (password, hashed) => {
  // bcrypt
  return bcrypt.compare(password, hashed);
};
