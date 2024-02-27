import './App.css';
import React, { useState } from "react" 
import axios from "axios"

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState("cpp");

  // const [err, setErr] = useState('');

  const handleSubmit = async () => {
    console.log("submit click");
    const payload = {
      language,
      code 
    }
    try{
      const {data} = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      console.log(data);
    }
    catch({response}) {
      if(response){
        const errMsg = response.data.error.stderr;
        setOutput(errMsg);
      }else{
        setOutput("Error in connecting server");
      }
      
      // setErr(error); its not working we'll think about this later
    }
    
  }

  return (
    <div className="App">
      <h1>ONLINE Compiler </h1>
      <div>
        <label>Language</label>
        <select 
        value={language} onChange={(e)=>{
          setLanguage(e.target.value);
          // if(e.target.value=="Python"){
          //   setLanguage("py");
          // }
          // else{
          //   setLanguage(e.target.value);
          // }
          }}>
          <option value="cpp"> C++ </option>
          <option value="py"> Python </option>
        </select>
      </div>
      <br/>
      <textarea rows="20" cols="75" value={code} onChange={(e)=>{
        setCode(e.target.value);
      }} ></textarea>
      
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <p>{output}</p>
      <p>{language}</p>
      {/* <p>{err}</p> */}


    </div>
  );
}

export default App;

