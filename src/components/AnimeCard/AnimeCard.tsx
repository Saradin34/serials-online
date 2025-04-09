import React, { forwardRef, useState } from 'react';
import './AnimeCard.scss';
import AnimeModal from './AnimeModal';

interface Anime {
    id: number;
    name?: string;
    russian?: string;
    image?: {
        original?: string;
        preview?: string;
    };
    kind?: string;
    episodes?: number;
    episodes_aired?: number;
    score?: string;
    status?: string;
}

interface AnimeCardProps {
    anime?: Anime;
}

const AnimeCard = forwardRef<HTMLDivElement, AnimeCardProps>(({ anime }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!anime) {
        return <div className="anime-card-placeholder" />;
    }

    return (
        <>
            <div
                ref={ref}
                className="anime-card"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="anime-card-title">
                    <h2 className="anime-card-h2">{anime.russian || 'Название не указано'}</h2>
                </div>
                <div className="anime-card-content">
                    {anime.image?.original && (
                        <>
                            {!imageLoaded && (
                                <div className="anime-card-image-placeholder" />
                            )}
                            <img
                                src={`https://shikimori.one${anime.image.original}`}
                                alt={anime.russian || 'Аниме'}
                                className={`anime-card-image ${imageLoaded ? 'loaded' : 'loading'}`}
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    setImageLoaded(true);
                                }}
                            />
                        </>
                    )}
                    <div className="anime-card-text">
                        <p><strong>Тип:</strong> {anime.kind || 'Не указан'}</p>
                        <p>
                            <strong>Эпизоды:</strong>
                            {anime.episodes ? ` ${anime.episodes}` : ' Не указано'}
                            {anime.episodes_aired ? ` (${anime.episodes_aired} вышло)` : ''}
                        </p>
                        <p><strong>Рейтинг:</strong> {anime.score || 'Не указан'}</p>
                        <p><strong>Статус:</strong> {anime.status || 'Не указан'}</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <AnimeModal
                    anime={anime}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
});

AnimeCard.displayName = 'AnimeCard';

export default AnimeCard;