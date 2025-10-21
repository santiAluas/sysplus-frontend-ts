import React from 'react'
import { Card, CardContent, Typography, Box, CardHeader } from '@mui/material';
const Agencysummary = (props) => {
    const {nameAgency, agencyPercentage, tittle, lastDate, nameGestor, status } = props
    return (
        <>
            <Card sx={{ width: '100%', padding: 2 }}>
                <CardHeader sx={{ backgroundColor: '#000000', color: '#333', padding: 1, borderRadius:'8px'}} 
                           title={tittle}/>
                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
                        <Typography variant="h4" color={status === "ok"?"green":"red"}>
                            {agencyPercentage}%
                        </Typography>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary" align="right">
                                {nameAgency}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" align="right">
                                {nameGestor}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                        {lastDate}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Agencysummary