import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from '@/store'
import FastClick from 'fastclick'
import 'styles/reset.css'
import 'styles/common.css'

import App from './App'
setConfig({
  showReactDomPatchNotification: false
})
;(FastClick as any).attach(document.body)

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
