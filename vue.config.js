const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: "8080",
    proxy: {
      "/front": {
        target: "https://blogo.revocat.tech",
        pathRewrite: {
          "/front": "",
        },
      },
    },
  },
});
