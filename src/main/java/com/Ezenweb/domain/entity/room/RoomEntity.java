package com.Ezenweb.domain.entity.room;

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
    String trans;
    String rname;
    String rlat;
    String rlng;

    @OneToMany(mappedBy = "roomEntity")
    @Builder.Default
    @ToString.Exclude
    List<RoomImgEntity> rimg = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="mno")
    @ToString.Exclude
    MemberEntity memberEntity;
}
