package com.zihong.sbhrm.controller;

import org.springframework.lang.NonNull;
import com.zihong.sbhrm.pojo.Hr;
import com.zihong.sbhrm.service.HrService;
import com.zihong.sbhrm.utils.RespUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Operations for **current** logged in user
 *
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-12 14:46
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    HrService hrService;

    @GetMapping("/info")
    public Hr getCurrentHr(Authentication authentication) {
        return (Hr) authentication.getPrincipal();
    }

    @PutMapping("/info")
    public RespUtils updateHr(@RequestBody Hr hr, Authentication authentication) {
        if (!hr.getId().equals(((Hr) authentication.getPrincipal()).getId())) {
            return RespUtils.error("[FAIL] updating other's info");
        }
        if (hrService.updateHr(hr) == 1) {
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(hr, authentication.getCredentials(), authentication.getAuthorities()));
            return RespUtils.ok("[SUCCESS] update user info success");
        }
        return RespUtils.error("[FAIL] update user info fail");
    }

    @PutMapping("/pwd")
    public RespUtils updateHrPwd(@RequestParam("oldPwd") @NonNull String oldPwd, @RequestParam("pwd") @NonNull String pwd, Authentication authentication) {
        if (pwd == null || pwd.length() < 1) {
            return RespUtils.error("[FAIL] invalid new password");
        }
        Hr hr = (Hr) authentication.getPrincipal();
        if (hrService.updatePwd(hr.getId(), oldPwd, pwd)) {
            // logout current user after changing password
            SecurityContextHolder.getContext().setAuthentication(null);
            SecurityContextHolder.clearContext();
            return RespUtils.ok("[SUCCESS] update user password success");
        }
        return RespUtils.error("[FAIL] update user password fail");
    }

    @PostMapping("/avatarUrl")
    public RespUtils updateHrAvatarUrl(@RequestParam("avatar") @NonNull String avatarUrl, Authentication authentication) {
        if (avatarUrl.length() < 1) {
            return RespUtils.error("[FAIL] invalid avatar url");
        }
        Hr hr = (Hr) authentication.getPrincipal();
        if (hrService.updateAvatar(hr.getId(), avatarUrl) == 1) {
            hr.setAvatar(avatarUrl);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(hr, authentication.getCredentials(), authentication.getAuthorities()));
            return RespUtils.ok("[SUCCESS] update user avatar success");
        }
        return RespUtils.error("[FAIL] update user avatar fail");
    }
}
