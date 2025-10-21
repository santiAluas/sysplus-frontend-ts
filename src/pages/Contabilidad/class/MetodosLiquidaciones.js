export const GenerarNombreColumnas = (respuesta , setColumns) => {
    if (respuesta.length > 0) {
        const dynamicColumns = Object.keys(respuesta[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 150,
        }));
        setColumns(dynamicColumns);
    }
}

export function sonObjetosIguales(obj1, obj2, camposExcluidos = []) {
    const filtrarCampos = (obj) => {
        return Object.keys(obj)
            .filter(key => !camposExcluidos.includes(key)) // Excluir los campos
            .reduce((nuevoObj, key) => {
                nuevoObj[key] = obj[key];
                return nuevoObj;
            }, {});
    };

    const objFiltrado1 = filtrarCampos(obj1);
    const objFiltrado2 = filtrarCampos(obj2);
    return JSON.stringify(objFiltrado1) === JSON.stringify(objFiltrado2);
}