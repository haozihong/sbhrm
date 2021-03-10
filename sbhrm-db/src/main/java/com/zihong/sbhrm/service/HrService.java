package com.zihong.sbhrm.service;

import com.zihong.sbhrm.mapper.HrMapper;
import com.zihong.sbhrm.pojo.Hr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HrService {
    @Autowired
    HrMapper hrMapper;

    public Hr getHrById(Integer id) {
        return hrMapper.selectByPrimaryKey(id);
    }

    public List<Hr> getAllHrs(String keywords) {
        return hrMapper.getAllHrs(-1, keywords);
    }

    public Integer updateHr(Hr hr) {
        return hrMapper.updateByPrimaryKeySelective(hr);
    }

    public Integer deleteHrById(Integer id) {
        return hrMapper.deleteByPrimaryKey(id);
    }

    public Integer updatePasswd(Integer hrid, String oldPwd, String pwd) {
        // TODO: 2021/03/10 verify old password and encode the new one
        return null;
    }

    public Integer updateAvatar(String url, Integer id) {
        return hrMapper.updateAvatar(url, id);
    }
}
