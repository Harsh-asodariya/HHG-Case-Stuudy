import Counter from '../../Components/Counter/counter';

import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import EmployeeTable from '../../Components/Table/table';
import './HhgCaseStudy.css'

function HhgCaseStudy() {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Counter
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Employee Details
                </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Counter/>
                </TabPane>
                <TabPane tabId="2">
                    <EmployeeTable/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default HhgCaseStudy
