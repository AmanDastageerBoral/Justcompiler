import './App.css';
import React, { useState } from "react" 
import axios from "axios"

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);


  // const [err, setErr] = useState('');

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
      if (data.jobId) {
        setJobId(data.jobId);
        setStatus("Submitted.");

        // poll here
        pollInterval = setInterval(async () => {
          const { data: statusRes } = await axios.get(
            `http://localhost:5000/status`,
            {
              params: {
                id: data.jobId,
              },
            }
          );
          const { success, job, error } = statusRes;
          console.log(statusRes);
          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);
            if (jobStatus === "pending") return;
            setOutput(jobOutput);
            clearInterval(pollInterval);
          } else {
            console.error(error);
            setOutput(error);
            setStatus("Bad request");
            clearInterval(pollInterval);
          }
        }, 1000);
      } else {
        setOutput("Retry again.");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Please retry submitting.");
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

return (
  <div className="App">
    <h1>ONLINE Compiler</h1>
    <div className="compiler">
      <div className="language-select">
        <label>Language:</label>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="code-editor">
        <textarea
          rows="20"
          cols="75"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="compiler-output">
        <p>Status: {status}</p>
        {jobDetails && <p>Job ID: {jobDetails.id}</p>}
        <pre>{output}</pre>
      </div>
    </div>
  </div>
);