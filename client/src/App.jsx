import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './features/dashboard/Dashboard'
import Stats from './features/stats/Stats'
import HealthCheck from './features/health-check/HealthCheck'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/code/:code' element={<Stats />} />
          <Route path='/healthz' element={<HealthCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App