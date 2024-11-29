import "./index.css"


import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Item () {
    return (
        <div className="container-item">
            <div className="main-header">
                <button className="menui"><SearchIcon className="icon-item"/></button>
                <button className="lan"><LanguageIcon className="icon-item"/></button>
            </div>
            <div className="image">
            </div>
            <div className="ctn-item">
                <div className="item-name">
                    <h1>Moringa</h1>
                </div>
                <div className="description"></div>
            </div>

        </div>
    )
}

export default Item