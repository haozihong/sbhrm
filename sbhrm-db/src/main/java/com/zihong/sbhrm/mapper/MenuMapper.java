package com.zihong.sbhrm.mapper;

import com.zihong.sbhrm.pojo.Menu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-13 20:42
 */
@Mapper
public interface MenuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);

    List<Menu> getAllMenusWithRole();

    Menu getMenuTreeWithChildren();

    Menu getMenuTreeWithChildrenByHrid(Integer hrid);
}
