import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const AnticiposConfiguracionColumnas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'codigoanticipo',
                title: 'Codigo Anticipo',
                width: '10%',
                align: 'center'
            },
            {
                name: 'cliente',
                title: 'Cliente',
                width: '10%',
                align: 'left'
            },
            {
                name: 'telefono',
                title: 'Telefono',
                width: '10%',
                align: 'left'
            },
            {
                name: 'fecha',
                title: 'Fecha',
                width: '10%',
                align: 'left'
            },
            {
                name: 'gestor',
                title: 'Gestor',
                width: '10%',
                align: 'left'
            },
            {
                name: 'factura',
                title: 'Factura',
                width: '10%',
                align: 'left'
            },
            {
                name: 'valormatricula',
                title: 'Valor Matricula',
                width: '10%',
                align: 'left'
            },
            {
                name: 'ramv',
                title: 'Ramv',
                width: '10%',
                align: 'left'
            },
            {
                name: 'ciudad',
                title: 'Ciudad',
                width: '10%',
                align: 'left'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '10%',
                align: 'center',
                hiddenFilterColumn: true
            }
        ],
        []
    );

    return columns;
};
