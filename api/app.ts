import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath  } from 'react-router-dom'
import App from '../client/src/components/App'


const isDev = (process.env.NODE_ENV !== 'production')

export function handleRender(req, res, next) {
    console.log(' [x] Request for', req.url)
        
        let initialState = {}

        const html  = renderToString(React.createElement(App));
        
        res.render('index', { html: html, initialState: JSON.stringify(initialState)})


    // Send the rendered page back to the client with the initial state
  }