import React, {useState} from 'react';
import './Roulette.css';

// 1	미니샤넬백
// 2	골드바10돈
// 3	하트만 알미늄캐리어
// 4	루이비통조예월렛
// 5	갤럭시 Z플립 2
// 6	무료식사권
// 7	폴바셋라테 쿠폰
// 8	마카롱택시 할인권

const prizes = ['미니샤넬백', '골드바10돈', '하트만 알미늄캐리어', '루이비통조예월렛', '갤럭시 Z플립 2', '무료식사권', '폴바셋라테 쿠폰', '마카롱택시 할인권'];
const Roulette = ({prizeNumber, isAlready, drawAPrize}) => {
    const [isFinish, setIsFinish] = useState(false);

    const doSpin = () => {
        if (isAlready) {
            alert('더이상 이벤트에 참여하실 수 없습니다.');
            return;
        }

        const roulette = document.querySelector('.roulette');
        roulette.classList.add(`loop-${prizeNumber}`);
        setTimeout(() => {
            setIsFinish(true);
            drawAPrize(true);
        }, 5500);
    };

    const getPrizeImage = () => {
        return `/images/img-award-0${prizeNumber}.png`;
    };

    return (
        <div className="container">
            <img className="roulette-pin" src="/images/roulette_pin.png" alt="" />
            {isFinish ? (
                <div className="roulette_spin_result">
                    <img className="background-prize" src="/images/roulette_prize_background.png" alt="" />
                    <img className="outline" src="/images/roulette_outside.png" alt="" />
                    <img className="prizeresult" src={getPrizeImage()} alt="" />
                    <div className="prizetext">
                        <div>축하합니다.</div>
                        <div><strong>{prizes[prizeNumber - 1]}</strong> 당첨</div>
                    </div>
                </div>
            ) : (
                <div className="roulette">
                    <img className="outline" src="/images/roulette_outside.png" alt="" />
                    <img className="inside" src="/images/roulette_inside.png" alt="" />
                    {!isFinish && prizeNumber <= 0 && <img className="dimmed" src="/images/roulette_disable.png" alt="" />}
                </div>
            )}
            <div className="trigger" onClick={doSpin}>
                <img src="/images/btn_roulette_start.png" alt="" />
            </div>
        </div>
    );
};

export default Roulette;
