import React from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import AnimeList from '../AnimeCard/AnimeList.tsx';
import './MainContent.scss';

const MainContent: React.FC = () => {
    const animeList = [
        {
            title: 'Название аниме 1',
            image: 'https://via.placeholder.com/100x150',
            description: 'Описание аниме 1',
        },
        {
            title: 'Название аниме 2',
            image: 'https://via.placeholder.com/100x150',
            description: 'Описание аниме 2',
        },
    ];

    return (
        <div className="main-content">
            {animeList.map((anime, index) => (
                <AnimeList key={index} {...anime} />
            ))}
        </div>
    );
};

export default MainContent;