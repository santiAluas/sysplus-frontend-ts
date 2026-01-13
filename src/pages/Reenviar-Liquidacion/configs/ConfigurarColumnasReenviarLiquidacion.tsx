import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfigSorteoTikTok = () => {
    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'ci',
                title: 'Cedula',
                width: '10%',
                align: 'center',
            },
            {
                name: 'nombrepropietario',
                title: 'Cliente',
                width: '26%',
                align: 'left'
            },
            {
                name: 'agencia',
                title: 'Agencia',
                width: '30%',
                align: 'left'
            },
            {
                name: 'factura',
                title: 'Factura',
                width: '20%',
                align: 'left'
            },
            {
                name: 'fecha',
                title: 'Fecha',
                width: '10%',
                align: 'left'
            },
            
        ],
        []
    );

    return columns;
};
