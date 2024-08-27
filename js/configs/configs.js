// stage
const URLS = {
    getCarParameters: '',
    mainService: '',
    createOrder: '',
    timezoneData: '',
};

const requestConst = {
    sto_id: "",
    userToken: "",
    order_type: "b2c_order",
}

const tokenSystem = 'qswDhf^12d(';

let timeZoneObjectData = {};

let createOrderObject = {
    "service_station_id": requestConst.sto_id,
    "order_settings_template_id": "",
    "user_id": "",
    "order_type": requestConst.order_type,
    "data": {
        "client_comment___content": "",
        "settings___is_enabled": true,
        "settings___status": "new",
        "settings___number": "122",
        "settings___payment_status": "not-paid",
        "settings___statuses_times": "",
        "settings___is_completely_paid": false,
        "settings___is_prepay_received": false,
        "settings___discounts": "{\"type\":\"decreasing\",\"view\":\"sum\",\"goods\":true,\"works\":true,\"showColumns\":false,\"value\":0,\"applyForNew\":true,\"turn\":false}",
        "settings___order_list": "[1,2,3,4,5,6,7,8,9,11]",
        "settings___is_car_accepted": false,
        "settings___archive_reason": "",
        "settings___from_fixiq": false,
        "settings___register_at": "",
        "settings___check_in_at": "",
        "settings___canceled_at": "",
        "settings___pdv_percent": 0,
        "settings___is_pdv_turned_on": false,
        "settings___is_fiscal_prepay": false,
        "total_payments___price": false,
        "total_payments___rest_to_pay": false,
        "total_payments___discount": 0,
        "total_payments___is_received": false,
        "total_payments___paid_sum": 0,
        "total_payments___price_without_vat": false,
        "total_payments___vat": 0,
        "prepayment___date_and_time": null,
        "prepayment___is_received": false,
        "prepayment___is_back_dated": false,
        "prepayment___price": "0",
        "payments___list": [],
        "client___is_enabled": true,
        "client___legal_data": "{}",
        "client___users": "",
        "client___internal_id": "",
        "client___type": "default",
        "client___sms_agreement": true,
        "client___changed_agreement": false,
        "client___viber_agreement": true,
        "client___cars": "",
        "client___name": "CTO 1943",
        "car___is_enabled": true,
        "car___state_number": "BB1234CC",
        "car___brand": "2e1a899e-070a-46f8-a331-a1208c506303",
        "car___brand_name": "ACTM",
        "car___model": "2e1a899e-070a-46f8-a331-a1208c506303",
        "car___model_name": "Тралы низкорамные",
        "car___year": 2006,
        "car___vin": "",
        "car___mileage": 0,
        "car___unit": "undefined",
        "car___notes": "undefined",
        "car___internal_id": "",
        "car___engine_capacity": "undefined",
        "car___fuel_type": "undefined",
        "general___is_enabled": true,
        "general___is_trade": true,
        "general___person": "",
        "general___start_date": "",
        "general___start_time": "",
        "general___check_in_date": "",
        "general___check_in_time": "",
        "general___hide_in_app": false,
        "general___payment_type": "1",
        "general___service_class": "undefined",
        "general___issue_description": "",
        "general___default_post": "",
        "general___default_post_name": "",
        "general___default_workers": "[]",
        "general___default_workers_name": "[]",
        "general___price_type_id": "basic",
        "docs___is_enabled": true,
        "docs___template": "{\"check_points\":[{\"order_position\":1,\"title\":\"\"}],\"custom_id\":\"\",\"is_default\":false,\"is_fuel_level_enabled\":true,\"is_note_enabled\":true,\"is_receiver_comment_enabled\":true,\"is_show_not_filled_check_points\":true,\"is_vehicle_scheme_added\":true,\"title\":\"\",\"vehicle_scheme_type\":\"multiple\",\"vehicle_scheme_urls\":[],\"vehicle_type\":\"1\"}",
        "docs___client_for_docs": "undefined",
        "docs___docs_date": null,
        "docs___docs_for_changing": [],
        "docs___change_doc_date": false,
        "docs___receipts_docs": "[]",
        "comment___is_enabled": true,
        "comment___content": "",
        "works___is_enabled": true,
        "works___list": [],
        "works___the_last_finished_work": "{}",
        "service_packages___list": "[]",
        "service_packages___goods": "[]",
        "diagnostic___is_enabled": true,
        "diagnostic___content": "",
        "diagnostic___list": [],
        "client_parts___is_enabled": true,
        "client_parts___parts": "[]",
        "goods___is_enabled": true,
        "goods___list": [],
        "save_old_parts___is_enabled": true,
        "save_old_parts___content": false
    }
}