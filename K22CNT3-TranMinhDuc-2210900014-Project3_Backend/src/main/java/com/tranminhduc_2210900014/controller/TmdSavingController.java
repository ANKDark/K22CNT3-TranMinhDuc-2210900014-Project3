package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdSaving;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import com.tranminhduc_2210900014.service.saving.TmdSavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tmdSaving")
@RequiredArgsConstructor
@CrossOrigin
public class TmdSavingController {
    private final TmdSavingService tmdSavingService;
    private final TmdAuthService tmdAuthService;

    @PostMapping("/tmdAddSaving")
    public ResponseEntity<?> tmdAddSaving(@RequestHeader("Authorization") String token, @RequestBody TmdSaving tmdSaving) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }
        tmdSaving.setTmdUser(user.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(tmdSavingService.tmdAddSaving(tmdSaving, token));
    }

    @GetMapping("/tmdListSaving")
    public ResponseEntity<?> tmdGetSavingByUserId(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        int userId = user.get().getId();
        return ResponseEntity.ok(tmdSavingService.tmdGetSavingByUserId(userId, token));
    }

    @PutMapping("/tmdUpdateSaving/{tmdId}")
    public ResponseEntity<?> tmdUpdateSaving(@RequestHeader("Authorization") String token,
                                             @PathVariable int tmdId,
                                             @RequestBody TmdSaving tmdSaving) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdSaving.setTmdUser(user.get());
        return ResponseEntity.ok(tmdSavingService.tmdUpdateSaving(tmdSaving, tmdId, token));
    }

    @DeleteMapping("/tmdDeleteSaving/{id}")
    public ResponseEntity<?> tmdDeleteSaving(@RequestHeader("Authorization") String token, @PathVariable int id) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdSavingService.tmdDeleteSaving(id, token);
        return ResponseEntity.ok("Xóa khoản tiết kiệm thành công!");
    }
}
