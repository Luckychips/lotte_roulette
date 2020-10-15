import React, {useEffect, useState} from 'react';
import {PostCode} from '..';
import {insertAddress} from '../../API';
import './AddressForm.css';

const AddressForm = ({promotionCode, isAlready}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [basicAddress, setBasicAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(true);
    const [isCheckedConsignment, setIsCheckedConsignment] = useState(true);
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    const [isHidePostCode, setIsHidePostCode] = useState(true);
    const [isHidePrivacyPopup, setIsHidePrivacyPopup] = useState(true);

    const postCodeOnComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }

            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }

            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setZipCode(data.zonecode);
        setBasicAddress(fullAddress);
        setIsHidePostCode(true);
        console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const search = (event) => {
        event.preventDefault();
        setIsHidePostCode(false);
    };

    const submit = async (event) => {
        event.preventDefault();
        if (!isCheckedPrivacy || !isCheckedConsignment) {
            alert('필수 동의사항에 동의해주세요.');
            return;
        }

        const params = {
            "promotion_code": promotionCode.toUpperCase(),
            "name": name,
            "phone": phone,
            "email": email,
            "zip_code": zipCode,
            "address_r": basicAddress,
            "address_j": basicAddress,
            "address_detail" : detailAddress,
            "address_reference": detailAddress
        };

        const response = await insertAddress(params);
        if (response.status === 200 && response.data.success) {
            alert('경품 신청이 완료되었습니다.\n경품 발송은 이벤트 종료 후 일괄 발송됩니다.');
            window.location.reload();
        } else {
            alert('처리 중 문제가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (name.length > 0 && phone.length > 0 && email.length > 0 && zipCode.length > 0 && basicAddress.length > 0 && detailAddress.length > 0 && isCheckedPrivacy && isCheckedConsignment) {
            setIsDisabledButton(false);
        } else {
            setIsDisabledButton(true);
        }
    }, [name, phone, email, zipCode, basicAddress, detailAddress, isCheckedPrivacy, isCheckedConsignment]);

    return (
        <div className="info-container">
            {isAlready ? (
                <div className="form-container">
                    <div className="form-header">배송지 입력</div>
                    <form className="address-form">
                        <div className="flex-between">
                            <label>이름</label>
                            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="flex-between">
                            <label>연락처</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="- 없이 숫자만 입력하세요."
                            />
                        </div>
                        <div className="flex-between">
                            <label>E-mail</label>
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="flex-between">
                            <label>주소</label>
                            <input
                                disabled
                                type="text"
                                className="field-addr"
                                value={zipCode}
                                onChange={(event) => setZipCode(event.target.value)}
                                placeholder="우편번호"
                            />
                            <button className="search-address" onClick={(event) => search(event)}>주소검색</button>
                        </div>
                        <div className="flex-between">
                            <label />
                            <input
                                disabled
                                type="text"
                                value={basicAddress}
                                onChange={(event) => setBasicAddress(event.target.value)}
                                placeholder="기본주소"
                            />
                        </div>
                        <div className="flex-between">
                            <label />
                            <input
                                type="text"
                                value={detailAddress}
                                onChange={(event) => setDetailAddress(event.target.value)}
                                placeholder="상세주소"
                            />
                        </div>
                        <div className="separator" />
                        <div className="row-flex-start">
                            <label>
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={isCheckedPrivacy}
                                    onChange={(event) => setIsCheckedPrivacy(event.target.checked)} />
                            </label>
                            <span className="checkbox-name privacy" onClick={() => setIsHidePrivacyPopup(false)}>[필수] 개인 정보 수집 및 이용</span>
                        </div>
                        <div className="row-flex-start">
                            <label>
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={isCheckedConsignment}
                                    onChange={(event) => setIsCheckedConsignment(event.target.checked)} />
                            </label>
                            <span className="checkbox-name">[필수] 이벤트 경품 발송 및 정보처리를 위한 개인 정보처리 및 위탁에 동의합니다.</span>
                        </div>
                        <button
                            disabled={isDisabledButton}
                            className={`address-form-submit-button ${isDisabledButton ? 'disabled' : ''}`}
                            onClick={submit}>
                            확  인
                        </button>
                    </form>
                    {!isHidePostCode && <PostCode onComplete={postCodeOnComplete} hidePostCode={() => setIsHidePostCode(true)} />}
                </div>
            ) : (
                <div>
                    <div className="prize-info size-md">
                        <div className="info-title">경품라인업</div>
                        <div className="info-content">샤넬핸드백(미니), 골드바(10돈), 하트만캐리어(알루미늄), 루이비통지갑(조이월렛), 다이닝무료메뉴권, 마카롱택시이용권, 폴바셋 커피쿠폰, 갤럭시 Z플립2 등 8종</div>
                        <div className="info-title">유의사항</div>
                        <div className="info-content">
                            <div>&middot; 경품 배송은 당첨 후 배송됩니다. (당사 사정에 의해 지연될 수도 있습니다.)</div>
                            <div>&middot; 경품 수령은 배송 후 영업일 기준 약 7일 정도 소요됩니다.</div>
                            <div>&middot; 제공 경품은 타인에게 양도되지 않으며, 미 사용분에 대한 재발송이 불가합니다.</div>
                            <div>&middot; 제공 경품은 다른 제품으로 변경 및 현금 환불이 불가합니다.</div>
                            <div>&middot; 경품은 위탁업체 사정으로 변경될 수 있으며, 이 경우 안내된 경품의 정상가에 해당하는 제품으로 대체됩니다.</div>
                            <div>&middot; 경품 제세공과금(경품가의 22%)은 경품 이벤트 운영사에서 부담합니다.</div>
                            <div>&middot; 타인의 개인정보를 도용하거나 부정한 방법으로 참여 시 당첨을 취소합니다.</div>
                            <div>&middot; 배송지 및 연락처 오기재로 인한 배송 사고는 책임지지 않습니다.</div>
                            <div>&middot; 이벤트 및 경품 배송문의 : 대행사 ㈜그라운드케이, 02-6949-3010</div>
                        </div>
                    </div>
                    <div className="prize-info size-sm">
                        <div className="info-title">경품라인업</div>
                        <div className="info-content category">샤넬핸드백(미니), 골드바(10돈), 하트만캐리어(알루미늄), 루이비통지갑(조이월렛), 다이닝무료메뉴권, 마카롱택시이용권, 폴바셋 커피쿠폰, 갤럭시 Z플립2 등 8종</div>
                        <div className="info-title">유의사항</div>
                        <div className="info-content">
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품 배송은 당첨 후 배송됩니다. (당사 사정에 의해 지연될 수도 있습니다.)</div>
                            </span>
                            </div>

                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품 수령은 배송 후 영업일 기준 약 7일 정도 소요됩니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>제공 경품은 타인에게 양도되지 않으며, 미 사용분에 대한 재발송이 불가합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>제공 경품은 다른 제품으로 변경 및 현금 환불이 불가합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품은 위탁업체 사정으로 변경될 수 있으며, 이 경우 안내된 경품의 정상가에 해당하는 제품으로 대체됩니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품 제세공과금(경품가의 22%)은 경품 이벤트 운영사에서 부담합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>타인의 개인정보를 도용하거나 부정한 방법으로 참여 시 당첨을 취소합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>배송지 및 연락처 오기재로 인한 배송 사고는 책임지지 않습니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>이벤트 및 경품 배송문의 : 대행사 ㈜그라운드케이, 02-6949-3010</div>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!isHidePrivacyPopup && (
                <div className="popup-layer">
                    <div className="popup-wrapper">
                        <div className="popup-header">
                            개인 정보 수집 및 이용
                            <img src="/images/btn_close.png" alt="" onClick={() => setIsHidePrivacyPopup(true)} />
                        </div>
                        <div className="popup-content">
                            <p>이벤트 진행을 위하여 개인정보를 수집∙이용∙제공하고자 하는 경우에는 “개인정보 보호법” 제15조, 제17조에 따라 동의가 필요합니다.</p>
                            <br />
                            <p>○ 수집 이용 목적</p>
                            <p>이벤트 신청, 당첨자 경품 지급, 고객상담 등 이벤트 진행</p>
                            <p>○ 수집 이용할 항목</p>
                            <p>이름, (휴대)전화번호, 이메일, 주소</p>
                            <p>○ 보유 이용기간</p>
                            <p>동의 일로부터 경품 수령 확인 후 또는 제공 경품 유효기간 만료 후 1개월 이내 또는 동의 철회일까지 보유∙이용되며, 수집 및 이용 목적이 달성된 후 또는 계약 종료 시에는 해당 정보를 파기합니다.</p>
                            <p>※ 개인정보의 수집∙이용∙제공에 대해 동의하신 내용은 언제든지 철회할 수 있으며, 동의 거부 및 철회 시 당첨이 취소되어 경품 수령이 불가합니다.</p>
                            <p>○ 제공받는 자</p>
                            <p>이벤트 운영 및 경품 배송 대행사 ㈜그라운드케이</p>
                            <p>상기 목적으로 본인의 개인정보를 수집∙이용∙제공하는 것에 동의합니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
