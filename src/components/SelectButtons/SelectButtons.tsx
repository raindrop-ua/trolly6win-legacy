import React from 'react';
import styles from './ScheduleList.module.scss';

type SelectButtonsProps = {
    label: string;
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
};

const SelectButtons: React.FC<SelectButtonsProps> = ({ label, options, selectedOption, setSelectedOption }) => {
    return (
        <>
            <h2 className={styles.caption}>{label}:</h2>
            <div>
                {options.map(option => (
                    <button
                        key={option}
                        className={`${styles.button} ${selectedOption === option ? styles.active : ''}`}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </>
    );
};

export default SelectButtons;
