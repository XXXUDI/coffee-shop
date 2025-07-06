import React from 'react';
import MainPage from "../pages/MainPage/MainPage.jsx";
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage.jsx';
import DeliveryResultPage from '../pages/DeliveryResultPage/DeliveryResultPage.jsx';

export const routes = [
    {path: '/', element: MainPage},
    {path: '/checkout', element: CheckoutPage},
    {path: '/delivery-result', element: DeliveryResultPage},
]
