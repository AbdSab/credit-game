import { useEffect, useState } from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import axios from 'axios';
import { v4 } from 'uuid';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Loaner() {
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [turned, setTurned] = useState(false);
  const [done, setDone] = useState(false);
  const [loan, setLoan] = useState(1);
  const [id, setId] = useState(null);

  useEffect(() => {
    if(sessionStorage.getItem('loaner_id')) setId(sessionStorage.getItem('loaner_id'));
    else {
      const _id = v4();
      sessionStorage.setItem('loaner_id', _id);
      setId(_id);
    }
  }, []);

  const sendResponse = async response => {
    await axios.post('https://card-api-game.herokuapp.com/card', {
        id,
        gain: selected,
        accepted: response,
        loan,
    });
    setDone(true);
  }

  useEffect(() => {
    setValues(shuffleArray([300, 100, 200]));
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
          <div style={{width: '100%', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <button onClick={() => window.location.reload()}>Rejouer</button>
          </div>
      )}
    </div>
  );
}