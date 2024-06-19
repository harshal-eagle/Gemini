import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();
 
const ContextProvider = (props) => {
    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setprevprompt] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading ,setloading] =  useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara =(index,nextWord) => {
          setTimeout(function () {
            setResultData(prev=>prev+nextWord);
          }, 75*index)
    }
     const newChat = ()=>{
        setloading(false)
        setShowResult(false)

     }

    const onSent = async (prompt)=>{

        setResultData("")
        setloading(true)
        setShowResult(true)
        let response ;
        if (prompt!=undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)

        }
        else{
            setprevprompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
       
        let responseArray = response.split("**")
        let newResponse="";
        for(let i=0;i<responseArray.length;i++)
        {
                if(i===0 || i%2 !==1){
                    newResponse +=responseArray[i];
                }
                else{
                    newResponse +="<br>"+responseArray[i]+"<br>";
                }
        }
        let newResponse2 = newResponse.split("*").join("<br>")

        let newResponseArray = newResponse2.split(" ")
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")

        }
        setloading(false)
        setInput("")
    }

    

    const contextValue = {
        prevPrompt,
        setprevprompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )


}

export default ContextProvider