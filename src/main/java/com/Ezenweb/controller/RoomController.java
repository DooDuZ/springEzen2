package com.Ezenweb.controller;

import com.Ezenweb.domain.dto.RoomDto;
import com.Ezenweb.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/setroom")
    public boolean write(RoomDto roomDto){
        System.out.println(roomDto.toString());
        return roomService.write(roomDto);
    }

    @GetMapping("/getroomlist")
    public List<RoomDto> getroomlist(){ return roomService.getroomlist();}
}
