import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

//para que cloudinary sepa a donde estamos apuntando al borrar
cloudinary.config({
    cloud_name: 'dm2a8s743',
    api_key: '395278895589735',
    api_secret: 'Gc4KfIts322swfX9ySUKdP2yv6s',
    secure: true,

})

describe('Pruebas en fileUpload/carga de archivos', () => {
    
    test('Debe de subir el archivo correctamente a cloudinary', async() => {
        
        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        //subiendo archivos en cloudinary
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );
        expect(typeof url).toBe('string');

        // console.log(url)
        const segments = url.split('/'); //split: ayuda a separar en segmentos
        const imageId = segments[ segments.length -1 ].replace('.jpg','');
        
        //eliminar la img de cloudinary
        await cloudinary.api.delete_resources(['journal/' + imageId], {resource_type:'image'});

    });

    test('debe de retornar null', async() => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect(url).toBe(null);
      
    })
    

})
