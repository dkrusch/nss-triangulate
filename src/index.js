import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Triangulate from './components/Triangulate'
import './index.css'

ReactDOM.render(
  <Router>
      <Triangulate />
  </Router>
  , document.getElementById('root'))