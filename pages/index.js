import Head from "next/head";
import Image from "next/image";
import DOSELogo from "../assets/DOSE-logo.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import buildspaceLogo from "../assets/buildspace-logo.png";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [pitchInput, setPitchInput] = useState("");
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [apiPitchOutput, setApiPitchOutput] = useState("");
  const [ideasGenerated, setIdeasGenerated] = useState(false);
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
    setIdeasGenerated(true);
  };

  const callGenerateEndpointPitch = async () => {
    setIsGeneratingPitch(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generatePitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pitchInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiPitchOutput(`${output.text}`);
    setIsGeneratingPitch(false);
  };
  const onPitchClick = (idea) => {
    setPitchInput(idea);
  };
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  function copyArray(arr) {
    return arr.slice();
  }
  function splitSentences(text) {
    var ideaArray = text.split(/[0-9]\.\s/);
    return copyArray(ideaArray);
  }
  function makeButtons(buttonTextArray) {
    return buttonTextArray.map(function (buttonText, index) {
      if (index === 0) {
        return null;
      }
      return (
        <div>
          <div id="ideaButtons">
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg">
                Startup Idea {index}
              </Button>
            </div>
            <p id="ideaText">{buttonText}</p>
          </div>
          <div className="prompt-buttons">
            <a
              className={
                isGeneratingPitch
                  ? "generate-button-pitch loading"
                  : "generate-button-pitch"
              }
              onClick={callGenerateEndpointPitch}
            >
              <div className="generate">
                {isGeneratingPitch ? (
                  <span class="loader"></span>
                ) : (
                  <p>Pitch</p>
                )}
              </div>
            </a>
          </div>
        </div>
      );
    });
  }

  // function makePitch(ideaArray) {
  //   console.log(ideaArray);
  //   if (ideasGenerated) {
  //     return (
  //       <div className="prompt-Container">
  //         {apiOutput && (
  //           <div className="output">
  //             <div className="output-header-container">
  //               <div className="output-header">
  //                 <h3>Select an Idea To pitch</h3>
  //               </div>
  //             </div>
  //             <div className="output-content">
  //               <select onChange={onUserChangedText} className="pitch-select">
  //                 <option selected value={0}>
  //                   Startup Idea 1
  //                 </option>
  //                 <option value={1}>Startup Idea 2</option>
  //                 <option value={2}>Startup Idea 3</option>
  //                 <option value={3}>Startup Idea 4</option>
  //                 <option value={4}>Startup Idea 5</option>
  //               </select>
  //               <div className="prompt-buttons">
  //                 <a
  //                   className={
  //                     isGenerating
  //                       ? "generate-button loading"
  //                       : "generate-button"
  //                   }
  //                   onClick={callGenerateEndpoint}
  //                 >
  //                   <div className="generate">
  //                     {isGenerating ? (
  //                       <span class="loader"></span>
  //                     ) : (
  //                       <p>Create</p>
  //                     )}
  //                   </div>
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }
  // }

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Welcome to PitchMe</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Turn your interests to Startup ideas, to pitches, to infinity...
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="what are your interests?"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Possible Startup Ideas</h3>
                </div>
              </div>
              <div className="output-content">
                <div>{makeButtons(splitSentences(apiOutput))}</div>
              </div>
            </div>
          )}
        </div>
        {/* {makePitch()} */}
      </div>

      {/* <div className="badge-container grow">
        <a href="/" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={DOSELogo} alt="buildspace logo" />
            <p>
              DoseDevelopments <sup>&copy;</sup>
            </p>
          </div>
        </a>
      </div> */}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
