import React, {useState} from 'react';
import {Form, InputGroup, FormControl} from 'react-bootstrap';
import {checkPromotionCode} from '../../API';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CodeInput.css';

/* gifts_code
1	미니샤넬백
2	골드바10돈
3	하트만 알미늄캐리어
4	루이비통조예월렛
5	갤럭시 Z플립 2
6	무료식사권
7	폴바셋라테 쿠폰
8	마카롱택시 할인권
* */
const CodeInput = ({setPrizeNumber, promotionCode, setPromotionCode}) => {
    const [isVerified, setIsVerified] = useState(false);
    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await checkPromotionCode(promotionCode);
            if (response.data.success) {
                setIsVerified(true);
                setPrizeNumber(response.data.data.gifts_code);
            } else {
                alert('이벤트 번호가 잘못되었습니다.');
            }
        } catch (e) {
            const exceptionData = e.response.data;
            if (!exceptionData.success) {
                const code = exceptionData.data.code;
                switch (code) {
                    case 10000:
                        alert('이벤트 번호가 잘못되었습니다.');
                        break;
                    case 10100:
                        alert('해당 이벤트 번호가 존재하지 않거나, 이미 참여된 이벤트 번호입니다.');
                        break;
                    default:
                        alert('이벤트 번호가 잘못되었습니다.');
                        break;
                }
            }
        }
    };

    return isVerified ? (
        <img className="verified" src="/images/verified.png" alt="" />
    ) : (
        <div className="code-input-window">
            <div className="event-number-name">이벤트 번호를 입력하세요.</div>
            <Form className="form-event-number">
                <InputGroup className="mb-3">
                    <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-auth"
                        className="input-event-number"
                        value={promotionCode}
                        onChange={(event) => setPromotionCode(event.target.value)}
                    />
                    <InputGroup.Append className="event-submit-button" onClick={(event) => submit(event)}>
                        <InputGroup.Text className="button-text" id="basic-auth">인증하기</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    );
};

export default CodeInput;
