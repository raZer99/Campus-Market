import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/header.module.css";
import categories from './CategoriesList';

function Categories(props) {

    const navigate = useNavigate();

    return (
        <div className={styles.catContainer}>
            <div>
                <span className={styles.pr3}>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => navigate('/category/' + item)} key={index} className={styles.category}> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}


export default Categories;