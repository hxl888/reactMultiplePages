// import "@babel/polyfill";
// import 'core-js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from '@/store'
import FastClick from 'fastclick'
import App from './App'

setConfig({
  showReactDomPatchNotification: false
})
;(FastClick as any).attach(document.body)
interface AppPro {
  [key: string]: any
}

const rootElement = document.getElementById('root')
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>,
      rootElement
    )
  })
}
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  rootElement
)
