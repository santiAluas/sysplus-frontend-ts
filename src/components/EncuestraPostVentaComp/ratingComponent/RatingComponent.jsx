// RatingComponent.js

import React, { useState } from 'react';
import './RatingComponent.css';
import Start from '../imgStarts/Start';
import StartFull from '../imgStarts/StartFull';

const RatingComponent = ({  setCalificacion }) => {
    const [selectedRating, setSelectedRating] = useState(null);
    const stars = Array.from({ length: 11 }, (_, index) => index);
    const [color, setColor] = useState("#00FFFFFF")

    const handleStarClick = (index) => {
        setSelectedRating(index);
        setColor(index <= 6 ? 'red' : index <= 8 ? 'orange' : 'green')
        setCalificacion(index);
    };

    return (
        <div className="rating-container">
            {stars.map((star, index) => (
                <div key={index} onClick={() => handleStarClick(index)}>
                    {selectedRating !== null && index <= selectedRating ? (
                        <StartFull color={color} number={index} width="70" height="50" />
                    ) : (
                        <Start color={index <= 6 ? 'red' : index <= 8 ? 'orange' : 'green'} number={index} width="70" height="50" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default RatingComponent;
