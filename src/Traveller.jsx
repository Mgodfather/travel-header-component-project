import React, { useEffect, useState } from 'react';

export default function Traveller({ onTravellerSummaryUpdate}) {
    // State for adults, children, infants, and selected class
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [selectedClass, setSelectedClass] = useState('economy'); // Default to 'economy'

    const handleSelectedNum = (e) => {
        const child = Array.from(e.currentTarget.children);
        if (e.target.className.includes('nums')) {
            child.forEach((e) => {
                e.classList.remove('selected');
            });
            e.target.classList.add('selected');

            // Update corresponding state
            const value = Number(e.target.innerText);
            if (e.currentTarget.className.includes('num-column')) {
                if (e.currentTarget.className.includes('infant-num-column')) {
                    setInfants(value);
                } else if (e.currentTarget.previousElementSibling?.querySelector('h4')?.innerText === 'Adults') {
                    setAdults(value);
                } else if (e.currentTarget.previousElementSibling?.querySelector('h4')?.innerText === 'Children') {
                    setChildren(value);
                }
            }
        }
    };

    const handleClassSelection = (e) => {
        const classElements = Array.from(e.currentTarget.children);
        classElements.forEach((element) => {
            element.classList.remove('selected');
        });
        e.target.classList.add('selected');
        setSelectedClass(e.target.innerText.toLowerCase()); // Update state with the selected class (converted to lowercase)
    };

    const handleDone = () => {
        const totalTravellers = adults + children + infants;
        onTravellerSummaryUpdate({ totalTravellers, selectedClass});
    };




    return (
        <div className='traveller-wrapper'>
            <div className="traveller-main-container">
                <div className="traveller-content">
                    <h3>Travellers</h3>
                    <div className="traveller-row">
                        <span className="people-column">
                            <h4>Adults</h4>
                            <h5>12 yrs or above</h5>
                        </span>
                        <div className="num-column" onClick={handleSelectedNum}>
                            <span className="nums selected">1</span>
                            <span className="nums">2</span>
                            <span className="nums">3</span>
                            <span className="nums">4</span>
                            <span className="nums">5</span>
                            <span className="nums">6</span>
                            <span className="nums">7</span>
                            <span className="nums">8</span>
                            <span className="nums">9</span>
                        </div>
                    </div>
                    <div className="traveller-row">
                        <span className="people-column">
                            <h4>Children</h4>
                            <h5>2 - 12 yrs</h5>
                        </span>
                        <div className="num-column" onClick={handleSelectedNum}>
                            <span className="nums selected">0</span>
                            <span className="nums">1</span>
                            <span className="nums">2</span>
                            <span className="nums">3</span>
                            <span className="nums">4</span>
                            <span className="nums">5</span>
                            <span className="nums">6</span>
                            <span className="nums">7</span>
                            <span className="nums">8</span>
                        </div>
                    </div>
                    <div className="traveller-row">
                        <span className="people-column">
                            <h4>Infants</h4>
                            <h5>0 - 2 yrs</h5>
                        </span>
                        <div className="num-column infant-num-column" onClick={handleSelectedNum}>
                            <span className="nums selected">0</span>
                            <span className="nums">1</span>
                            <span className="nums">2</span>
                            <span className="nums">3</span>
                            <span className="nums">4</span>
                        </div>
                    </div>
                    <div className="traveller-class-row">
                        <div className="class-row">
                            Class
                        </div>
                        <div className="select-class-row" onClick={handleClassSelection}>
                            <span className={`${selectedClass === 'economy' ? 'selected' : ''}`}>economy</span>
                            <span className={selectedClass === 'premium economy' ? 'selected' : ''}>Premium economy</span>
                            <span className={selectedClass === 'business' ? 'selected' : ''}>Business</span>
                        </div>
                    </div>
                </div>
                <div className="traveller-btn-container">
                    <button className='traveller-done-btn' onClick={handleDone}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
