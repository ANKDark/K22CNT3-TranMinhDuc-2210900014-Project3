package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdCategory;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import com.tranminhduc_2210900014.service.category.TmdCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tmdCategory")
@RequiredArgsConstructor
@CrossOrigin
public class TmdCategoryController {
    private final TmdCategoryService tmdCategoryService;
    private final TmdAuthService tmdAuthService;

    @PostMapping("/tmdAddCategory")
    public ResponseEntity<?> tmdAddCategory(@RequestHeader("Authorization") String token, @RequestBody TmdCategory tmdCategory) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(tmdCategoryService.tmdAddCategory(tmdCategory, token));
    }

    @GetMapping("/tmdListCategory")
    public ResponseEntity<?> tmdGetCategoryByUserId(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Optional<TmdUser> user = tmdAuthService.getUserFromToken(token);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ hoặc hết hạn!");
        }

        int userId = user.get().getId();
        return ResponseEntity.ok(tmdCategoryService.tmdGetCategoryByUserId(userId, token));
    }

    @PutMapping("/tmdUpdateCategory/{tmdId}")
    public ResponseEntity<?> tmdUpdateCategory(@RequestHeader("Authorization") String token,
                                               @PathVariable int tmdId,
                                               @RequestBody TmdCategory tmdCategory) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return ResponseEntity.ok(tmdCategoryService.tmdUpdateCategory(tmdCategory, tmdId, token));
    }

    //Tối test cái này
    @GetMapping("/tmdCategoryByName/{name}")
    public ResponseEntity<?> tmdGetCategoryByName(@RequestHeader("Authorization") String token,
                                                  @PathVariable String name) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return ResponseEntity.ok(tmdCategoryService.tmdGetCategoryByName(name, token));
    }

    @GetMapping("/tmdCategoryById/{id}")
    public ResponseEntity<?> tmdGetCategoryById(@RequestHeader("Authorization") String token,
                                                @PathVariable int id) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return ResponseEntity.ok(tmdCategoryService.tmdGetCategoryById(id, token));
    }

    @DeleteMapping("/tmdDeleteCategory/{id}")
    public ResponseEntity<?> tmdDeleteCategory(@RequestHeader("Authorization") String token, @PathVariable int id) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        tmdCategoryService.tmdDeleteCategory(id, token);
        return ResponseEntity.ok("Xóa danh mục thành công!");
    }
}
