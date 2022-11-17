import css from './Message.module.css';

const Message = ({icon, title, text, c, id}) => {
    const click = () => {
        document.getElementById(id).style.display = 'none';
    }

    return (
        <div id={id} className={`${css.message}`}>
            <div className={`${css.message_title} ${css.d_flex}`}>
                <div className={`${css.d_flex}`}>
                    <div>
                        <img src={icon} alt="icon"/>
                    </div>
                    <div className={`${css.title_size}`}>{title}</div>
                </div>

                <div className={`${css.close}`} onClick={click}>
                    <img src={c} alt="close"/>
                </div>
            </div>
            <div className={`${css.message_text}`}>{text}</div>
        </div>
    );
};

export {Message};