package com.zihong.sbhrm.service;

import com.zihong.sbhrm.mapper.MenuMapper;
import com.zihong.sbhrm.pojo.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-17 00:38
 */
@Service
public class MenuService {
    @Autowired
    MenuMapper menuMapper;

    public Menu getMenuTreeWithChildrenByHrid(int hrid) {
        Menu menuTree = menuMapper.getMenuTreeWithChildrenByHrid(hrid);
        Queue<Menu> que = new LinkedList<>();
        que.add(menuTree);
        while (!que.isEmpty()) {
            List<Menu> children = que.remove().getChildren();
            for (int i = children.size() - 1; i >= 0; --i) {
                if (children.get(i).getChildren().size() == 0) {
                    if (children.get(i).getComponent() == null) children.remove(i);
                } else {
                    que.add(children.get(i));
                }
            }
        }
        return menuTree;
    }

    public Menu getEnabledMenuTreeWithChildrenByHrid(int hrid) {
        Menu menuTree = menuMapper.getMenuTreeWithChildrenByHrid(hrid);
        Queue<Menu> que = new LinkedList<>();
        que.add(menuTree);
        while (!que.isEmpty()) {
            List<Menu> children = que.poll().getChildren();
            for (int i = children.size() - 1; i >= 0; --i) {
                if (children.get(i).getEnabled()) {
                    if (children.get(i).getChildren().size() > 0) que.add(children.get(i));
                } else {
                    children.remove(i);
                }
            }
        }
        return menuTree;
    }

    public List<Menu> getAllMenusWithRole() {
        return menuMapper.getAllMenusWithRole();
    }
}
