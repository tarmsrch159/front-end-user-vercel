import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Payment_form() {

    const { id } = useParams()
    const [img, setImg] = useState()
    const [single_user, setSingle_user] = useState([])

    const handleImg = (e) => {
        setImg(e.target.files[0])
    }

    const paid = () => {
        if (confirm("คุณต้องการบันทึกข้อมูลหรือไม่")) {
            const formdata = new FormData
            formdata.append("image", img)
            axios.put(`https://project-node-js-98ba.onrender.com/payment/${id}`, formdata).then((res) => {
                console.log(res)
                if (res.data.status == 'true') {
                    alert("บันทึกข้อมูลเสร็จสิ้น")
                    window.location = '/login_user'
                } else {
                    console.log(res)
                    return false
                }
            })
        } else {
            return false
        }
    }

    useEffect(() => {
        axios.get(`https://project-node-js-98ba.onrender.com/check_payment/${id}`).then((res) => {
            setSingle_user(res.data)
        })
    }, [])

    console.log(single_user)
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-tab">
                            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true" style={{ fontWeight: "bolder", fontSize: "16px" }}>ข้อมูลการชำระเงิน Payment</a>
                                    </li>

                                </ul>
                                <div>

                                </div>
                            </div>
                            <div className="tab-content tab-content-basic">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <h4 className="card-title text-center">การชำระเงิน</h4>
                                                    <p className="card-description text-center">
                                                        การชำระเงิน
                                                    </p>
                                                    {single_user.map((info) => {
                                                        return (
                                                            <>
                                                                <h3>สถานะ: <span><a className='btn-warning' style={{ textDecoration: "none", padding: "5px", borderRadius: "5px" }}> {info.permission} </a></span></h3>
                                                                <hr />
                                                                <h3>ข้อมูลผู้สมัครสอบ: </h3>
                                                                <div className="row justify-content-center mt-4">
                                                                    <div className="col-6">
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px" }}>หลักสูตร(ฝึกอบรม): <span style={{ fontWeight: "normal" }}>{info.name_th}</span></h5>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", marginTop: "20px" }}>ชื่อ-นามสกุล: <span style={{ fontWeight: "normal" }}>{info.name} {info.lastname}</span></h5>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", marginTop: "20px" }}>ที่อยู่ตามทะเบียนบ้าน: <span style={{ fontWeight: "normal" }}>{info.name} {info.lastname}</span></h5>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", marginTop: "20px" }}>วุฒิการศึกษาสูงสุด: <span style={{ fontWeight: "normal" }}>{info.educational}</span></h5>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", marginTop: "20px" }}>สาขา: <span style={{ fontWeight: "normal" }}>{info.branch}</span></h5>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", marginTop: "20px" }}>สัญชาติ: <span style={{ fontWeight: "normal" }}>{info.nationality}</span></h5>

                                                                    </div>
                                                                    <div className="col-6" style={{ textAlign: 'center' }}>
                                                                        <h5 style={{ fontWeight: 'bold', marginRight: "10px", }} >รูปประจำตัว
                                                                        </h5>
                                                                        <img src={`https://project-node-js-98ba.onrender.com/${info.profile_img}`} class="img-thumbnail mx-5" alt="" width={150} height={100} />
                                                                    </div>
                                                                    
                                                                </div>

                                                                <hr />

                                                                <form className="forms-sample">
                                                                    <h3>ชำระเงิน: </h3>
                                                                    <div className="row justify-content-center">
                                                                        <div className="col-4">
                                                                            <h4 className='mt-4'>เลขที่บัญชี: <span>123456</span></h4>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <h4 className='mt-4'>แนบหลักฐานการชำระเงิน: </h4>
                                                                            <input type="file" onChange={handleImg} className="form-control py-2" id="customFile" />
                                                                        </div>

                                                                        <div className="col-4">
                                                                        </div>
                                                                    </div>


                                                                    <button type="button" onClick={paid} className="btn btn-success px-5 py-3 fs-6 mt-5">ชำระเงิน</button>
                                                                </form>
                                                            </>
                                                        )
                                                    })}

                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2021. All rights reserved.</span>
                </div>
            </footer>
            {/* partial */}
        </div>
    )
}

export default Payment_form