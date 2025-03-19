import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnimeCard.scss';

interface Anime {
    id: number;
    name: string;
    russian: string;
    image: {
        original: string;
        preview: string;
    };
    kind: string;
    episodes: number;
    episodes_aired: number;
    score: string;
    status: string;
}

const AnimeCard: React.FC = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await axios.get('https://shikimori.one/api/animes', {
                    params: {
                        limit: 10, // Количество аниме для загрузки
                        order: 'popularity', // Сортировка по популярности
                    },
                });
                setAnimeList(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="anime-list">
            {animeList.map((anime) => (
                <div key={anime.id} className="anime-card">
                    <img
                        src={`https://shikimori.one${anime.image.original}`}
                        alt={anime.russian}
                        className="anime-card-image"
                    />
                    <div className="anime-card-content">
                        <h3>{anime.russian}</h3>
                        <p>
                            <strong>Тип:</strong> {anime.kind}
                        </p>
                        <p>
                            <strong>Эпизоды:</strong> {anime.episodes} ({anime.episodes_aired} вышло)
                        </p>
                        <p>
                            <strong>Рейтинг:</strong> {anime.score}
                        </p>
                        <p>
                            <strong>Статус:</strong> {anime.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnimeCard;