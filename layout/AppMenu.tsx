/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'User Options',
            items: [
                { label: 'Consult Details', icon: 'pi pi-fw pi-id-card', to: '/uikit/users/consultdetails' },
                { label: 'Consult One Detail', icon: 'pi pi-fw pi-id-card', to: '/uikit/users/consultonedetail' },
                { label: 'Add User', icon: 'pi pi-fw pi-id-card', to: '/uikit/users/adduser' },
                { label: 'Update User', icon: 'pi pi-fw pi-id-card', to: '/uikit/users/updateuser' },
                { label: 'Delete User', icon: 'pi pi-fw pi-id-card', to: '/uikit/users/deleteuser' },
                { label: 'Details Cars ', icon: 'pi pi-car', to: '/uikit/cars/getcars' },
                { label: 'List Files ', icon: 'pi pi-file', to: '/uikit/cars/files/listfiles' },
                { label: 'use Memo', icon: 'pi pi-fw pi-id-card', to: '/uikit/useMemoReact' },
                { label: 'use Callback', icon: 'pi pi-fw pi-id-card', to: '/uikit/useCallbackReact' },
                // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                // { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                // { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                // { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                // { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                // { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                // { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                // { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' }
                // { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
            ]
        },
        {
            label: 'Login',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/auth/login'
                        }
                        // {
                        //     label: 'Error',
                        //     icon: 'pi pi-fw pi-times-circle',
                        //     to: '/auth/error'
                        // },
                        // {
                        //     label: 'Access Denied',
                        //     icon: 'pi pi-fw pi-lock',
                        //     to: '/auth/access'
                        // }
                    ]
                }
                // {
                //     label: 'Crud',
                //     icon: 'pi pi-fw pi-pencil',
                //     to: '/pages/crud'
                // },
                // {
                //     label: 'Not Found',
                //     icon: 'pi pi-fw pi-exclamation-circle',
                //     to: '/pages/notfound'
                // },
                // {
                //     label: 'Empty',
                //     icon: 'pi pi-fw pi-circle-off',
                //     to: '/pages/empty'
                // }
            ]
        },
        {
            label: 'Get Started',
            items: [
                // {
                //     label: 'Documentation',
                //     icon: 'pi pi-fw pi-question',
                //     to: '/documentation'
                // },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/AndresBrav/FRONTEND-NEXT-JS-CARS.git',
                    target: '_blank'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
