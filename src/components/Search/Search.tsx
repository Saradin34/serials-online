import {FC} from "react";
import './Search.scss';

const Search: FC = () => {
    return (
        <div className="search">
            <h3>Поиск</h3>
            <div className="search-container">
                <input className='search-input' type="text" placeholder='Введите запрос'/>
                <button className="search-btn">Искать</button>
            </div>
            <div className="search-options">
                <button className="search-genre">по жанру</button>
                <span>|</span>
                <button className="search-year">по году</button>
                <span>|</span>
                <button className="search-review">по озвучке</button>
            </div>
        </div>
    );
};

export default Search;