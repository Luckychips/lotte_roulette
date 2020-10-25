import React, {useState} from 'react';
import {CodeInput, Roulette, AddressForm} from '../../components';
import './App.css';

function Event() {
    const [isAlready, setIsAlready] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [promotionCode, setPromotionCode] = useState('');
    return (
        <div className="App">
            <CodeInput
                isAlready={isAlready}
                setPrizeNumber={number => setPrizeNumber(number)}
                promotionCode={promotionCode}
                setPromotionCode={(code) => setPromotionCode(code)}
            />
            <Roulette
                promotionCode={promotionCode}
                prizeNumber={prizeNumber}
                isAlready={isAlready}
                drawAPrize={(value) => setIsAlready(value)}
            />
            <AddressForm promotionCode={promotionCode} isAlready={isAlready} />
        </div>
    );
}

export default Event;
