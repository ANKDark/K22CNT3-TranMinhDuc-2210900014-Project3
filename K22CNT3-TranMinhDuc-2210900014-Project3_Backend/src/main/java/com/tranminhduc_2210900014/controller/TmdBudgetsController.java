package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdBudget;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import com.tranminhduc_2210900014.service.budgets.TmdBudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tmdBudget")
@RequiredArgsConstructor
@CrossOrigin
public class TmdBudgetsController {
    private final TmdBudgetService tmdBudgetService;
    private final TmdAuthService tmdAuthService;

    @PostMapping("/tmdAddBudget")
    public ResponseEntity<?> tmdAddBudget(@RequestHeader("Authorization") String token, @RequestBody TmdBudget tmdBudget) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }
        tmdBudget.setTmdUser(user.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(tmdBudgetService.tmdAddBudget(tmdBudget, token));
    }

    @GetMapping("/tmdListBudgets")
    public ResponseEntity<?> tmdGetBudgetsByUserId(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        int userId = user.get().getId();
        return ResponseEntity.ok(tmdBudgetService.tmdGetBudgetsByUserId(userId, token));
    }

    @PutMapping("/tmdUpdateBudget/{tmdId}")
    public ResponseEntity<?> tmdUpdateBudget(@RequestHeader("Authorization") String token,
                                             @PathVariable int tmdId,
                                             @RequestBody TmdBudget tmdBudget) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdBudget.setTmdUser(user.get());
        return ResponseEntity.ok(tmdBudgetService.tmdUpdateBudget(tmdBudget, tmdId, token));
    }

    @DeleteMapping("/tmdDeleteBudget/{tmdId}")
    public ResponseEntity<?> tmdDeleteBudget(@RequestHeader("Authorization") String token, @PathVariable int tmdId) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdBudgetService.tmdDeleteBudget(tmdId, token);
        return ResponseEntity.ok("Xóa ngân sách thành công!");
    }
}
