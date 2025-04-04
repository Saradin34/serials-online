import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AnimeDetails.scss';

interface VideoUrl {
    translation: string;
    url: string;
}

interface Episode {
    number: number;
    title: string;
    videoUrls: VideoUrl[];
}

interface AnimeDetails {
    id: string;
    title: string;
    russianTitle: string;
    posterUrl: string;
    rating: number;
    episodesCount: number;
    genres: string[];
    description: string;
    year: number;
    status: string;
    episodes: Episode[];
}

const AnimeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<AnimeDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/anime/${id}`);

                if (!response.data.success) {
                    throw new Error(response.data.message || 'Anime not found');
                }

                setAnime(response.data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!anime) return <div className="not-found">Аниме не найдено</div>;

    return (
        <div className="anime-details">
            <div className="header">
                <div className="poster">
                    <img
                        src={anime.posterUrl}
                        alt={anime.russianTitle}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                    />
                </div>
                <div className="info">
                    <h1>{anime.russianTitle}</h1>
                    <h2>{anime.title}</h2>
                    <div className="meta">
                        <span>★ {anime.rating.toFixed(1)}</span>
                        <span>{anime.year}</span>
                        <span>{anime.status}</span>
                        <span>{anime.episodesCount} эпизодов</span>
                        <span>{anime.genres.join(', ')}</span>
                    </div>
                    <div className="description">
                        <h3>Описание:</h3>
                        <p>{anime.description}</p>
                    </div>
                </div>
            </div>

            <div className="episodes">
                <h2>Список серий:</h2>
                <div className="episode-list">
                    {anime.episodes.map((episode) => (
                        <div key={episode.number} className="episode-card">
                            <div className="episode-header">
                                <h3>Серия {episode.number}</h3>
                                {episode.title && <span>{episode.title}</span>}
                            </div>
                            <div className="translations">
                                {episode.videoUrls.map((trans) => (
                                    <a
                                        key={`${episode.number}-${trans.translation}`}
                                        href={trans.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="translation-btn"
                                    >
                                        {trans.translation}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnimeDetails;