package com.Ezenweb.service;

import com.Ezenweb.domain.dto.RoomDto;
import com.Ezenweb.domain.entity.img.RoomImgEntity;
import com.Ezenweb.domain.entity.img.RoomImgRepository;
import com.Ezenweb.domain.entity.member.MemberEntity;
import com.Ezenweb.domain.entity.member.MemberRepository;
import com.Ezenweb.domain.entity.room.RoomEntity;
import com.Ezenweb.domain.entity.room.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomImgRepository roomImgRepository;

    String path ="C:\\Users\\504\\IdeaProjects\\springEzen2\\build\\resources\\main\\static\\static\\media\\";

    @Transactional
    public boolean write(RoomDto roomDto ){
        // 1. 등록한 유저 [ 로그인한 유저 ]
        String loginMemail = memberService.getloginMno();
        System.out.println(loginMemail);
        if( loginMemail == null ){ return false; }
        MemberEntity memberEntity = memberRepository.findByMemail( loginMemail.split("_")[0] ).get();
        // 2. 룸/사진 등록
        // 1. 룸 저장 [ save( 엔티티 ) 반환타입 [ 저장된 매핑 레코드 ]
        RoomEntity roomEntity = roomRepository.save( roomDto.toEntity() );
        if( roomEntity.getRno() < 1 ){ return false; }
        // 2. 룸에 회원엔티티 대입  // 3. 회원엔티티에 룸 대입   [ 양방향 관계 ]
        roomEntity.setMemberEntity( memberEntity );
        memberEntity.getRoomEntityList().add( roomEntity );
        // 3. 사진등록 저장
        roomDto.getRimg().forEach( (img) -> { // 첨부파일 여러개 일경우 혹은 존재할경우
            if( !img.getOriginalFilename().equals("") ){ // 실제 첨부파일의 파일명이 존재할경우
                RoomImgEntity roomImgEntity = roomImgRepository.save(
                        RoomImgEntity.builder().rimg( img.getOriginalFilename() ).build()
                );// 필드가 적을때는 굳이 DTO 필요없음
                // 4. 룸에 사진엔티티 대입  // 5  사진엔티티에 룸 대입   [ 양방향 관계 ]
                roomEntity.getRoomImgEntityList().add( roomImgEntity );
                roomImgEntity.setRoomEntity( roomEntity );

                try{
                    String filename = roomImgEntity.getRimgno() + img.getOriginalFilename();
                    roomImgEntity.setRimg(filename);
                    File file = new File(path+filename);
                    img.transferTo(file);
                }catch (Exception e){
                    System.out.println("파일 업로드 오류" + e);
                }
            }
        });
        return true;
    }

    // 2. 룸 출력
    @Transactional
    public List<RoomDto> getroomlist(){
        // 1. 모든 룸 엔티티 꺼내기
        List<RoomEntity> roomEntityList = roomRepository.findAll(); // 매핑된 엔티티들
        List<RoomDto> roomDtoList = new ArrayList<>();              // 출력용 디티오
        // 2. 형변환
        roomEntityList.forEach( (e) -> {
            roomDtoList.add(  e.toDto() );
        });
        return roomDtoList;
    }
}
