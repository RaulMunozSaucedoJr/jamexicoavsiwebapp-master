const {
  defineConfig
} = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 414,
  viewportHeight: 896,
  e2e: {
    setupNodeEvents(on, config) {},
  },
});