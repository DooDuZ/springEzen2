package com.Ezenweb;

import com.Ezenweb.test.Tester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// p.11
@SpringBootApplication // 스프링 웹 위한 기본 설정 어노테이션
@EnableJpaAuditing // JPA 감시 [ 생성 , 변경 ]  P.242
public class Webstart {
    @Autowired
    Tester thread;
    public static void main(String[] args) {  // main 스레드
        SpringApplication.run( Webstart.class  );
            // 스프링 어플리케이션 실행[ 현재클래스명.class ]
    }
}

/*
    1. extend  : 상속 [ 설계도 물려받는다. 1개만 가능  ]
    2. @ 어노테이션  [ 빌드[실행] 할때 자동 코드 실행  / 여러개 가능 ]
        1. 내장 : @override : 상속 메소드 재정의할때
        2. 메타 :

            1. @SpringBootApplication : 컴포넌트 스캔
                컴포넌트 사용하는 클래스들을 스캔 빈[스프링 메모리] 등록
                        1. @Controller
                        2. @RestContrller

 */
