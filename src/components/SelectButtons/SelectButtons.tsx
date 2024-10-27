import React from 'react';
import styles from './SelectButtons.module.scss';

type SelectButtonsProps = {
    label: string;
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
};

const SelectButtons: React.FC<SelectButtonsProps> = ({ label, options, selectedOption, setSelectedOption }) => {
    return (
        <div className={styles.buttonGroupBlock}>
            <h3 className={styles.groupCaption}>{label}:</h3>
            <div className={styles.buttonsGroup}>
                {options.map(option => (
                    <button
                        key={option}
                        className={`${styles.button} ${selectedOption === option ? styles.active : ''}`}
                        onClick={() => setSelectedOption(option)}
                    >
                        <span>{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectButtons;
