import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const InformationJobs = ({ companie, width }) => {
    return (
        <>
            <Card sx={{ maxWidth: width }} elevation={3}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                        {companie.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>RUC:</strong>  {companie.ruc}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>TIPO :</strong> {companie.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>DIRECCION:</strong> {companie.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>OCUPACION:</strong> {companie.occupation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>LOCALIZACION:</strong>  {companie.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>SUELDO:</strong> {companie.salary}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default InformationJobs