package com.Ezenweb.controller;

import com.Ezenweb.domain.dto.BoardDto;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController // 해당 클래스가 컨트롤 목적 사용
@RequestMapping("/board") // 해당 클래스 안에 있는 Mapping 들의 공통 URL
public class BoardController {

    //  -------------------- HTML LOAD URL --------------------------------
    // 1. 게시물 목록 페이지[ HTML ] 열기
    @GetMapping("/list") // URL 정의 하기
    public Resource list() {
        return new ClassPathResource("templates/board/list.html");
    }
    // 2. 게시물 쓰기 페이지 열기
    @GetMapping("/write") // URL 정의 하기
    public Resource write() {
        return new ClassPathResource("templates/board/write.html");
    }
    //  -------------------- ------------------ ---------------------------
    //  -------------------- 기능 처리   --------------------------------
    // 1. 게시물 쓰기 처리 [ 첨부파일 ]
    @PostMapping("/setboard")
    public boolean setboard( @RequestBody BoardDto boardDto ){
        // 1. DTO 내용 확인
        System.out.println( boardDto.toString());
        // 2. ----------> 서비스[ 비지니스 로직 ] 로 이동
        // 3. 반환
        return true;
    }
    // 2. 게시물 목록 보기 처리 [ 페이지 , 검색 ]
    @GetMapping("/getboards")
    public ArrayList<BoardDto> getboards( ){
        // 1. ----------> 서비스[ 비지니스 로직 ] 로 이동
        // 2. 반환
        return null;
    }
    // 3. 게시물 개별 조회 처리
    // @GetMapping("/getboard")
    // 4. 게시물 수정 처리
    // @PutMapping("/updateboard")
    // 5. 게시물 삭제 처리
    // @DeleteMapping("/deleteboard")

}
