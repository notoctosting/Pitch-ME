import Head from "next/head";
import Image from "next/image";
import DOSELogo from "../assets/DOSE-logo.png";
import Button from "react-bootstrap/Button";

import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiPitchOutput, setApiPitchOutput] = useState("");
  const [ideasGenerated, setIdeasGenerated] = useState(false);
  const [pitchGenerated, setPitchGenerated] = useState(false);
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [isGeneratingStrat, setIsGeneratingStrat] = useState(false);
  const [apiStratOutput, setApiStratOutput] = useState("");
  const [selected, setSelected] = useState();

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
    setIdeasGenerated(true);
  };

  const callGenerateEndpointPitch = async () => {
    setIsGeneratingPitch(true);

    const response = await fetch("/api/generatePitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected }),
    });

    const data = await response.json();
    const { output } = data;

    setApiPitchOutput(`${output.text}`);
    setIsGeneratingPitch(false);
    setPitchGenerated(true);
  };
  const callGenerateEndpointStrat = async () => {
    setIsGeneratingStrat(true);

    const response = await fetch("/api/generateStrat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected }),
    });

    const data = await response.json();
    const { output } = data;

    setApiStratOutput(`${output.text}`);
    setIsGeneratingStrat(false);
  };
  const handleChange = (event) => {
    setSelected(event.target.value);
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
        <div className="-">
          <div id="ideaButtons">
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg">
                Startup Idea {index}
              </Button>
            </div>
            <p id="ideaText">{buttonText}</p>
          </div>
        </div>
      );
    });
  }

  const makePitch = (ideaArray) => {
    if (ideasGenerated) {
      const options = [
        { value: ideaArray[1], text: "Startup Idea 1" },
        { value: ideaArray[2], text: "Startup Idea 2" },
        { value: ideaArray[3], text: "Startup Idea 3" },
      ];

      return (
        <div className="prompt-Container">
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Select an Idea To Pitch:</h3>
                </div>
              </div>
              <div className="output-content">
                <div className="prompt-buttons-pitch">
                  <select onChange={handleChange} value={selected} className="pitch-select">
                    <option key={"-"} disabled>
                      {" "}
                      --{" "}
                    </option>
                    {options.map((option) => (
                      <option selected key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                  <a
                    className={isGeneratingPitch ? "generate-button-pitch loading" : "generate-button-pitch"}
                    onClick={callGenerateEndpointPitch}
                  >
                    <div className="generate">
                      {isGeneratingPitch ? <span className="loader"></span> : <p>Generate</p>}
                    </div>
                  </a>
                </div>
                <div className="output">
                  <div className="output-content">
                    <p>{apiPitchOutput}</p>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  const makeStrat = (selected) => {
    if (pitchGenerated) {
      return (
        <div className="prompt-Container">
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="header-subtitle">
                  <h2>
                    Still interested in <i>your</i> idea? Let's Strategize.
                  </h2>
                </div>

                <div className="output-header">
                  <h3>Build a Business Strategy:</h3>
                </div>
              </div>
              <div className="output-content">
                <div className="prompt-strat-buttons">
                  <a
                    className={isGeneratingStrat ? "generate-button-strat loading" : "generate-button-strat"}
                    onClick={callGenerateEndpointStrat}
                  >
                    <div className="generate">
                      {isGeneratingStrat ? <span className="loader"></span> : <p>Generate</p>}
                    </div>
                  </a>
                </div>
                <div className="output">
                  <div className="output-content">
                    <p>{apiStratOutput}</p>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <section>
              <h1>Welcome, to PitchMe</h1>
            </section>
          </div>
          <div className="header-subtitle">
            <h2>
              Turn <i> your interests</i> to Startup ideas, to pitches, <i> to infinity...</i>
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
            <a className={isGenerating ? "generate-button loading" : "generate-button"} onClick={callGenerateEndpoint}>
              <div className="generate">{isGenerating ? <span className="loader"></span> : <p>Generate</p>}</div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                ea
                <div className="output-header">
                  <h3>Possible Startup Ideas</h3>
                </div>
              </div>
              <div className="output-content">
                <div>{makeButtons(splitSentences(apiOutput))}</div>
              </div>
              <div className="output-content">{makePitch(splitSentences(apiOutput))}</div>
              <div className="output-content">{makeStrat(selected)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="badge-container grow">
        <a href="/" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={DOSELogo} alt="buildspace logo" />
            <p>
              DoseOfEthan <sup>&copy;</sup>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
