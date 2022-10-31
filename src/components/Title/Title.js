import css from './Title.module.css';

const Title = ({icon_name, caption}) => {
    return (
        <div className={`${css.flex} ${css.marginTop20}`}>
            <img src={`${icon_name}`} alt="icon"/>
            <div className={`${css.marginLeft}`}><h1>{caption}</h1></div>
        </div>
    );
};

export  {Title};