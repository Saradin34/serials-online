import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchAnimeData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://shikimori.one/api/animes', {
                params: {
                    limit: 10,
                    order: 'popularity',
                    page: page,
                },
            });

            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setAnimeList((prev) => [...prev, ...response.data]);
            }
            setLoading(false);
        } catch (err) {
            setError('Ошибка при загрузке данных');
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchAnimeData();
    }, [fetchAnimeData]);

    const lastAnimeElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 className="anime-h1">
                Смотреть аниме и мультсериалы онлайн все серии и сезоны
            </h1>
            <div className="anime-list">
                {animeList.map((anime, index) => {

                    if (animeList.length === index + 1) {
                        return (
                            <div
                                ref={lastAnimeElementRef}
                                key={anime.id}
                                className="anime-card"
                            >
                                <div className="anime-card-title">
                                    <h3 className="anime-card-h1">{anime.russian}</h3>
                                </div>
                                <div className="anime-card-content">
                                    <img
                                        src={`https://shikimori.one${anime.image.original}`}
                                        alt={anime.russian}
                                        className="anime-card-image"
                                    />
                                    <div className="anime-card-text">
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
                            </div>
                        );
                    } else {
                        return (
                            <div key={anime.id} className="anime-card">
                                <div className="anime-card-title">
                                    <h3 className="anime-card-h1">{anime.russian}</h3>
                                </div>
                                <div className="anime-card-content">
                                    <img
                                        src={`https://shikimori.one${anime.image.original}`}
                                        alt={anime.russian}
                                        className="anime-card-image"
                                    />
                                    <div className="anime-card-text">
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
                            </div>
                        );
                    }
                })}
            </div>
            {loading && <div>Загрузка...</div>}
            {!hasMore && <div>Это все аниме!</div>}
        </div>
    );
};

export default AnimeCard;