import React, {useState, useEffect} from 'react';
import './Roulette.css';

// 1	샤넬핸드백
// 2	골드바(18.75g)
// 3	하트만캐리어(알루미늄)
// 4	루이비통반지갑(조에월릿)
// 5	갤럭시 Z플립
// 6	다이닝무료메뉴권
// 7	폴바셋 커피쿠폰
// 8	마카롱택시이용권
// 99   꽝 - 다음기회에

const prizes = ['샤넬핸드백', '골드바(18.75g)', '하트만캐리어(알루미늄)', '루이비통반지갑(조에월릿)', '갤럭시 Z플립', '다이닝무료메뉴권', '폴바셋 커피쿠폰 X 2매', '마카롱택시 2천원 금액권 X 2매'];
const Roulette = ({promotionCode, prizeNumber, isAlready, drawAPrize}) => {
    const [isFinish, setIsFinish] = useState(false);
    const [isWrack, setIsWrack] = useState(false);

    const doSpin = () => {
        if (promotionCode.length > 0) {
            if (isAlready) {
                alert('더이상 이벤트에 참여하실 수 없습니다.');
                return;
            }

            let wrackNumber = 0;
            if (prizeNumber === 99) {
                wrackNumber = prizeNumber;
                prizeNumber -= 91;
            }

            const roulette = document.querySelector('.roulette');
            roulette.classList.add(`loop-${prizeNumber}`);
            setTimeout(() => {
                setIsFinish(true);
                if (wrackNumber === 99) {
                    setIsWrack(true);
                } else {
                    drawAPrize(true);
                }
            }, 5500);
        }
    };

    const getPrizeImage = () => {
        return `/images/img-award-0${prizeNumber}.png`;
    };

    useEffect(() => {
        if (isWrack) {
            setTimeout(() => {
                alert('아쉽게도 당첨되지 않으셨습니다.');
                window.location.reload();
            }, 1000);
        }
    }, [isWrack]);

    return (
        <div className="container">
            <img className="roulette-pin" src="/images/roulette_pin.png" alt="" />
            {isFinish ? (
                <div className="roulette_spin_result">
                    <img className="background-prize" src="/images/roulette_prize_background.png" alt="" />
                    <img className="outline" src="/images/roulette_outside.png" alt="" />
                    {prizeNumber === 99 ? (
                        <div className="whack-text">다음 기회에!</div>
                    ) : (
                        <>
                            <img className="prizeresult" src={getPrizeImage()} alt="" />
                            <div className="prizetext">
                                <div>축하합니다.</div>
                                <div>
                                    <strong>{prizes[prizeNumber - 1]}</strong>
                                    <div>당첨</div>
                                </div>
                            </div>
                        </>
                    )}
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
