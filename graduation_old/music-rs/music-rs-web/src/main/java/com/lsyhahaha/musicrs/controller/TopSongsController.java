package com.lsyhahaha.musicrs.controller;

import com.lsyhahaha.musicrs.service.ITopSongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TopSongsController {
    @Autowired
    private ITopSongsService iTopSongsService;
}
