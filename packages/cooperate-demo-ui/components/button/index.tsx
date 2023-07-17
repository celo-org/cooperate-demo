import { FC, HTMLProps } from 'react'
import styles from './styles.module.css'

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}
