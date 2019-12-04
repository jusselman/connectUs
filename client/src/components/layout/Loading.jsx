import React from 'react';
import loading from './loading.gif';

export default () => (
    <div>
        <img
            src={loading}
            style={{ width: '500px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />

    </div>
)