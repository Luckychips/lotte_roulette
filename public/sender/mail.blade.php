<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>당첨 메일 발송</title>
    <style>
        .mail-header img {
            width: 100%;
        }

        .user-info {
            padding: 48px 0 28px 0;
            text-align: center;
            font-size: 18px;
            color: #464343;
            border-bottom: 1px solid #e6e6e6;
        }

        .user-info > div:nth-child(1) {
            margin-bottom: 10px;
        }

        .user-info > div:nth-child(1) strong {
            font-size: 24px;
        }

        .mail-prize-info {
            padding: 0 50px;
            margin-top: 45px;
        }

        .mail-prize-info > div {
            margin-bottom: 40px;
        }

        .mail-prize-info div .sub-title {
            font-size: 18px;
            font-weight: bold;
            color: #464343;
            margin-bottom: 10px;
        }

        .mail-prize-info div .text {
            font-size: 18px;
            color: #464343;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="mail-header">
        <img src="mail_header.png" alt="" />
    </div>
    <div class="user-info">
        <div>
            <strong>{{ $name }}</strong> <span>님</span>
        </div>
        <div><span>VISA 카드 X 위메프페이와 함께하는</span> <strong>보너스 이벤트 경품 당첨</strong><span>을 축하드립니다.</span></div>
    </div>
    <div class="mail-prize-info">
        <div>
            <div class="sub-title">당첨경품</div>
            <div class="text">{{ $giftsName }}</div>
        </div>
        <div>
            <div class="sub-title">배송정보</div>
            <div class="text">이름 : {{ $name }}</div>
            <div class="text">연락처 : {{ $phone }}</div>
            <div class="text">E-mail : {{ $email }}</div>
            <div class="text">주소 : {{ $address }}</div>
        </div>
        <div>
            <div class="sub-title">유의사항</div>
            <div class="text">경품 배송은 당첨 후 배송됩니다. (당사 사정에 의해 지연될 수도 있습니다.)</div>
            <div class="text">경품 수령은 배송 후 영업일 기준 약 7일 정도 소요됩니다.</div>
            <div class="text">제공 경품은 타인에게 양도되지 않으며, 미 사용분에 대한 재발송이 불가합니다.</div>
            <div class="text">제공 경품은 다른 제품으로 변경 및 현금 환불이 불가합니다.</div>
            <div class="text">경품은 위탁업체 사정으로 변경될 수 있으며, 이 경우 안내된 경품의 정상가에 해당하는 제품으로 대체됩니다.</div>
            <div class="text">경품 제세공과금(경품가의 22%)은 경품 이벤트 운영사에서 부담합니다.</div>
            <div class="text">타인의 개인정보를 도용하거나 부정한 방법으로 참여 시 당첨을 취소합니다.</div>
            <div class="text">배송지 및 연락처 오기재로 인한 배송 사고는 책임지지 않습니다.</div>
            <div class="text">이벤트 및 경품 배송문의 : 대행사 ㈜그라운드케이, 02-6949-3010</div>
        </div>
    </div>
</body>
</html>
