import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container)

root.render(
  <BrowserRouter>
  </BrowserRouter>
)

