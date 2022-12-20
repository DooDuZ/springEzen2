package com.Ezenweb.service;

import com.Ezenweb.domain.dto.RoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomService {
    @Transactional
    public boolean write(RoomDto roomDto){
        return true;
    }

    /*
    @Transactional
    public boolean write(RoomDto roomDto){
        RoomEntity roomEntity = roomRepository.save(roomDto.toEntity());
        if(roomEntity != null){
            ImageEntity imageEntity = imageRepository.save(ImageEntity.builder().imageDirection(roomDto.getImageDirection()).build());
            imageEntity.setRoomEntity(roomEntity);
            roomEntity.getImgList().add(imageEntity);
            return true;
        }
        return false;
    }
 */
}
