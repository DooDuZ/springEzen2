package com.Ezenweb.service;

import com.Ezenweb.domain.dto.MemberDto;
import com.Ezenweb.domain.entity.MemberEntity;
import com.Ezenweb.domain.entity.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

// ------------------------------- 전역 객체 -------------------------------//
    @Autowired
    private MemberRepository memberRepository;      //리포지토리 객체
    @Autowired // 스프링 컨테이너 [ 메모리 ] 위임
    private HttpServletRequest request ;            // 요청 객체

// -------------------------------- 서비스 메소드 --------------------------//
    // 1. 회원가입
    @Transactional
    public int setmember(MemberDto memberDto ){
        // 1. DAO 처리 [ insert ]
        MemberEntity entity = memberRepository.save( memberDto.toEntity() );
            // memberRepository.save( 엔티티 객체 ) : 해당 엔티티 객체가 insert 생성된 엔티티객체 반환
         // 2. 결과 반환 [ 생성된 엔티티의 pk값 반환 ]
        return entity.getMno();
    }
    // 2. 로그인
    @Transactional
    public int getmember(MemberDto memberDto ){
        // 1. Dao 처리 [ select ]
            // 1. 모든 엔티티=레코드 호출 [ select * from member ]
        List<MemberEntity> entityList = memberRepository.findAll();
            // 2. 입력받은 데이터와 일치값 찾기
        for( MemberEntity entity : entityList ){ // 리스트 반복
            if( entity.getMemail().equals(memberDto.getMemail())){ // 엔티티=레코드 의 이메일 과 입력받은 이메일
                if( entity.getMpassword().equals(memberDto.getMpassword())){ // 엔티티=레코드 의 패스워드 와 입력받은 패스워드
                    // 세션 부여 [ 로그인 성공시 'loginMno'이름으로 회원번호 세션 저장  ]
                    request.getSession().setAttribute("loginMno" , entity.getMno() );
                                                                // 엔티티 = 레코드 = 로그인 성공한객체
                    return 1;// 로그인 성공했다.
                }else{
                    return 2; // 패스워드 틀림 [ 전제조건 : 아이디중복 없다는 전제조건 ]
                }
            }
        }
        return 0; // 아이디가 틀림
    }
    // 3. 비밀번호찾기
    @Transactional
    public String getpassword( String memail ){
        // 1. 모든 레코드/엔티티 꺼내온다.
        List<MemberEntity> entityList
                = memberRepository.findAll();
        // 2. 리스트에 찾기
        for( MemberEntity entity : entityList ){ // 리스트 반복
            if( entity.getMemail().equals( memail) ){
                return entity.getMpassword();
            }
        }
        return null;
    }
    // 4. 회원탈퇴
    @Transactional
    public int setdelete( String mpassword ){
        // 1. 로그인된 회원의 엔티티 필요!!
            // 1. 세션 호출
            Object object =  request.getSession().getAttribute("loginMno");
            // 2. 세션 확인
            if( object != null ){ // 만약에 세션이 null 이 아니면 로그인 됨
                int mno = (Integer) object; // 형변환 [ object --> int ]
                // 3. 세션에 있는 회원번호[PK] 로 리포지토리 찾기 [ findById : select * from member where mno = ? ]
                Optional< MemberEntity > optional =  memberRepository.findById(mno);
                if( optional.isPresent() ){ // optional객체내 엔티티 존재 여부 판단
                    // Optional 클래스 : null 관련 메소드 제공
                    // 4.Optional객체에서 데이터[엔티티] 빼오기
                    MemberEntity entity = optional.get();
                    // 5. 탈퇴 [ delete : delete from member where mno = ? ]
                    memberRepository.delete( entity );
                    // 6. 세션 [ 세션삭제 = 로그아웃 ]
                    request.getSession().setAttribute("loginMno" , null);
                    return 1;
                }
            }
            return 0; // [ 만약에 세션이 null 이면 반환 o 혹은 select 실패시   ]
    }
    // 5. 회원 수정
    @Transactional // 데이터 수정[update]시 필수 ~~
    public int setupdate( String mpassword ){
        // 1. 세션 호출
        Object object = request.getSession().getAttribute("loginMno");
        // 2. 세션 존재여부 판단
        if( object != null ){
            int mno = (Integer)object;
            // 3. pk값을 가지고 엔티티[레코드] 검색
            Optional<MemberEntity> optional
                    =  memberRepository.findById( mno );
            // 4. 검색된 결과 여부 판단
            if( optional.isPresent() ){ // 엔티티가 존재하면
                MemberEntity entity = optional.get();
                // 5. 찾은 엔티티[레코드]의 필드값 변경 [ update member set 필드명 = 값  where 필드명 = 값 ]
                entity.setMpassword( mpassword );
                return  1 ;
            }
        }
        return 0;
    }
    // 6. 로그인 여부 판단 메소드
    public int getloginMno(){
        // 1. 세션 호출
        Object object  = request.getSession().getAttribute("loginMno");
        // 2. 세션 여부 판단
        if( object != null ){ return (Integer) object; }
        else{ return 0; }
    }
}









