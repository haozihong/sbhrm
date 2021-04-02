package com.zihong.sbhrm.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-13 20:40
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Meta {
    private Boolean keepAlive;

    private Boolean requireAuth;
}
