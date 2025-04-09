import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnimeModal.scss';

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

interface AnimeModalProps {
    anime?: Anime;
    onClose: () => void;
}

const AnimeModal: React.FC<AnimeModalProps> = ({ anime, onClose }) => {
    const [detailedInfo, setDetailedInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!anime?.id) {
            setError('Неверный ID аниме');
            setLoading(false);
            return;
        }

        const fetchDetailedInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://shikimori.one/api/animes/${anime.id}`);
                setDetailedInfo(response.data || null);
            } catch (err) {
                setError('Ошибка при загрузке детальной информации');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedInfo();

        // Инициализация Kinobox
        const script = document.createElement('script');
        script.src = 'https://p.ddbb.lol/kinobox.min.js';
        script.async = true;
        script.onload = () => {
            if (window.kbox && anime?.id) {
                try {
                    window.kbox(`#kinobox-${anime.id}`, {
                        baseUrl: 'https://p.ddbb.lol/',
                        players: {
                            alloha: { enable: true },
                            cdnmovies: { enable: true }
                        }
                    });
                } catch (e) {
                    console.error('Kinobox init error:', e);
                }
            }
        };
        script.onerror = () => {
            console.error('Failed to load Kinobox script');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [anime?.id]);

    if (!anime) {
        return null;
    }

    return (
        <div className="anime-modal">
            <div className="anime-modal-content">
                <button className="close-button" onClick={onClose}>×</button>

                <div className="anime-modal-header">
                    <h2>{anime.russian || 'Название не указано'}</h2>
                    {anime.image?.original && (
                        <img
                            src={`https://shikimori.one${anime.image.original}`}
                            alt={anime.russian || 'Аниме'}
                            className="modal-image"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    )}
                </div>

                <div className="anime-modal-body">
                    {loading && <div className="loading-indicator">Загрузка...</div>}
                    {error && <div className="error-message">{error}</div>}

                    {!loading && !error && (
                        <>
                            {detailedInfo?.description && (
                                <p><strong>Описание:</strong> {detailedInfo.description}</p>
                            )}
                            {detailedInfo?.genres?.length > 0 && (
                                <p><strong>Жанры:</strong> {detailedInfo.genres.map(g => g.name).join(', ')}</p>
                            )}
                            {detailedInfo?.studios?.length > 0 && (
                                <p><strong>Студии:</strong> {detailedInfo.studios.map(s => s.name).join(', ')}</p>
                            )}

                            <div className="video-player">
                                <h3>Смотреть онлайн</h3>
                                {anime.id && (
                                    <div id={`kinobox-${anime.id}`} data-kinopoisk={anime.id}></div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeModal;