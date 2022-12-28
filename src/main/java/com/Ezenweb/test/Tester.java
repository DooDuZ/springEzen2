package com.Ezenweb.test;

import com.Ezenweb.domain.entity.board.BoardRepository;
import com.Ezenweb.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Tester extends Thread {
    @Autowired
    BoardRepository boardRepository;

    @Override
    public void run() {
        while(true){
            System.out.println("ㅋㅋㅋㅋ");
            System.out.println(boardRepository.findById(10).toString());
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                System.out.println("스레드 오류 : " + e);
            }
        }
    }
}
