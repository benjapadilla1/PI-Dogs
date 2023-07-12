import React from 'react';

import styles from '../Form.module.css';

const ErrorMessage = ({ message }) => (
    <p className={styles.error}>{message}</p>
);

export default ErrorMessage;
