package com.zihong.sbhrm.pojo;

import lombok.*;

import java.util.List;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-13 17:29
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu {
    private Integer id;

    private String serverRoute;

    private String frontendRoute;

    private String component;

    private String name;

    private String iconCls;

    private Meta meta;

    private Integer parentId;

    private Boolean enabled;

    private List<Menu> children;

    private List<Role> roles;
}
