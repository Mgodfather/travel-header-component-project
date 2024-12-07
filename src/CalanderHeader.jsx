import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Traveller from "./Traveller";
import { useEffect } from "react";

export default function CalanderHeader() {

    // <================================== handle all date functionality ===========================================>

    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState('');

    const getFormattedDate = (date) => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const dayOfWeek = date.getDay(); // Day index (0-6)
        const day = date.getDate(); // Day of the month
        const month = date.getMonth(); // Month index (0-11)

        return `${days[dayOfWeek]}, ${day} ${months[month]}`;
    };

    // <================================== handle all date functionality ===========================================>

    const [showDepCalander, setShowDepCalander] = useState(false);
    const [showRetCalander, setShowRetCalander] = useState(false);

    const handleShowCalander = (e) => {
        if (e.target.id === "departure") {
            setShowDepCalander(true);
            setShowRetCalander(false);
        } else if (e.target.id === "return") {
            setShowDepCalander(false);
            setReturnDate(new Date())
            setShowRetCalander(true);
        }
        setShowTravel(false)
    };

    const handleHideCalander = () => {
        setShowDepCalander(false);
        setShowRetCalander(false);
    };

    const [from, setFrom] = useState(false)
    const [to, setTo] = useState(false)

    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')

    const handelInputValue = (e) => {
        if (e.target.id === 'from') {
            setFromValue(e.target.value)
        } else if (e.target.id === 'to') {
            setToValue(e.target.value)
        }
    }

    const handleTextInput = (e) => {
        if (e.target.id === 'from') {
            setFrom(true)
        } else {
            setTo(true)
        }
    }

    const setLabelPosition = (e) => {
        if (e.target.id === 'from') {
            setFrom(false)
        } else {
            setTo(false)
        }
    }


    //<===================================================================== handle travelller conponent ================================================>
    const [showTravel, setShowTravel] = useState(false)
    const [onChangeData, setOnChangeData] = useState({})
    const [travellerSummary, setTravellerSummary] = useState({
        totalTravellers: 1,
        selectedClass: 'economy',
    });

    const handleTravellerSummaryUpdate = (data) => {
        setTravellerSummary(data);
        setOnChangeData(data)
    };

    const handleShowTraveller = () => {
        setShowTravel(true)
        setShowRetCalander(false)
        setShowDepCalander(false)
    }

    useEffect(() => {
        setShowTravel(false)
    }, [onChangeData])


    return (
        <>
            <header>
                <div className="all-input-container">
                    <div className="input-fields-container text-input active">
                        <label htmlFor="from" className={`label from-label ${from || fromValue ? 'active' : ''}`}>From</label>
                        <input
                            type="text"
                            id="from"
                            value={fromValue}
                            onChange={handelInputValue}
                            onFocus={handleTextInput}
                            onBlur={setLabelPosition}
                        />
                    </div>
                    <div className="arrow-container">
                        <i className="bx bx-transfer-alt"></i>
                    </div>
                    <div className="input-fields-container text-input">
                        <label htmlFor="to" className={`label to-label ${to || toValue ? 'active' : ''}`}>To</label>
                        <input
                            type="text"
                            id="to"
                            value={toValue}
                            onChange={handelInputValue}
                            onFocus={handleTextInput}
                            onBlur={setLabelPosition}
                        />
                    </div>
                    <div className="input-fields-container dep-date-input">
                        <label htmlFor="departure" className={`label dep-label`}>Departure</label>
                        <input
                            type="text"
                            id="departure"
                            onFocus={handleShowCalander}
                            value={getFormattedDate(departureDate)}
                            readOnly
                        />
                    </div>
                    <div className="input-fields-container ret-date-input">
                        <label htmlFor="return" className={`label return-label ${showRetCalander || returnDate ? 'active' : ''}`}>Return</label>
                        <input
                            type="text"
                            id="return"
                            onFocus={handleShowCalander}
                            value={`${showRetCalander || returnDate ? getFormattedDate(returnDate) : ''}`}
                            readOnly
                        />
                        {showRetCalander || returnDate ? <span className="cross" onClick={() => {
                            setShowRetCalander(false)
                            setReturnDate('')
                        }}>&#10006;</span> : ''}
                    </div>

                    <div className="traveller-container input-fields-container">
                        <label htmlFor="traveller" className={`label dep-label`}>Travelers & class</label>
                        <input
                            type="text"
                            id="traveller"
                            onFocus={handleShowTraveller}
                            readOnly
                            value={`${travellerSummary.totalTravellers} Traveller, ${travellerSummary.selectedClass}`}
                        />
                    </div>
                    <button className="input-fields-container search-btn">Search</button>
                </div>
                <div className="calander-wrapper">
                    {showDepCalander && (
                        <div className="calander-container">
                            <DayPicker
                                mode="single"
                                selected={departureDate}
                                onSelect={(date) => {
                                    if (date) setDepartureDate(date);
                                    handleHideCalander();
                                }}
                                className="calander"
                            />
                        </div>
                    )}
                    {showRetCalander && (
                        <div className="ret-calander-container">
                            <DayPicker
                                mode="single"
                                selected={returnDate}
                                onSelect={(date) => {
                                    if (date) setReturnDate(date);
                                    handleHideCalander();
                                }}
                                className="calander"
                            />
                        </div>
                    )}
                    {showTravel && <Traveller onTravellerSummaryUpdate={handleTravellerSummaryUpdate} />}
                </div>
            </header>
        </>
    );
}
