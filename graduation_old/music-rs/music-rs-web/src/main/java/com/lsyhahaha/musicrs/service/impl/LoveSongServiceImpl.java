package com.lsyhahaha.musicrs.service.impl;

import com.lsyhahaha.musicrs.dao.LoveSongMapper;
import com.lsyhahaha.musicrs.entity.LoveSongDO;
import com.lsyhahaha.musicrs.util.result.Result;
import com.lsyhahaha.musicrs.util.result.ResultUtil;
import com.lsyhahaha.musicrs.service.ILoveSongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoveSongServiceImpl implements ILoveSongService {
    @Autowired
    LoveSongMapper loveSongMapper;

    @Override
    public Result addLoveSong(LoveSongDO loveSong) {
        // 判空
        if (loveSong == null) {
            return ResultUtil.fail(420, "添加失败，传入数据为空！");
        }
        // 查询该记录是否已经存在，如果存在 则更新收藏记录状态；不存在则添加
        LoveSongDO res = loveSongMapper.queryByUidAndIid(loveSong);
        if (res == null) {
            // 设置收藏状态和时间戳
            loveSongMapper.addLoveSong(loveSong.setIsDelete("1").setTimestamp(System.currentTimeMillis() + ""));
            return ResultUtil.success(loveSong);
        }
        // 更新收藏记录
        loveSongMapper.updateLoveSong(loveSong.setIsDelete("1").setTimestamp(System.currentTimeMillis() + ""));
        return ResultUtil.success(loveSong);
    }

    @Override
    public Result cancelLoveSong(LoveSongDO loveSong) {
        // 判空
        if (loveSong == null) {
            return ResultUtil.fail(420, "添加失败，传入数据为空！");
        }
        // 如果该记录存在则更新，否则提示错误
        // LoveSong res = loveSongMapper.queryByUidAndIid(loveSong);
        // 更新收藏记录
        loveSongMapper.updateLoveSong(loveSong.setIsDelete("0").setTimestamp(System.currentTimeMillis() + ""));
        return ResultUtil.success(loveSong);
    }
}
