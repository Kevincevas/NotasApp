//variables de entorno paso 2 -> jest.setup
export const getEnvironments = () => {
    
    //cargando las variables de entorno
    import.meta.env;

    return {
        ...import.meta.env
    }

}