import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './components/app'
import { reducers } from './reducers/index'

const store = createStore(reducers, applyMiddleware(thunk))
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)