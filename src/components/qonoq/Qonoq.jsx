import React from 'react'
import "./qonoq.scss"
import { BsFillStarFill } from 'react-icons/bs'
import { FaRegBell, FaRegClock } from 'react-icons/fa'
import { MdOutlineBedtime } from 'react-icons/md'

const Qonoq = () => {
  return (
    <div className='qonoq'>
        <div className="container">
            <h2 className="qonoq__title">Trusted by travelers worldwide</h2>
            <p className="qonoq__text">Qonoq capsules provide private and quiet rest with fast check-in hourly rates fresh linens charging alarm and 24/7 service</p>
            <div className="qonoq__small-box">
                <div className="qonoq__small-card">
                    <div className="qonoq__small-icon"><BsFillStarFill /></div>
                    <h2 className="qonoq__small-title">Customer Rating</h2>
                    <p className="qonoq__small-text">Highly rated by guests on major platforms</p>
                </div>
                <div className="qonoq__small-card">
                    <div className="qonoq__small-icon"><FaRegClock /></div>
                    <h2 className="qonoq__small-title">Open 24/7</h2>
                    <p className="qonoq__small-text">Round-the-clock service with fast check-in</p>
                </div>
                <div className="qonoq__small-card">
                    <div className="qonoq__small-icon"><MdOutlineBedtime /></div>
                    <h2 className="qonoq__small-title">On-site Availability</h2>
                    <p className="qonoq__small-text">Private, quiet capsules ready anytime</p>
                </div>
                <div className="qonoq__small-card">
                    <div className="qonoq__small-icon"><FaRegBell /></div>
                    <h2 className="qonoq__small-title">Wake-up Service</h2>
                    <p className="qonoq__small-text">Smart wake-up so you never oversleep</p>
                </div>
            </div>
            <div className="qonoq__big-box">
                <div className="qonoq__big-card"></div>
            </div>
        </div>
    </div>
  )
}

export default Qonoq