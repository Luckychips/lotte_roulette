import React, {useState} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';
import {checkPromotionCode} from '../../API';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CodeInput.css';

/* gifts_code
1	샤넬핸드백
2	골드바(18.75g)
3	하트만 알미늄캐리어
4	루이비통반지갑(조에월릿)
5	갤럭시 Z플립
6	무료식사권
7	폴바셋라테 쿠폰
8	마카롱택시 할인권
* */
const CodeInput = ({setPrizeNumber, promotionCode, setPromotionCode}) => {
    const [isVerified, setIsVerified] = useState(false);
    const requestToServer = async () => {
        try {
            const response = await checkPromotionCode(promotionCode);
            if (response.data.success) {
                setIsVerified(true);
                setPrizeNumber(response.data.data.gifts_code);
            } else {
                alert('번호 확인 후 다시 입력해주세요.');
            }
        } catch (e) {
            const exceptionData = e.response.data;
            if (!exceptionData.success) {
                const code = exceptionData.data.code;
                switch (code) {
                    case 10000:
                        alert('번호 확인 후 다시 입력해주세요.');
                        break;
                    case 10100:
                        alert('이미 참여한 이벤트 번호입니다.');
                        break;
                    default:
                        alert('번호 확인 후 다시 입력해주세요.');
                        break;
                }
            }
        }
    };

    const pressEnter = async (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
            if (promotionCode.length <= 0) {
                alert('번호 확인 후 다시 입력해주세요.');
                return;
            }

            await requestToServer();
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        if (promotionCode.length <= 0) {
            alert('번호 확인 후 다시 입력해주세요.');
            return;
        }

        await requestToServer();
    };

    return isVerified ? (
        <img className="verified" src="/images/verified.png" alt="" />
    ) : (
        <div className="code-input-window">
            <div className="event-number-name">이벤트 번호를 입력하세요.</div>
            <div className="form-event-number">
                <InputGroup className="mb-3">
                    <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-auth"
                        className="input-event-number"
                        value={promotionCode}
                        onChange={(event) => setPromotionCode(event.target.value)}
                        onKeyPress={(event) => pressEnter(event)}
                    />
                    <InputGroup.Append className="event-submit-button" onClick={(event) => submit(event)}>
                        <InputGroup.Text className="button-text" id="basic-auth">인증하기</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    );
};

export default CodeInput;
