'use client';

import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar';
import { classNames } from 'primereact/utils';
import React, { useContext, useEffect, useState } from 'react';
import { AppConfigProps, LayoutConfig, LayoutState } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const AppConfig = (props: AppConfigProps) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: true }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: false }));
    };

    const _changeTheme = (theme: string, colorScheme: string) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    


    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            {/* <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button> */}

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                <h5>PrimeOne Design</h5>
                <div className="grid">
                    <div className="col-3">
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('lara-light-indigo', 'light')}
                        >
                            <img
                                src="/layout/images/themes/lara-light-indigo.png"
                                className="w-2rem h-2rem"
                                alt="Lara Light Indigo"
                            />
                        </button>
                    </div>
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
                            onClick={() => _changeTheme('lara-light-purple', 'light')}
                        >
                            <img
                                src="/layout/images/themes/lara-light-purple.png"
                                className="w-2rem h-2rem"
                                alt="Lara Light Purple"
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
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('lara-dark-indigo', 'dark')}
                        >
                            <img
                                src="/layout/images/themes/lara-dark-indigo.png"
                                className="w-2rem h-2rem"
                                alt="Lara Dark Indigo"
                            />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-blue', 'dark')}>
                            <img
                                src="/layout/images/themes/lara-dark-blue.png"
                                className="w-2rem h-2rem"
                                alt="Lara Dark Blue"
                            />
                        </button>
                    </div>
                    <div className="col-3">
                        <button
                            className="p-link w-2rem h-2rem"
                            onClick={() => _changeTheme('lara-dark-purple', 'dark')}
                        >
                            <img
                                src="/layout/images/themes/lara-dark-purple.png"
                                className="w-2rem h-2rem"
                                alt="Lara Dark Purple"
                            />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-teal', 'dark')}>
                            <img
                                src="/layout/images/themes/lara-dark-teal.png"
                                className="w-2rem h-2rem"
                                alt="Lara Dark Teal"
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
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('soho-dark', 'dark')}>
                            <img src="/layout/images/themes/soho-dark.png" className="w-2rem h-2rem" alt="Soho Dark" />
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('viva-light', 'light')}>
                            <img
                                src="/layout/images/themes/viva-light.svg"
                                className="w-2rem h-2rem"
                                alt="Viva Light"
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
};

export default AppConfig;
