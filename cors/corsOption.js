const corsOptions = {
  origen: " http://localhost:4200",
  optionsSuccessStatus: 200, //  algunos navegadores heredados (IE11, varios SmartTV) se bloquean en 204
};

module.exports = { corsOptions };
