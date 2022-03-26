import { useEffect, useState } from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import axios from 'axios';

export default function Loaner() {
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [turned, setTurned] = useState(false);
  const [done, setDone] = useState(false);

  const sendResponse = async response => {
    await axios.post('http://localhost:4000/card', {
        gain: selected,
        accepted: response,
        loan: selected/2,
    });
    setDone(true);
  }

  useEffect(() => {
    setValues([100, 200, 300]);
  }, []);

  useEffect(() => {
      if(!selected) return;
      setTimeout(() => setTurned(true), 2000);
  }, [selected])

  return (
    <div className="App">
      {!done && values && <CardList values={values} selected={selected} setSelected={setSelected}/>}
      {!done && selected && turned && (
        <Modal isLoan={true} setResponse={sendResponse} selected={selected}/>
      )}
      {done && (
          <div>Merci</div>
      )}
    </div>
  );
}