import {useEffect, useRef, useState} from "react";
import {analyze} from "./AISuggestion";

const starters = [
  ["💧", "Water leakage", "There is a water leak near my street"],
  ["🗑️", "Garbage", "Garbage is piling up in my area"],
  ["🛣️", "Pothole", "There is a dangerous pothole on the road"],
  ["💡", "Street light", "The street light is not working"],
];

function makeReply(text) {
  const result = analyze(text);
  const department = result.type === "water" ? "Water & Sanitation" : result.type === "waste" ? "Waste Management" : result.type === "road" ? "Roads & Transport" : result.type === "city" ? "Municipal Services" : "Civic Services";
  return { ...result, department };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {role:"assistant", type:"welcome", text:"Hello! I’m CivicAI. Tell me about a civic problem and I’ll help you understand the situation and what to do next."}
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, typing]);

  const ask = (value=text) => {
    const clean = value.trim();
    if (!clean || typing) return;
    setText("");
    setMessages(m => [...m, {role:"user", text:clean}]);
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, {role:"assistant", result:makeReply(clean)}]);
      setTyping(false);
    }, 520);
  };

  const reset = () => {
    setMessages([{role:"assistant", type:"welcome", text:"Let’s start again. What civic problem would you like help with?"}]);
    setText("");
  };

  return <>
    <button className={open ? "ai-fab open" : "ai-fab"} onClick={()=>setOpen(v=>!v)} aria-label={open?"Close CivicAI assistant":"Open CivicAI assistant"}>
      <span>{open ? "×" : "✦"}</span>{!open&&<i/>}
    </button>
    {!open && <div className="ai-fab-label">Need civic help?</div>}

    {open && <section className="ai-chat" role="dialog" aria-label="CivicAI Help Assistant">
      <header className="ai-chat-head">
        <div className="ai-chat-avatar">✦</div>
        <div className="ai-chat-title"><b>CivicAI Assistant</b><small><span className="status-dot"/> Online · civic guidance</small></div>
        <button className="ai-close" onClick={()=>setOpen(false)} aria-label="Close">×</button>
      </header>

      <div className="ai-chat-body">
        {messages.map((m,i) => <div key={i} className={m.role === "user" ? "chat-row user" : "chat-row assistant"}>
          {m.role === "assistant" && <span className="chat-mini-avatar">✦</span>}
          <div className="chat-bubble">
            {m.text && <p>{m.text}</p>}
            {m.result && <div className="chat-assessment">
              <div className="assessment-top"><span>✦ Quick assessment</span><b className={`condition-badge ${m.result.level.toLowerCase()}`}>{m.result.level}</b></div>
              <div className="chat-detail"><small>Situation</small><strong>{m.result.condition}</strong></div>
              <div className="chat-detail"><small>Recommended department</small><strong>{m.result.department}</strong></div>
              <div className="chat-detail solution"><small>Quick solution</small><p>{m.result.solution}</p></div>
              <small className="chat-disclaimer">AI guidance is advisory. A responsible service team should verify the actual condition on site.</small>
            </div>}
          </div>
        </div>)}
        {typing && <div className="chat-row assistant"><span className="chat-mini-avatar">✦</span><div className="chat-bubble typing"><i/><i/><i/></div></div>}
        <div ref={endRef}/>
      </div>

      <div className="ai-starters">{starters.map(([icon,label,prompt]) => <button key={label} onClick={()=>ask(prompt)} disabled={typing}><span>{icon}</span>{label}</button>)}</div>
      <div className="ai-chat-input"><input ref={inputRef} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")ask();if(e.key==="Escape")setOpen(false)}} placeholder="Describe your civic problem..." aria-label="Describe your civic problem"/><button onClick={()=>ask()} disabled={!text.trim()||typing} aria-label="Send message">➤</button></div>
      <div className="ai-chat-footer"><span>✦ AI decision support</span><button onClick={reset}>Clear chat</button></div>
    </section>}
  </>;
}
