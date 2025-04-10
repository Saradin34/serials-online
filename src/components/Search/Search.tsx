import {FC, useState} from "react";
import './Search.scss';

const Search: FC = () => {
    const [genre, setGenre] = useState<string[] | null>(null);
    const [year, setYear] = useState<number[] | null>(null);
    const [review, setReview] = useState<string[] | null>(null);

    const data = {
        genre: ['мелодрамма', 'комедия', 'ужасы'],
        year: [1998, 1999, 2000, 2001],
        review: ['AniDum', 'DreamCast', 'AniLibria', 'Дубляж']
    };

    const handleViewList = (e: any) => {
        e.preventDefault();
        console.log(e.target.value)
        if (e.target.value === 'genre') {
            setGenre(data.genre)
            setYear(null)
            setReview(null);
        }
        if (e.target.value === 'year') {
            setGenre(null)
            setYear(data.year)
            setReview(null);
        }
        if (e.target.value === 'review') {
            setGenre(null)
            setYear(null);
            setReview(data.review);
        }
    }
    return (
        <div className="search">
            <h3>Поиск</h3>
            <div className="search-container">
                <input className='search-input' type="text" placeholder='Введите запрос'/>
                <button className="search-btn">Искать</button>
            </div>
            <div className="search-options">
                <button className="search-genre" value="genre" onClick={handleViewList}>по жанру</button>
                <span>|</span>
                <button className="search-year" value="year" onClick={handleViewList}>по году</button>
                <span>|</span>
                <button className="search-review" value="review" onClick={handleViewList}>по озвучке</button>
            </div>

            <ul style={{color: "white"}}>
                {genre !== null &&
                    genre.map((list) => (
                        <li>{list}</li>
                    ))
                }
                {year !== null &&
                    year.map((list) => (
                        <li>{list}</li>
                    ))
                }
                {review !== null &&
                    review.map((list) => (
                        <li>{list}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Search;