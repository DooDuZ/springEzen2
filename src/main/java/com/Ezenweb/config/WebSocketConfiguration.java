package com.Ezenweb.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration  // 설정 어노테이션
@EnableWebSocket // 웹 소켓 명시
public class WebSocketConfiguration implements WebSocketConfigurer {

    @Autowired
    private ServerSocketHandler serverSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) { // 서버소켓 등록 메서드
        registry.addHandler(serverSocketHandler, "/chat").setAllowedOrigins("*");
        // path : 서버소켓 엔드포인트
        // setAllowedOrigins(URL) : 해당 핸들러를 요청할 수 있는 URL --> [ * : 모든 URL ]
            // * = 와일드 카드
    }
}
