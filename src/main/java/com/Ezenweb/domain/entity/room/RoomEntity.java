package com.Ezenweb.domain.entity.room;

import com.Ezenweb.domain.dto.RoomDto;
import com.Ezenweb.domain.entity.img.RoomImgEntity;
import com.Ezenweb.domain.entity.member.MemberEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "room")
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString @Builder
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int rno;
    String rtitle;
    int rprice;
    String rtrans;
    String rname;
    String rlat;
    String rlng;

    @OneToMany(mappedBy = "roomEntity")
    @Builder.Default
    @ToString.Exclude
    List<RoomImgEntity> roomImgEntityList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    MemberEntity memberEntity;

    public RoomDto toDto() {
        // 이미지엔티티에서 이미지이름만 추출
        List<String> list = new ArrayList<>();
        roomImgEntityList.forEach( (img) -> {
            list.add( img.getRimg() );
        });
        return RoomDto.builder()
                .rno( this.rno)
                .rtitle( this.rtitle)
                .rprice( this.rprice)
                .rtrans(this.rtrans)
                .rname(this.rname)
                .rlng( this.rlng)
                .rlat(this.rlat)
                .meamil( this.getMemberEntity().getMemail() )// 멤버엔티티->작성자
                .getrimg( list )// 이미지엔티티->이미지이름들
                .build();
    }
}
