/* eslint-disable security/detect-unsafe-regex */
const ms = require("ms");
const mongoose = require("mongoose");
const getPasswordValidator = require("password-validator");

const passwordValidator = new getPasswordValidator();
passwordValidator
  .is()
  .min(8)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase();

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const email = (email) => {
  return emailRegex.test(String(email).toLowerCase());
};

const birthDate = (date) => {
  const min = new Date(new Date() - ms("150y"));
  const max = new Date(new Date() - ms("1y"));
  return date >= min && date <= max;
};

const phoneNumber = (number) => {
  if (!number || typeof number !== "string") return false;
  let temp = number.replace(/[+()-]/g, "");
  if (Number.isInteger(temp) || temp.length < 10) return false;
  return true;
};

const password = (pass) => {
  return passwordValidator.validate(pass);
};

const location = (loc) => {
  const lat = loc[0];
  const lng = loc[1];
  return -90 <= lat && lat <= 90 && -180 <= lng && lng <= 180;
};

const mongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  email: email,
  password: password,
  birthDate: birthDate,
  phoneNumber: phoneNumber,
  location: location,
  mongoId: mongoId
};
