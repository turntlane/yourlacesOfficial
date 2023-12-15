//@ts-nocheck
import React, { useEffect, useState } from "react";
import "./RingGenerator.css";
import OpenAI from "openai";

const RingGenerator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [responses, setResponses] = useState([]);
  const [image, setImage] = useState("");

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_AI_SECRET,
    dangerouslyAllowBrowser: true,
  });

  const imageGeneration = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Combine new input with historical context
    setResponses([...responses, input]);
    // const newPrompt = history
    //   .map((h) => h.prompt)
    //   .concat(input)
    //   .join(" | ");
    // setHistory((prevHistory) => [
    //   ...prevHistory,
    //   { prompt: input, image: null },
    // ]);
    // const concatenatedResponses = responses.toString();
    // console.log("concat responses: ", concatenatedResponses);
    // const getInput = responses.length <= 1 ? input : responses;
    // console.log("getinput: ", getInput);
    console.log("idk", responses);
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: responses.toString(),
        n: 1,
        size: "1024x1024",
      });
      const newImage = response.data[0].url;
      setHistory((prevHistory) =>
        prevHistory.map((item, index) =>
          index === prevHistory.length - 1 ? { ...item, image: newImage } : item
        )
      );
      setImage(newImage);
    } catch (error) {
      console.error(error);
    }
    // setInput("");
  };

  useEffect(() => {
    console.log("responses: ", responses.toString());
  }, [responses]);

  return (
    <div className="ring-generator">
      <div>
        <h1>OpenAI Image Chat</h1>
        <form onSubmit={imageGeneration}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Describe the image..."
          />
          <button type="submit">Generate</button>
        </form>
        <div>
          {image && <img src={image} alt={`Response`} />}
          {/* {history.map((item, index) => (
            <div key={index}>
              <p>Prompt: {item.prompt}</p>
              {item.image && <img src={item.image} alt={`Response ${index}`} />}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default RingGenerator;
