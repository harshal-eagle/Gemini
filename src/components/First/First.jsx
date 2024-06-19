import React, { useContext, useState } from 'react'
import './First.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const First = () => {

      const{onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (

    <div className='main'>
        <div className="nav">
          <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
      {!showResult
        ?
        <>
            <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can you help you Today</p>
                </div>
                <div className="cards">
                  <div className="card">
                    <p>A computer would deserve to be called intelligent if it could deceive a human into believing that it was human</p>
                    <img src={assets.compass_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>A computer would deserve to be called intelligent if it could deceive a human into believing that it was human</p>
                    <img src={assets.bulb_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>A computer would deserve to be called intelligent if it could deceive a human into believing that it was human</p>
                    <img src={assets.message_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>A computer would deserve to be called intelligent if it could deceive a human into believing that it was human</p>
                    <img src={assets.code_icon} alt="" />
                  </div>
                </div>
              </>
          :<div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt=""/>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
              ?<div className="loader">
                          <hr />
                          <hr />
                          <hr />
              </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
              
            </div>
          </div>
      }
          
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input}  type="text" placeholder='Enter Prompt here' />
              <div>
                <img src={assets.gallery_icon}alt="" />
                <img src={assets.mic_icon} alt="" />
                 {input?<img onClick={()=>onSent()}  src={assets.send_icon} alt="" />:null}
              </div>
            </div>
            <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
    </div>
  )
}

export default First