import styles from './scrolltotoday.module.scss'

export default function ScrollToToday() {
    const handleClick = () => {
        document.querySelector('.fc-day-today').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        })
    }

    return (
        <a uk-tooltip="Xem lịch hôm nay"
            onClick={handleClick}
            className={`${styles.today} uk-icon-button`}
            uk-icon="icon: location; ratio: 1.5">
        </a>
    )
}