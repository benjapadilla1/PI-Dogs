import React from 'react';

import styles from '../Form.module.css';
import ErrorMessage from './ErrorMessage';

const InputField = ({ label, name, value, onChange, required, error, placeholder }) => (
    <label className={styles.label}>
        {label}:
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={styles.input}
        />
        {error && <ErrorMessage message={error} />}
    </label>
);

export default InputField;
