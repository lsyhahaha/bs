package com.lsyhahaha.musicrs.controller;

import com.lsyhahaha.musicrs.service.ITopUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TopUsersController {
    @Autowired
    private ITopUserService iTopUserService;
}
