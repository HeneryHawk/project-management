module.exports = {
    transpileDependencies: ["vuetify"],
    configureWebpack: {
        devtool: "source-map",
    },
    devServer: {
        proxy: "http://localhost:3001/",
    },
    pages: {
        index: {
            entry: "src/main.ts",
            title: "Projektmanagement",
        },
    },
};
