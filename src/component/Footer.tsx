import React, { useState, useEffect } from 'react';
import { IFooterProps } from './../todointerface/ITodo';

const Footer = (props: IFooterProps) => {

    const { isDisplayForm, setStatusFilter, status, numberItem, isOpen } = props;
    const [isActive, setIsActive] = useState<string>('ALL');

    const handleCheckAll = (sts: string) => {
        setStatusFilter(sts);
        setIsActive("ALL");
    }

    const handleCheckActive = (sts: string) => {
        setStatusFilter(sts);
        setIsActive("ACTIVE");
    }

    const handleCheckComplete = (sts: string) => {
        setStatusFilter(sts);
        setIsActive("ACTIVE");
    }
    
    return (
        <li className={`${ isDisplayForm ? 'footer ' : 'displayform-true footer '} ${isOpen ? '' : 'collspan-isOpen-true'}`}>
            <span className="todo-count">
                <strong>{numberItem}</strong>
                <span> </span>
                <span>items</span>
                <span> left</span>
            </span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <a><span className={status === 'ALL' ? 'active': ''} onClick={() => handleCheckAll("ALL")}>All</span></a>&emsp;&emsp;
            <a><span className={status === 'ACTIVE' ? 'active': ''} onClick={() => handleCheckActive("ACTIVE")}>Active</span></a>&emsp;&emsp;
            <a><span className={status === 'COMPLETED' ? 'active': ''} onClick={() => handleCheckComplete("COMPLETED")}>Complete</span></a>
        </li>
    )
}

export default Footer;