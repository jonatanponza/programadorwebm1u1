var hoy = new Date()

console.log('Hoy es ' + hoy)

let i
for (let i = 0; i < 10; i++) {
    console.log(i)   
}

const moment = require ('moment')
moment.locale('es')

console.log('Naci hace ' + moment('07/06/1989','DD/MM/YYYY').fromNow())