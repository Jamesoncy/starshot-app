const mainApp = {
    name: 'STARSHOT-FRONT',
    script: './server.js',
    exec_mode : "cluster",
    instances : "max"
}
const apps = [mainApp]

module.exports = { apps }
  