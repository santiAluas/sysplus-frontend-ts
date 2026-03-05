import { Column } from '@devexpress/dx-react-grid';
import { useMemo } from 'react';

export const ConfiguracionColumnaMatriculaPAgoExtraordinario = () => {

    const columns = useMemo<Column[]>(
        () => [
            {
                name: 'usuario',
                title: 'Usuario',
                width: '25%',
                align: 'center'
            },
            {
                name: 'gestor',
                title: 'Gestor',
                width: '25%',
                align: 'left'
            },
            {
                name: 'cedulaidentidad',
                title: 'Cedula',
                width: '25%',
                align: 'left'
            },
            {
                name: 'actions',
                title: 'Acciones',
                getCellValue: (row: any) => row,
                width: '25%',
                align: 'center',
                hiddenFilterColumn: true
            }
        ],
        []
    );

    return columns;
};
