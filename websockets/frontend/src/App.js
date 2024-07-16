import { Console } from "./components/Console";
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="relative h-[100vh] w-[100vw] bg-[black] text-[white]">
      <Console/>
      <MyModal/>
    </div>
  );
}

function MyModal() {
  return ReactDOM.createPortal(
    <div className="modal">
      <p>This is part of the modal</p>
    </div>,
    document.body
  );
}

export default App;
