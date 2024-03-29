import './App.css';
import React, { useState } from "react" 
import axios from "axios"

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [jobId, setJobId] = useState(null);


   const [err, setErr] = useState('');

  let pollInterval;

  const handleSubmit = async () => {
    console.log("submit click");
    const payload = {
      language,
      code 
    };
    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      setJobDetails(null);
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
      setJobId(data.jobId);
      setStatus("Submitted.");
      
      
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log("m in if loop");
        console.log(error.response.data.error);
        console.log(error.response.data.stderr);

        setOutput(error.response.data.error.stderr);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // if (error.response.data && error.response.data.err) {
        //   const errMsg = error.response.data.err.stderr;
        //   setOutput(errMsg);
      } else if (error.request) {
        // The request was made but no response was received
        setOutput("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        setOutput("An error occurred. Please retry submitting.");
      }
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
      <p>{status}</p>
      <p>{jobId ? `Job ID: ${jobId}` : ""}</p>
      <p>{output}</p>
      <p>{language}</p>
      {/* <p>{err}</p> */}


    </div>
  );
}

export default App;

