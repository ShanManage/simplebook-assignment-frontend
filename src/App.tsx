import AppRoutes from "./routes"
import './styles/main.scss'
import UseNotifier from './utils/helpers/UseNotifier';

function App() {
  UseNotifier();
  return (<AppRoutes />)
}

export default App
