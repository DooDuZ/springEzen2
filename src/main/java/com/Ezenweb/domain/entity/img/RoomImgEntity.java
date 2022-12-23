package com.Ezenweb.domain.entity.img;

import com.Ezenweb.domain.dto.RoomDto;
import com.Ezenweb.domain.entity.room.RoomEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roomimg")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RoomImgEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int rimgno;
    String rimg;

    @ManyToOne
    @JoinColumn(name="rno")
    @ToString.Exclude
    RoomEntity roomEntity;


}
