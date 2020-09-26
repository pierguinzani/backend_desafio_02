const envPath = {
  dev: ".env.dev",
  staging: ".env.staging",
  production: ".env",
};

require("dotenv").config({
  path: envPath[process.env.NODE_ENV],
});

module.exports = { ...process.env };


