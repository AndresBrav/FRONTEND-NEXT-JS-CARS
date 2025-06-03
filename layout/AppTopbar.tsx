/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { AppConfigProps, LayoutConfig, LayoutState } from '@/types';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    // const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleLogOut = () => {
        setKeyAccess('');
        localStorage.removeItem('token');
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: false }));
    };

    return (
        <>
            <div className="layout-topbar">
                <Link href="/" className="layout-topbar-logo">
                    <img
                        src={`/layout/images/car-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
                        width="47.22px"
                        height={'35px'}
                        alt="logo"
                    />
                    <span>CARS</span>
                </Link>
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="p-link layout-menu-button layout-topbar-button"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars" />
                </button>{' '}
                {/* menu symbol */}
                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button"
                    onClick={showProfileSidebar}
                >
                    <i className="pi pi-ellipsis-v" />
                </button>
                <div
                    ref={topbarmenuRef}
                    className={classNames('layout-topbar-menu', {
                        'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible
                    })}
                >
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                    <Link href="/documentation">
                        <button type="button" className="p-link layout-topbar-button">
                            <i className="pi pi-cog"></i>
                            <span>Settings</span>
                        </button>
                    </Link>
                    <button type="button" className="p-link layout-topbar-button" onClick={handleLogOut}>
                        <i className="pi pi-fw pi-sign-out"></i>
                    </button>
                </div>
            </div>

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                <h5>Design</h5>
                <div className="grid">
                    <div className="col-3">
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('lara-light-blue', 'light')}
                        >
                            <img
                                src="/layout/images/themes/lara-light-blue.png"
                                className="w-2rem h-2rem"
                                alt="Lara Light Blue"
                            />
                        </button>
                    </div>

                    <div className="col-3">
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('lara-light-teal', 'light')}
                        >
                            <img
                                src="/layout/images/themes/lara-light-teal.png"
                                className="w-2rem h-2rem"
                                alt="Lara Light Teal"
                            />
                        </button>
                    </div>

                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('soho-light', 'light')}>
                            <img
                                src="/layout/images/themes/soho-light.png"
                                className="w-2rem h-2rem"
                                alt="Soho Light"
                            />
                        </button>
                    </div>

                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('viva-dark', 'dark')}>
                            <img src="/layout/images/themes/viva-dark.svg" className="w-2rem h-2rem" alt="Viva Dark" />
                        </button>
                    </div>
                </div>
            </Sidebar>
        </>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
