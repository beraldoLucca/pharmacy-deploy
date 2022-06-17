import styles from './styles.module.scss';

export default function Header(){
    return (
        <header className={styles.headerContainer}>
            <p>
                <strong>
                    Farmácia de alto custo
                </strong>
            </p>
        </header>
    );
}