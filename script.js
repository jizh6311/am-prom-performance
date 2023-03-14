import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_failed': ['rate<0.01'], // the error rate must be lower than 1%.
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function () {
  const promQueryURL = __ENV.PROM_QUERY_URL;
  const queryWindow = __ENV.QUERY_WINDOW || '1h';
  const query = __ENV.QUERY || `avg_over_time(container_memory_usage[${queryWindow}])`;
  const authType = __ENV.AUTH_TYPE || 'Basic';
  const authString = __ENV.AUTH_STRING;
  const url = `${promQueryURL}?query=${query}`;
  const params = {
    headers: {
      'Authorization': `${authType} ${authString}`,
      'Accept': "*/*",
    }
  }

  const res = http.get(url, params);
  check(res, { 'status was 200': (r) => r.status == 200 });

  sleep(1);
}