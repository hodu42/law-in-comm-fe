import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';

export const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}; 