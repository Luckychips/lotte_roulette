import React, {useEffect, useState} from 'react';
import {PostCode} from '..';
import {insertAddress} from '../../API';
import './AddressForm.css';

const AddressForm = ({promotionCode, isAlready}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(true);
    const [isCheckedConsignment, setIsCheckedConsignment] = useState(true);
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    const [isHidePostCode, setIsHidePostCode] = useState(true);

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

        setAddress(fullAddress);
        setZipCode(data.zonecode);
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
            "address_r": address,
            "address_j": address,
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
        if (name.length > 0 && phone.length > 0 && email.length > 0 && address.length > 0 && detailAddress.length > 0 && isCheckedPrivacy && isCheckedConsignment) {
            setIsDisabledButton(false);
        } else {
            setIsDisabledButton(true);
        }
    }, [name, phone, email, address, detailAddress, isCheckedPrivacy, isCheckedConsignment]);

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
                            <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div className="flex-between">
                            <label>E-mail</label>
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="flex-between">
                            <label>주소</label>
                            <input className="field-addr" disabled type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                            <button className="search-address" onClick={(event) => search(event)}>주소검색</button>
                        </div>
                        <div className="flex-between">
                            <label>(상세주소)</label>
                            <input type="text" value={detailAddress} onChange={(event) => setDetailAddress(event.target.value)} />
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
                            <span className="checkbox-name">[필수] 개인 정보 수집 및 이용</span>
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
                        <div className="info-content">명품가방, 지갑, 금10돈, 무료식사권, 커피이용권 등 7종</div>
                        <div className="info-title">유의사항</div>
                        <div className="info-content">
                            <div>&middot; 이벤트 참여는 인증번호 1개 당 1회 응모 가능하며, 중복 당첨은 불가합니다.</div>
                            <div>&middot; 당첨된 경품은 타인에게 양도되지 않으며, 미 사용분에 대하여 재발송 불가합니다.</div>
                            <div>&middot; 당첨된 경품은 매장에서의 타상품 교환 및 현금 환불이 절대 불가합니다.</div>
                            <div>&middot; 타인의 인증번호 도용, 대리참가 등 부정한 방법으로 이벤트 참여 시, 확인 후 당첨이 취소될 수 있습니다.</div>
                            <div>&middot; 경품수령은 제품 발송 후 영업일 기준 7일 정도 소요됩니다.</div>
                            <div>&middot; 경품은 상기 이미지와 다를 수 있으며, 당사 사정으로 인해 수량 및 상품이 변경될 수 있습니다.</div>
                            <div>&middot; 배송 지역은 국내만 가능합니다.</div>
                            <div>&middot; 배송지 및 연락처 오기재로 인한 배송 사고는 책임지지 않습니다.</div>
                            <div>&middot; 배송문의 : 02-6949-3010</div>
                        </div>
                    </div>
                    <div className="prize-info size-sm">
                        <div className="info-title">경품라인업</div>
                        <div className="info-content category">명품가방, 지갑, 금10돈, 무료식사권, <br />커피이용권 등 7종</div>
                        <div className="info-title">유의사항</div>
                        <div className="info-content">
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>이벤트 참여는 인증번호 1개 당 1회 응모 가능하며, 중복 당첨은 불가합니다.</div>
                            </span>
                            </div>

                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>당첨된 경품은 타인에게 양도되지 않으며, 미 사용분에 대하여 재발송 불가합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>당첨된 경품은 매장에서의 타상품 교환 및 현금 환불이 절대 불가합니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>타인의 인증번호 도용, 대리참가 등 부정한 방법으로 이벤트 참여 시, 확인 후 당첨이 취소될 수 있습니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품수령은 제품 발송 후 영업일 기준 7일 정도 소요됩니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>경품은 상기 이미지와 다를 수 있으며, 당사 사정으로 인해 수량 및 상품이 변경될 수 있습니다.</div>
                            </span>
                            </div>
                            <div className="relative-container">
                                <span className="dot">&middot;</span>
                                <span className="list-item-text">
                                <div>배송 지역은 국내만 가능합니다.</div>
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
                                <div>배송문의 : 02-6949-3010</div>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
