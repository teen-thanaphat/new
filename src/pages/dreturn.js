import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';

const Dreturn = () => {

    const [return_durablearticles_Id, setReturn_durablearticles_Id] = useState("");
    const [return_durablearticles_status, setReturn_durablearticles_status] = useState("");
    //const [return_durablearticles_date, setReturn_durablearticles_date] = useState("");
    const [return_durablearticles_date, setReturn_durablearticles_date] = useState(new Date().toISOString().slice(0, 10));
    const [username, setUsername] = useState("");

    const [order_durablearticles_location, setOrder_durablearticles_location] = useState("");
    const [order_durablearticles_date, setOrder_durablearticles_date] = useState("");
    const [durablearticles_Id, setDurablearticles_Id] = useState("");

    //const [orderd, setOrderd] = useState([]);

    const navigate = useNavigate();
    const { order_durablearticles_Id } = useParams();

    const getOrderDurablearticlesById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/order_durablearticles/${order_durablearticles_Id}`);
        console.log(response);
        setOrder_durablearticles_location(response.data[0].order_durablearticles_location);
        setOrder_durablearticles_date(response.data[0].order_durablearticles_date);
        setUsername(response.data[0].username);
        setDurablearticles_Id(response.data[0].durablearticles_Id);
    };

    const newstatus = 'เบิกได้';

    useEffect(() => {
        getOrderDurablearticlesById();
    }, []);

    const addreturn = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(`http://202.44.40.185:3001/return_durablearticles`, {
                return_durablearticles_Id,
                return_durablearticles_status,
                return_durablearticles_date,
                username,
                order_durablearticles_Id,
            });
            await Axios.put(`http://202.44.40.185:3001/statusdurablearticles/${durablearticles_Id}`, {
                durablearticles_Id,
                durablearticles_status: newstatus,
            });
            navigate("/dreturnshow");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={addreturn}>
                    <br />

                    <div className="field1">
                        <label className="label">เลขออเดอร์ครุภัณฑ์ : {order_durablearticles_Id}</label>
                    </div>

                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>


                    <div className="field1">
                        <label className="label">สถานะการคืน :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={return_durablearticles_status}
                                    onChange={(e) => setReturn_durablearticles_status(e.target.value)}
                                >
                                    <option value="">เลือกสถานะการคืน</option>
                                    <option value="ปกติ">ปกติ</option>
                                    <option value="ชำรุด">ชำรุด</option>
                                    <option value="สูญหาย">สูญหาย</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field1">
                        <label className="label">วันที่คืน :</label>
                        <div className="control">
                            <input
                                type="date"
                                className="input"
                                value={return_durablearticles_date}
                                onChange={(e) => setReturn_durablearticles_date(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อผู้คืน :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-success">
                            คืน
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dreturn;