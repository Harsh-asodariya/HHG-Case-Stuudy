import React from 'react';
import './Backdrop.css';

interface Props {
    show: Boolean
}

const backDrop: React.FC<Props> = ({ children, ...props }) => (
    props.show ? <div className='backDrop'>{children}</div> : null
);

export default backDrop;