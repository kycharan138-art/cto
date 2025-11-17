import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { TransitionProvider, LuxuryTransition } from './components/LuxuryTransition'
import { PageTransition } from './components/LuxuryTransition'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import MotionDemo from './pages/MotionDemo'
import TestPage from './pages/TestPage'
import './App.css'
import './animations.css'

function AppContent() {
  const location = useLocation()

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <LuxuryTransition>
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition path="/">
                  <Home />
                </PageTransition>
              } 
            />
            <Route 
              path="/services" 
              element={
                <PageTransition path="/services">
                  <Services />
                </PageTransition>
              } 
            />
            <Route 
              path="/booking" 
              element={
                <PageTransition path="/booking">
                  <Booking />
                </PageTransition>
              } 
            />
            <Route 
              path="/reviews" 
              element={
                <PageTransition path="/reviews">
                  <Reviews />
                </PageTransition>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <PageTransition path="/contact">
                  <Contact />
                </PageTransition>
              } 
            />
            <Route 
              path="/motion-demo" 
              element={
                <PageTransition path="/motion-demo">
                  <MotionDemo />
                </PageTransition>
              } 
            />
            <Route 
              path="/test" 
              element={
                <PageTransition path="/test">
                  <TestPage />
                </PageTransition>
              } 
            />
          </Routes>
        </LuxuryTransition>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <TransitionProvider>
        <AppContent />
      </TransitionProvider>
    </Router>
  )
}

export default App
