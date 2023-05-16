package com.lsyhahaha.musicrs.service.impl;

import com.lsyhahaha.musicrs.dao.SingerMapper;
import com.lsyhahaha.musicrs.service.ISingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SingerServiceImpl implements ISingerService {
    @Autowired
    SingerMapper singerMapper;
    @Override
    public String queryUidByName(String name) {
        return singerMapper.queryByName(name);
    }
}
