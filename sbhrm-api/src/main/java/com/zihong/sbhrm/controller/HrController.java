package com.zihong.sbhrm.controller;

import com.zihong.sbhrm.pojo.Hr;
import com.zihong.sbhrm.service.HrService;
import com.zihong.sbhrm.utils.RespUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Routes for managing hrs. Need authorization.
 *
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-12 14:47
 */
@RestController
@RequestMapping("/admin/hr")
public class HrController {
    @Autowired
    HrService hrService;

    @GetMapping("")
    public List<Hr> getAllHrs() {
        return hrService.getAllHrs(null);
    }

    @GetMapping("/{id}")
    public Hr getHrById(@PathVariable("id") Integer id) {
        return hrService.getHrById(id);
    }

    @PostMapping("")
    public Integer addHr(@RequestBody Hr hr) {
        if (hrService.addHr(hr) == 1) {
            return 0;  // success
        }
        return 1;  // fail
    }

    @PutMapping("/{id}")
    public RespUtils updateHr(@RequestBody Hr hr, @PathVariable("id") Integer id) {
        if (hr.getId() != null && !hr.getId().equals(id)) {
            return RespUtils.error("[FAIL] wrong user id");
        }
        hr.setId(id);
        hr.setPassword(null);
        if (hrService.updateHr(hr) == 1) {
            return RespUtils.ok("[SUCCESS] update user#" + hr.getUsername() + " info success");
        }
        return RespUtils.error("[FAIL] update#" + hr.getUsername() + " user info fail");
    }

    @DeleteMapping("/{id}")
    public Integer deleteHrById(@PathVariable("id") Integer id) {
        if (hrService.deleteHrById(id) == 1) {
            return 0;
        }
        return 1;
    }
}
