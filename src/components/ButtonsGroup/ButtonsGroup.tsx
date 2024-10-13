import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './ButtonsGroup.module.scss';

interface ButtonsGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const ButtonsGroup = ({ children, className, ...props }: ButtonsGroupProps) => {
    return (
        <div className={classNames(styles.ButtonsGroup, className)} {...props}>
            {children}
        </div>
    );
};

export default ButtonsGroup;
