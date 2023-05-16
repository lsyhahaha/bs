package com.lsyhahaha.musicrs.service.impl;

import com.lsyhahaha.musicrs.dao.AdminMapper;
import com.lsyhahaha.musicrs.entity.AdministratorDO;
import com.lsyhahaha.musicrs.service.IAdminService;
import com.lsyhahaha.musicrs.util.result.Result;
import com.lsyhahaha.musicrs.util.result.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdminServiceImpl implements IAdminService {
    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Result adminLogin(AdministratorDO admin) {
        // 查询数据库
        AdministratorDO res = adminMapper.queryByName(admin.getName());
        // 这里密码在数据库中实际上应该是加密
        if (res != null && admin.getPassword().equals(res.getPassword())) {
            return ResultUtil.success(admin);
        }else {
            return ResultUtil.fail(400, "管理员不存在");
        }
    }
}
