const { curry } = require("ramda");

const log = curry((label, value) => {
  // eslint-disable-next-line no-console
  console.log(label, value);

  return value;
});

const getAsync = async getFn => {
  try {
    return await getFn();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { log, getAsync };
