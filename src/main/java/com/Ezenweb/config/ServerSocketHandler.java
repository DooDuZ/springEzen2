package com.Ezenweb.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Vector;

@Component
public class ServerSocketHandler extends TextWebSocketHandler {

    // 접속자 리스트
    private static List<WebSocketSession> list = new Vector<>();

    // 접속
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("접속 : " + session);
        list.add(session);
    }

    // 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("종료 : " + session);
        list.remove(session);
    }

    // 수신    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for(WebSocketSession s : list){
            s.sendMessage(message);
        }
    }
}
