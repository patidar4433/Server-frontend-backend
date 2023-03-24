import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatData = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobno, setMobno] = useState('');
    const [msg, setMsg] = useState('');
    const [data, setData] = useState ({
        email: '', firstname: '', lastname: '', mobno: '', msg: ''
    })

    console.log("data-->", data);

    const updateDataHandler = (e) => {
        setData({
            email: email, firstname: firstname, lastname: lastname, mobno: mobno, msg: msg
        });
        setEmail(e.target.value);
        setFirstname(e.target.value);
        setLastname(e.target.value);
        setMobno(e.target.value);

        axios
        .post('http://localhost:5050/userupdate', { email, firstname, lastname, mobno})
        .then((res)=>{
            if(res.data.status === 1){
                console.log("res-->", res)
                setMsg(res.data.message)
                setTimeout(() => {
                    navigate('/getdata');
                }, 1500);
            }else{
                console.log("res-->", res)
                setMsg(res.data.message)
            }
        })
        .catch((err)=>{
            console.log("err-->", err);
        })
    }


    return(
        <div className="main_div">
        <h1 className="page_heading">Update Data</h1>
            <input className="input" onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='email' />
            <input className="input" onChange={(e)=>setFirstname(e.target.value)} type="text" placeholder='firstname' />
            <input className="input" onChange={(e)=>setLastname(e.target.value)} type="text" placeholder='lastname' />
            <input className="input" onChange={(e)=>setMobno(e.target.value)} type="number" placeholder='mobno' />
            <div>
                <button onClick={updateDataHandler} className='btnEnabled'>Update Data</button>
            </div>
        </div>
    )
}


export default UpdatData;