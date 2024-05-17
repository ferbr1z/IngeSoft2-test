const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes configurar eventos de Node si es necesario
    },
    experimentalRunAllSpecs: true,  // Habilita la ejecución de todos los specs a la vez
  },
});
