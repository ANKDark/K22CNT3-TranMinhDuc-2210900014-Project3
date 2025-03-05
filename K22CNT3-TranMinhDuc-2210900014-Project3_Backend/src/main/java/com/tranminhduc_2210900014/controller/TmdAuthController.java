package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdUserRepository;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import javax.validation.Valid;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class TmdAuthController {

    private final TmdAuthService tmdAuthService;
    private static final long EXPIRATION_TIME = 60 * 60 * 1000;
    public static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final TmdUserRepository tmdUserRepository;

    private String tmdGenerateToken(String tmdEmail) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(tmdEmail)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    @PostMapping("/tmdRegister")
    public ResponseEntity<TmdUser> tmdRegister(@Valid @RequestBody TmdUser tmdUser) {
        TmdUser tmdRegisteredUser = tmdAuthService.tmdRegister(tmdUser);
        return new ResponseEntity<>(tmdRegisteredUser, HttpStatus.CREATED);
    }

    @PostMapping("/tmdLogin")
    public ResponseEntity<Map<String, Object>> tmdLogin(@RequestParam String tmdEmail,
                                                     @RequestParam String tmdPassword) {
        TmdUser tmdLoggedInUser = tmdAuthService.tmdLogin(tmdEmail, tmdPassword);

        String token = tmdGenerateToken(tmdEmail);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", tmdLoggedInUser);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/tmdLogout")
    public ResponseEntity<String> tmdLogout(@RequestParam String tmdEmail) {
        String message = tmdAuthService.tmdLogout(tmdEmail);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/tmdStatus")
    public ResponseEntity<?> tmdCheckStatus(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            String tmdEmail = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody()
                    .getSubject();

            Optional<TmdUser> tmdUser = tmdUserRepository.findByTmdEmail(tmdEmail);

            if (tmdUser.isEmpty()) {
                return new ResponseEntity<>("Không tìm thấy người dùng", HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(tmdUser.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Token không hợp lệ hoặc đã hết hạn", HttpStatus.UNAUTHORIZED);
        }
    }
}
