package com.zihong.sbhrm.service;

import com.zihong.sbhrm.mapper.HrMapper;
import com.zihong.sbhrm.pojo.Hr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-10 17:04
 */
@Service
public class HrService implements UserDetailsService {
    @Autowired
    HrMapper hrMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Hr hr = hrMapper.loadUserByUsername(username);
        if (hr == null) {
            throw new UsernameNotFoundException("Username not found!");
        }
        return hr;
    }

    public Hr getHrById(Integer id) {
        return hrMapper.selectByPrimaryKey(id);
    }

    public List<Hr> getAllHrs(String keywords) {
        return hrMapper.getAllHrs(-1, keywords);
    }

    public Integer addHr(Hr hr) {
        return hrMapper.insertSelective(hr);
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
