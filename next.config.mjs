import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public', // 서비스 워커를 저장할 위치
  register: true, // 자동 서비스 워커 등록
  skipWaiting: true, // 새 서비스 워커가 즉시 활성화되도록 설정
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // 모든 HTTP 요청에 대한 캐시 전략 설정
      handler: 'CacheFirst',  // CacheFirst 전략 사용
      options: {
        cacheName: 'app-cache', // 캐시 이름
        expiration: {
          maxEntries: 50, // 최대 캐시 항목 수
          maxAgeSeconds: 24 * 60 * 60, // 캐시 만료 시간 (1일)
        },
      },
    },
  ],
});

export default nextConfig;
