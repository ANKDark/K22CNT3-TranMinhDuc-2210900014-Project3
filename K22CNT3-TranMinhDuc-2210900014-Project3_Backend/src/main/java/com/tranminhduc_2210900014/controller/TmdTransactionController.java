package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdTransaction;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import com.tranminhduc_2210900014.service.transaction.TmdTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tmdTransaction")
@RequiredArgsConstructor
@CrossOrigin
public class TmdTransactionController {
    private final TmdTransactionService tmdTransactionService;
    private final TmdAuthService tmdAuthService;

    @PostMapping("/tmdAddTransaction")
    public ResponseEntity<?> tmdAddTransaction(@RequestHeader("Authorization") String token, @RequestBody TmdTransaction tmdTransaction) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }
        tmdTransaction.setTmdUser(user.get()); // Gán User vào Transaction

        return ResponseEntity.status(HttpStatus.CREATED).body(tmdTransactionService.tmdAddTransaction(tmdTransaction, token));
    }

    @GetMapping("/tmdListTransaction")
    public ResponseEntity<?> tmdGetTransactionByUserId(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        int userId = user.get().getId();
        return ResponseEntity.ok(tmdTransactionService.tmdGetTransactionByUserId(userId, token));
    }

    @PutMapping("/tmdUpdateTransaction/{tmdId}")
    public ResponseEntity<?> tmdUpdateTransaction(@RequestHeader("Authorization") String token,
                                                  @PathVariable int tmdId,
                                                  @RequestBody TmdTransaction tmdTransaction) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdTransaction.setTmdUser(user.get());
        return ResponseEntity.ok(tmdTransactionService.tmdUpdateTransaction(tmdTransaction, tmdId, token));
    }

    @DeleteMapping("/tmdDeleteTransaction/{id}")
    public ResponseEntity<?> tmdDeleteTransaction(@RequestHeader("Authorization") String token, @PathVariable int id) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        tmdTransactionService.tmdDeleteTransaction(id, token);
        return ResponseEntity.ok("Xóa giao dịch thành công!");
    }
}
