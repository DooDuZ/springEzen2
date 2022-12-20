package com.Ezenweb.domain.dto;

import com.Ezenweb.domain.entity.member.MemberEntity;
import lombok.*;

import java.util.Map;

@NoArgsConstructor @AllArgsConstructor
@Getter@Setter@ToString@Builder
public class OauthDto {
    private String memail;                      // 아이디 [이메일]
    private String mname;                       // 이름[닉네임]
    private String registrationId;              // auth 회사명
    private Map<String , Object > attributes;   // 인증 결과
    private String oauth2UserInfo;              // 회원정보
    // auth 회사에 따른 객체 생성 // 1.oauth회사명[registrationId] // 2. 회원정보[oauth2UserInfo] 3. 인증결과 [ attributes ]
    public static OauthDto of( String registrationId ,   String oauth2UserInfo ,    Map<String , Object> attributes) {
        if( registrationId.equals("kakao") )        { return ofKakao( registrationId , oauth2UserInfo ,attributes );  }
        else if( registrationId.equals("naver") )   { return ofNaver( registrationId , oauth2UserInfo ,attributes );  }
        else if( registrationId.equals("google") )  { return ofGoogle( registrationId , oauth2UserInfo ,attributes ); }
        else{ return  null; }
    }

    // 1. 카카오 객체 생성 메소드
    public static OauthDto ofKakao( String registrationId , String oauth2UserInfo , Map<String , Object> attributes ){
        // 1. 회원정보 호출
        Map< String , Object > kakao_account = (Map<String, Object>) attributes.get( oauth2UserInfo  );
            // kako_account -> email , profile[nickname]
        Map< String , Object > profile = (Map<String, Object>) kakao_account.get("profile"); // profile -> nickname
        return OauthDto.builder()
                .memail( (String)kakao_account.get("email") )
                .mname( (String)profile.get("nickname") )
                .registrationId( registrationId )
                .oauth2UserInfo( oauth2UserInfo )
                .attributes( attributes )
                .build();
    }

    // 2. 네이버 객체 생성 메소드
    public static OauthDto ofNaver( String registrationId , String oauth2UserInfo , Map<String , Object> attributes ){
        System.out.println( "naver attributes : " + attributes  );
        Map<String , Object> response = (Map<String, Object>) attributes.get( oauth2UserInfo );

        return OauthDto.builder()
                .memail( (String) response.get("email"))
                .mname( (String) response.get("nickname"))
                .registrationId( registrationId )
                .oauth2UserInfo(oauth2UserInfo )
                .attributes( attributes )
                .build();
    }
    // 3. 구글 객체 생성 메소드
    public static OauthDto ofGoogle( String registrationId , String oauth2UserInfo , Map<String , Object> attributes ){
        System.out.println("Google attributes " + attributes );
        return OauthDto.builder()
                .memail((String) attributes.get("email"))
                .mname((String) attributes.get("name"))
                .registrationId( registrationId)
                .oauth2UserInfo(oauth2UserInfo )
                .attributes( attributes )
                .build();
    }

    // 4. dto --> ToEntity
    public MemberEntity toEntity(  ){
        return MemberEntity.builder()
                .memail( this.memail )
                .mrol( "ROLE_MEMBER" )
                .build();
    }

}



















