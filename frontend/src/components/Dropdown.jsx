import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";

export default function Dropdown({label,items=[],onSelect,buttonClass="drop-btn",disabled=false,ariaLabel}){
 const [open,setOpen]=useState(false), [active,setActive]=useState(-1), [pos,setPos]=useState({top:0,left:0,width:260});
 const ref=useRef(null),buttonRef=useRef(null),menuRef=useRef(null);
 const enabledItems=items.filter(x=>x!=null);
 const getText=x=>String(x?.label??x);
 const getValue=x=>x?.value??x;
 const updatePosition=()=>{
   if(!buttonRef.current)return;
   const r=buttonRef.current.getBoundingClientRect();
   const vw=window.innerWidth, vh=window.innerHeight;
   const width=Math.min(Math.max(r.width,260),420,vw-24);
   let left=Math.min(r.left, vw-width-12);
   left=Math.max(12,left);
   const spaceBelow=vh-r.bottom-12, spaceAbove=r.top-12;
   const maxH=Math.min(360,Math.max(180,Math.max(spaceBelow,spaceAbove)));
   const top=spaceBelow>=180||spaceBelow>=spaceAbove ? r.bottom+7 : Math.max(12,r.top-maxH-7);
   setPos({top,left,width,maxHeight:maxH});
 };
 useEffect(()=>{
   if(!open)return;
   updatePosition();
   const closeOutside=e=>{if(!ref.current?.contains(e.target)&&!menuRef.current?.contains(e.target))setOpen(false)};
   const reposition=()=>updatePosition();
   const key=e=>{
     if(e.key==="Escape"){e.preventDefault();setOpen(false);buttonRef.current?.focus();return}
     if(!enabledItems.length)return;
     if(e.key==="ArrowDown"){e.preventDefault();setActive(i=>{const n=i<enabledItems.length-1?i+1:0;requestAnimationFrame(()=>menuRef.current?.querySelector(`[data-index="${n}"]`)?.scrollIntoView({block:"nearest"}));return n})}
     if(e.key==="ArrowUp"){e.preventDefault();setActive(i=>{const n=i>0?i-1:enabledItems.length-1;requestAnimationFrame(()=>menuRef.current?.querySelector(`[data-index="${n}"]`)?.scrollIntoView({block:"nearest"}));return n})}
     if(e.key==="Enter"&&active>=0){e.preventDefault();choose(enabledItems[active])}
   };
   document.addEventListener("mousedown",closeOutside);window.addEventListener("resize",reposition);window.addEventListener("scroll",reposition,true);document.addEventListener("keydown",key);
   requestAnimationFrame(()=>menuRef.current?.querySelector(`[data-index="${active>=0?active:0}"]`)?.focus());
   return()=>{document.removeEventListener("mousedown",closeOutside);window.removeEventListener("resize",reposition);window.removeEventListener("scroll",reposition,true);document.removeEventListener("keydown",key)};
 },[open,active,enabledItems.length]);
 const choose=item=>{const value=getValue(item);onSelect?.(value);setOpen(false);setActive(-1);buttonRef.current?.focus()};
 const toggle=()=>{if(disabled)return; if(!open){setActive(-1);setOpen(true)}else setOpen(false)};
 return <div className={`dropdown ${open?"is-open":""}`} ref={ref}>
  <button ref={buttonRef} type="button" className={buttonClass} disabled={disabled} aria-label={ariaLabel||label} aria-haspopup="listbox" aria-expanded={open} onClick={toggle}>
   <span className="drop-label">{label}</span><span className="drop-chevron" aria-hidden="true">⌄</span>
  </button>
  {open&&createPortal(<div ref={menuRef} className="dropdown-menu dropdown-menu-portal" role="listbox" aria-label={ariaLabel||label} style={{top:pos.top,left:pos.left,width:pos.width,maxHeight:pos.maxHeight}}>
   {enabledItems.length?enabledItems.map((item,i)=>{const value=getValue(item),text=getText(item),selected=String(value)===String(label),focus=i===active;return <button type="button" role="option" aria-selected={selected} tabIndex={focus?0:-1} data-index={i} className={`dropdown-option ${selected?"selected":""}`} key={String(value)+i} onMouseEnter={()=>setActive(i)} onClick={()=>choose(item)}><span>{text}</span>{selected&&<b aria-hidden="true">✓</b>}</button>}):<div className="dropdown-empty">No options available</div>}
  </div>,document.body)}
 </div>
}
