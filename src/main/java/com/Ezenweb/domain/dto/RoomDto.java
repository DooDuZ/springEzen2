package com.Ezenweb.domain.dto;

import com.Ezenweb.domain.entity.img.RoomImgEntity;
import com.Ezenweb.domain.entity.img.RoomImgRepository;
import com.Ezenweb.domain.entity.room.RoomEntity;
import com.sun.javafx.scene.control.skin.VirtualFlow;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString @Builder
public class RoomDto {
    private int rno;
    private String rtitle;
    private int rprice;
    private String trans;
    private List<MultipartFile> rimg;
    private String rname;
    private String rlat;
    private String rlng;

    @Autowired
    RoomImgRepository roomImgRepository;

    public RoomEntity toEntity(){

        return RoomEntity.builder().rtitle(this.rtitle).rprice(this.rprice).trans(this.trans)
                .rname(this.rname).rlat(this.rlat).rlng(this.rlng).build();
    }
}
