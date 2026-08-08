import axios from "axios";
const api=axios.create({baseURL:"http://localhost:8000",headers:{"Content-Type":"application/json"}});
export const overview=()=>api.get("/statistics/overview");
export const frequencies=()=>api.get("/statistics/frequencies");
export const resolution=()=>api.get("/statistics/resolution");
export const complaints=()=>api.get("/complaints");
export const createComplaint=(data)=>api.post("/complaints",data);
export default api;
