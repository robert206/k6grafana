import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    VUs: 10,
    iterations: 50,
    duration: '10s',
};

export default function () {
    let URL = __ENV.URL || 'https://test-api.k6.io/public/crocodiles/'; // Default URL if not provided via Environment variable
    let res = http.get(URL);

    check(res, {
        'Status is 200': (r) => r.status === 200,
        'Response time < 500ms': (r) => r.timings.duration < 500,
        'Returns JSON': (r) => r.headers['Content-Type'] === 'application/json'
    });

    sleep(1); // user think time simulate
}