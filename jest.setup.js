// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironments } from './src/helpers/getEnvironments';

//En caso de que no funcione setImmediate
//instalamos npm install -D setimmediate
//import 'setimmediate';

//variables de entorno paso 3
require('dotenv').config({
    path: '.env.test'
})

//configurando las variables de entorno
 //haciendo mock
jest.mock('./src/helpers/getEnvironments', () => ({
    //cuando se mande a llamar va a regresar las variables que se encuentran en el process
    getEnvironments: () => ({ ...process.env })
}))