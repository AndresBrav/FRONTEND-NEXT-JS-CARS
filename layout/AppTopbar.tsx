'use client';

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef, LayoutConfig } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import { Sidebar } from 'primereact/sidebar';
import { PrimeReactContext } from 'primereact/api';
import { Toast } from 'primereact/toast';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, setLayoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);
    const [configVisible, setConfigVisible] = useState(false);

    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const { keyAccess, setKeyAccess } = useContext(TokenContext);

    const toast = useRef<Toast>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleLogOut = () => {
        setKeyAccess('');
        localStorage.removeItem('token');
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'You left the session',
            life: 5000
        });
    };

    const handleSettingsClick = () => {
        setConfigVisible(true);
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    return (
        <>
            <div className="layout-topbar">
                <Toast ref={toast} /> {/* <- references at toast */}
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
                </button>
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

                    <button type="button" className="p-link layout-topbar-button" onClick={handleSettingsClick}>
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>

                    <button type="button" className="p-link layout-topbar-button" onClick={handleLogOut}>
                        <i className="layout-menuitem-icon pi pi-fw pi-sign-in"></i>
                    </button>
                </div>
            </div>
            <Sidebar
                visible={configVisible}
                onHide={() => setConfigVisible(false)}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                <h5>PrimeOne Design</h5>
                <div className="grid">
                    {[
                        ['lara-light-indigo', 'light'],
                        ['lara-light-blue', 'light'],
                        ['lara-light-purple', 'light'],
                        ['lara-light-teal', 'light'],
                        ['lara-dark-indigo', 'dark'],
                        ['lara-dark-blue', 'dark'],
                        ['lara-dark-purple', 'dark'],
                        ['lara-dark-teal', 'dark'],
                        ['soho-light', 'light'],
                        ['soho-dark', 'dark'],
                        ['viva-light', 'light'],
                        ['viva-dark', 'dark']
                    ].map(([theme, scheme]) => (
                        <div className="col-3" key={theme}>
                            <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme(theme, scheme)}>
                                <img
                                    src={`/layout/images/themes/${theme}.${theme.includes('viva') ? 'svg' : 'png'}`}
                                    className="w-2rem h-2rem"
                                    alt={theme}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </Sidebar>
        </>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
