package com.zihong.sbhrm.controller;

import com.zihong.sbhrm.pojo.Hr;
import com.zihong.sbhrm.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hr")
public class HrController {
    @Autowired
    HrService hrService;

    @GetMapping("")
    public List<Hr> getAllHrs() {
        return hrService.getAllHrs(null);
    }

    @GetMapping("/{id}")
    public Hr getHrById(@PathVariable Integer id) {
        return hrService.getHrById(id);
    }

    @PutMapping("")
    public Integer updateHr(@RequestBody Hr hr) {
        if (hrService.updateHr(hr) == 1) {
            return 0;  // success
        }
        return 1;  // fail
    }

    @DeleteMapping("/{id}")
    public Integer deleteHrById(@PathVariable Integer id) {
        if (hrService.deleteHrById(id) == 1) {
            return 0;
        }
        return 1;
    }
}
