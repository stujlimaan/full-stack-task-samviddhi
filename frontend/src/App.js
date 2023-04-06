import "./App.css";
import React,{useState,useEffect} from 'react'
function App() {
  const [data,setData]=useState()
  const [from,setFrom]=useState()
  const [to,setTo]=useState()
  const [selectfrom,setSelectfrom]=useState()
  const [selectto,setSelectto]=useState()

  const fetchData = async (from,to)=>{
    const data = await fetch(`https://localhost:3000/currency-exchange?from=${from}&to=${to}`,{
      mode: 'no-cors'
 })
    const result = await data.json()
    console.log(result)
    setData(result)
  }

  const fetchExchange= async (from,to,amount)=>{
    const data = await fetch(`https://localhost:3000/convert?from=${from}&to=${to}&amount=${amount}`,{
      mode: 'no-cors'
 })
    const result = await data.json()
    
    console.log(result)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
  
  // useEffect(()=>{
  //   fetchData(from,to)
  // })
  // console.log(from,to,selectfrom,selectto)
  return (
    <div className="App">
      <h1>currency exchange</h1>
        <form onSubmit={handleSubmit}>
      <div style={{width:'40%',margin:"auto",border:"1px solid black",padding:"20px"}}>

      <div className="row py-3">
        <div className="col-4 fw-bold">from</div>
        <div className="col-4 fw-bold">to</div>
      </div>
      <div className="row py-3">
        <div className="col-4">
          <select className='form-select' onChange={(e)=>setSelectfrom(e.target.value)} >
            <option>INR</option>
            <option>KRW</option>
            <option>USD</option>
            <option>EUR</option>
            <option>CNY</option>
          </select>
        </div>
        <div className="col-4">
        <select className='form-select' onChange={(e)=>setSelectto(e.target.value)}>
            <option>INR</option>
            <option>KRW</option>
            <option>USD</option>
            <option>EUR</option>
            <option>CNY</option>
          </select>
        </div>
        <div className="col-4"><button type="submit" className='btn btn-primary' onClick={()=>fetchData(selectfrom,selectto)}>exchange</button></div>

      </div>
      <div className="row py-3">
        <div className="col-4">
          <input type='number' placeholder="enter number" className='form-control' value={from} onChange={(e)=>setFrom(e.target.value)}/>
        </div>
        <div className="col-4">
        <input type='number' placeholder="enter number" className='form-control' value={to} onChange={(e)=>setTo(e.target.value)}/>

        </div>
        <div className='col-4'><button type="submit" className='btn btn-primary' onClick={()=>fetchExchange(from,to)}>convert</button></div>
      </div>
      <p>876</p>
      </div>
        </form>

    </div>
  );
}

export default App;
