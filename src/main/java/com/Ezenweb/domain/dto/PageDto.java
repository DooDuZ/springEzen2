package com.Ezenweb.domain.dto;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @Builder @ToString
public class PageDto {

    private int bcno;
    private int page;
    private String key;
    private String keyword;

    @Builder.Default
    private List<BoardDto> list = new ArrayList<>();
    private int startbtn;
    private int endbtn;
    private Long totalBoards;
}
