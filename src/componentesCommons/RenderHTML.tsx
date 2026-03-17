import React from 'react';
import { styled } from '@mui/material/styles';

const StyledHTML = styled('div')({
    '& strong': {
        fontWeight: 'bold',
    },
    '& em': {
        fontStyle: 'italic',
    },
});

interface RenderHTMLProps {
    html: string;
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ html }) => {
    const sanitizedHtml = `<meta charset="UTF-8">${html}`;
    return <StyledHTML dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default RenderHTML;