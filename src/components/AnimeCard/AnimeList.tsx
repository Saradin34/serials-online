import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import './AnimeList.scss';

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

const AnimeList: React.FC = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<boolean>(false);

    const fetchAnimeData = useCallback(async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const response = await axios.get('https://shikimori.one/api/animes', {
                params: {
                    limit: 10,
                    order: 'popularity',
                    page: page,
                },
            });

            if (!response.data || response.data.length === 0) {
                setHasMore(false);
            } else {
                setAnimeList((prev) => [...prev, ...response.data]);
            }
        } catch (err) {
            setError('Ошибка при загрузке данных');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
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
                if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="anime-container">
            <h1 className="anime-title">
                Смотреть аниме и мультсериалы онлайн все серии и сезоны
            </h1>
            <div className="anime-list">
                {animeList.map((anime, index) => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime}
                        ref={animeList.length === index + 1 ? lastAnimeElementRef : null}
                    />
                ))}
            </div>
            {loading && <div className="loading-indicator">Загрузка...</div>}
            {!hasMore && !loading && animeList.length > 0 && (
                <div className="end-message">Это все аниме!</div>
            )}
        </div>
    );
};

export default AnimeList;