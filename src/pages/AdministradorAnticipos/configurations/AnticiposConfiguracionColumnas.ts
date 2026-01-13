import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const AnticiposConfiguracionColumnas = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'codigoAnticipo',
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
                align: 'left',
                getCellValue: (row: any) => {
                    if (!row.fecha) return "";

                    const date = new Date(row.fecha);

                    return new Intl.DateTimeFormat('es-EC', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }).format(date);
                }
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
                name: 'valorMatricula',
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
