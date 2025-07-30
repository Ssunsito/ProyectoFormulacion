import './App.css'
import Rutas from './routes/Rutas.jsx';
import { ChatProvider } from './ChatContext.jsx';
function App() {
  return (
   <ChatProvider>
       <Rutas/>
    </ChatProvider>
  );
}
export default App;
