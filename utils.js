const { curry } = require("ramda");

const log = curry((label, value) => {
  console.log(label, value);

  return value;
});

const getAsync = async getFn => {
  try {
    return await getFn();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { log, getAsync };
