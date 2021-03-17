package com.zihong.sbhrm;

import com.zihong.sbhrm.mapper.HrMapper;
import com.zihong.sbhrm.mapper.MenuMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-16 19:01
 */
@SpringBootTest
public class SbhrmTest {
    @Autowired
    MenuMapper menuMapper;

    @Autowired
    HrMapper hrMapper;

    @Test
    public void testMenu() {
        System.out.println(menuMapper.getMenuTreeWithChildren());
        System.out.println(menuMapper.getAllMenusWithRole());
        System.out.println(menuMapper.getMenuTreeWithChildrenByHrid(3));
    }
}
