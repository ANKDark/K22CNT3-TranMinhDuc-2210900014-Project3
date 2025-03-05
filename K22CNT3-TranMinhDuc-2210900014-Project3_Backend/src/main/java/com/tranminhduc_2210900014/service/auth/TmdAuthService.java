package com.tranminhduc_2210900014.service.auth;

import com.tranminhduc_2210900014.controller.TmdAuthController;
import com.tranminhduc_2210900014.exception.TmdUserAlreadyExistsException;
import com.tranminhduc_2210900014.exception.TmdUserNotFoundException;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdUserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TmdAuthService implements TmdIAuthService {

    private final TmdUserRepository tmdUserRepository;
    private final PasswordEncoder passwordEncoder;

    private boolean tmdUserAlreadyExists(String tmdEmail) {
        return tmdUserRepository.findByTmdEmail(tmdEmail).isPresent();
    }

    @Override
    public TmdUser tmdRegister(TmdUser tmdUser) {
        if (tmdUserAlreadyExists(tmdUser.getTmdEmail())) {
            throw new TmdUserAlreadyExistsException(tmdUser.getTmdEmail() + " đã tồn tại!");
        }
        tmdUser.setTmdPasswordHash(passwordEncoder.encode(tmdUser.getTmdPasswordHash()));
        return tmdUserRepository.save(tmdUser);
    }

    public TmdUser tmdLogin(String tmdEmail, String tmdPassword) {
        TmdUser tmdUser = tmdUserRepository.findByTmdEmail(tmdEmail)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        if (!passwordEncoder.matches(tmdPassword, tmdUser.getTmdPasswordHash())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        return tmdUser;
    }

    @Override
    public String tmdLogout(String tmdEmail) {
        TmdUser tmdUser = tmdUserRepository.findByTmdEmail(tmdEmail)
                .orElseThrow(() -> new TmdUserNotFoundException("Không tìm thấy người dùng với email: " + tmdEmail));

        return "Đăng xuất thành công cho email: " + tmdEmail;
    }

    public Optional<TmdUser> getUserFromToken(String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            String email = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(TmdAuthController.SECRET_KEY.getEncoded()))
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody()
                    .getSubject();

            return tmdUserRepository.findByTmdEmail(email);
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}