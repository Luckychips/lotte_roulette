import React, {useState} from 'react';
import './Roulette.css';

// 1	샤넬핸드백
// 2	골드바(18.75g)
// 3	하트만캐리어(알루미늄)
// 4	루이비통반지갑(조에월릿)
// 5	갤럭시 Z플립
// 6	다이닝무료메뉴권
// 7	폴바셋 커피쿠폰
// 8	마카롱택시이용권

const prizes = ['샤넬핸드백', '골드바(18.75g)', '하트만캐리어(알루미늄)', '루이비통반지갑(조에월릿)', '갤럭시 Z플립', '다이닝무료메뉴권', '폴바셋 커피쿠폰', '마카롱택시이용권'];
const Roulette = ({promotionCode, prizeNumber, isAlready, drawAPrize}) => {
    const [isFinish, setIsFinish] = useState(false);

    const doSpin = () => {
        if (promotionCode.length > 0) {
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
        }
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
