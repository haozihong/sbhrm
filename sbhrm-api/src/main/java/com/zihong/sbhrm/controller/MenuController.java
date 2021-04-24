package com.zihong.sbhrm.controller;

import com.zihong.sbhrm.pojo.Hr;
import com.zihong.sbhrm.pojo.Menu;
import com.zihong.sbhrm.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-17 01:17
 */
@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    MenuService menuService;

    public Menu getMenuTreeOfCurrentUser(Authentication authentication) {
        return menuService.getMenuTreeWithChildrenByHrid(((Hr) authentication.getPrincipal()).getId());
    }

    @GetMapping("/menuTree")
    public Menu getEnabledMenuTreeOfCurrentUser(Authentication authentication) {
        return menuService.getEnabledMenuTreeWithChildrenByHrid(((Hr) authentication.getPrincipal()).getId());
    }

    @GetMapping("/test/{hrid}")
    public Menu getMenuTreeByHrid(@PathVariable("hrid") Integer hrid) {
        return menuService.getMenuTreeWithChildrenByHrid(hrid);
    }
}
