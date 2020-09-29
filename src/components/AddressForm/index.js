import React, {useState} from 'react';
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
    const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);
    const [isCheckedConsignment, setIsCheckedConsignment] = useState(false);
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
        if (!isCheckedPrivacy) {
            alert('개인 정보 수집 및 이용에 동의해주세요.');
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
            alert('이벤트가 처리되었습니다.');
        } else {
            alert('처리 중 문제가 발생했습니다.');
        }
    };

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
                            <span className="checkbox-name">개인 정보 수집 및 이용(필수)</span>
                        </div>
                        <div className="row-flex-start">
                            <label>
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={isCheckedConsignment}
                                    onChange={(event) => setIsCheckedConsignment(event.target.checked)} />
                            </label>
                            <span className="checkbox-name">이벤트 경품 발송 및 정보처리를 위한 개인 정보처리 및 위탁에 동의합니다.</span>
                        </div>
                        <button className="address-form-submit-button" onClick={submit}>확  인</button>
                    </form>
                    {!isHidePostCode && <PostCode onComplete={postCodeOnComplete} />}
                </div>
            ) : (
                <div className="prize-info">
                    <div className="info-title">경품라인업</div>
                    <div className="info-content">샤넬미니백, 특급호텔숙박권, 특급호텔식사권 등 7종(총 2억원 상당)</div>
                    <div className="info-title">유의사항</div>
                    <div className="info-content">
                        <div>&middot; 옵션을 선택하거나 교환할 수 없습니다</div>
                        <div>&middot; 배송은 제품발송 후 영업일 기준 3~7일 정도 소요됩니다</div>
                        <div>&middot; 배송지역은 국내만 가능합니다</div>
                        <div>&middot; 배송지 및 연락처 오 기재로 인한 배송사고는 책임지지 않습니다</div>
                        <div>&middot; 배송문의 : 02-6949-3010</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
