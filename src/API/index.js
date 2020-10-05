import api from 'axios';

const path  = 'http://13.124.102.27:8080/api';
export const checkPromotionCode = (code) => {
    const suffix = `/check-promotion?promotion_code=${code}`;
    return api.get(`${path}${suffix}`);
};

export const insertAddress = (params) => {
    const suffix = '/gift-delivery';
    return api.post(`${path}${suffix}`, params);
};
