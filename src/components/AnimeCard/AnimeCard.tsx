import React from 'react';
import './AnimeCard.scss';

interface AnimeCardProps {
    title: string;
    image: string;
    description: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ title, image, description }) => {
    return (
        <div className="anime-card">
            <h3>{title}</h3>
            <div className="anime-card-content">
                <img src={image} alt={title} />
                <p>{description}</p>
            </div>
        </div>
    );
};

export default AnimeCard;