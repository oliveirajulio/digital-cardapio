import './Styles.css'
import Router from './router'
import { Analytics } from '@vercel/analytics/react'; // ou de onde vier o seu Analytics


function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  );
}

export default App;
