import React, { } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props : {show : boolean, children : any}) => {

    return (
        <>
            <Backdrop show={props.show} />
            <div
                className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </>
    );

};

export default React.memo(modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children);