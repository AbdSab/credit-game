import { useEffect, useState } from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import axios from 'axios';

export default function Loaner() {
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [turned, setTurned] = useState(false);
  const [done, setDone] = useState(false);
  const [loan, setLoan] = useState(1);

  const sendResponse = async response => {
    await axios.post('https://card-api-game.herokuapp.com/card', {
        gain: selected,
        accepted: response,
        loan,
    });
    setDone(true);
  }

  useEffect(() => {
    setValues([300, 100, 200]);
  }, []);

  useEffect(() => {
      if(!selected) return;
      setTimeout(() => setTurned(true), 1000);
  }, [selected])

  const handleSetLoan = e => {
    const v = Number(e.target.value);
    if(isNaN(v) || v < 0 ||  v > selected) {
      return;
    }
    setLoan(Number(e.target.value));
  }

  return (
    <div className="App">
      {!done && values && <CardList values={values} selected={selected} setSelected={setSelected}/>}
      {!done && selected && turned && (
        <Modal isLoan={true} setResponse={sendResponse} selected={selected} handleSetLoan={handleSetLoan} loan={loan}/>
      )}
      {done && (
          <div>Merci</div>
      )}
    </div>
  );
}