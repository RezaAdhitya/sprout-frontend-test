import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './router'
import './App.css'
import store from './redux/store'

function App() {

  return (
    <div className='App'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
