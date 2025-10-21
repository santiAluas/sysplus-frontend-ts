import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large"  />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
const CalificacionComp = ({  pregunta, setCalificacion, calificacion  }) => {
  const handleRating = (value) => {
    calificacion = value;
  }

  const handleCalificacionChange = (nuevaCalificacion) => {
    // Lógica adicional si es necesario antes de establecer la calificación
    setCalificacion(nuevaCalificacion);
  };
  return (
    <>
      <Paper
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#e2e2e2',
          color: 'black',
          width: "90%",
        }}>
        <Typography variant="h6" align='center'>{pregunta}</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <StyledRating
            name="highlight-selected-only"
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            onChange={(e, value) => handleCalificacionChange(value)}
            size="large"
          />
        </Stack>

      </Paper>
    </>
  )
}

export default CalificacionComp