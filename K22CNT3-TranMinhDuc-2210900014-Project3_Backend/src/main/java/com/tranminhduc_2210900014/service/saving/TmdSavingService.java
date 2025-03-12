package com.tranminhduc_2210900014.service.saving;

import com.tranminhduc_2210900014.exception.*;
import com.tranminhduc_2210900014.model.TmdSaving;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdSavingRepository;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TmdSavingService implements TmdISavingService {
    private final TmdSavingRepository tmdSavingRepository;
    private final TmdAuthService tmdAuthService;

    private TmdUser tmdValidateToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new TmdTokenEmptyException("Token không được rỗng!");
        }

        Optional<TmdUser> tmdUser = tmdAuthService.getUserFromToken(token);
        if (tmdUser.isEmpty()) {
            throw new TmdTokenInvalidException("Token không hợp lệ hoặc hết hạn!");
        }

        return tmdUser.get();
    }

    @Override
    public TmdSaving tmdAddSaving(TmdSaving tmdSaving, String token) {
        TmdUser tmdUser = tmdValidateToken(token);
        tmdSaving.setTmdUser(tmdUser);
        return tmdSavingRepository.save(tmdSaving);
    }

    @Override
    public List<TmdSaving> tmdGetSavingByUserId(int tmdUserId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        if (tmdUser.getId() != tmdUserId) {
            throw new TmdAccessDeniedException("Không có quyền truy cập!");
        }

        List<TmdSaving> savings = tmdSavingRepository.findByTmdUserId(tmdUser.getId());

        if (savings.isEmpty()) {
            throw new TmdNotFoundException("Không có khoản tiết kiệm nào!");
        }

        return savings;
    }

    @Override
    public TmdSaving tmdUpdateSaving(TmdSaving tmdSaving, int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdSaving existingSaving = tmdSavingRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy khoản tiết kiệm!"));

        if (existingSaving.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền cập nhật khoản tiết kiệm này!");
        }

        existingSaving.setTmdGoalName(tmdSaving.getTmdGoalName());
        existingSaving.setTmdTargetAmount(tmdSaving.getTmdTargetAmount());
        existingSaving.setTmdSavedAmount(tmdSaving.getTmdSavedAmount());
        existingSaving.setTmdTargetDate(tmdSaving.getTmdTargetDate());

        return tmdSavingRepository.save(existingSaving);
    }

    @Override
    public void tmdDeleteSaving(int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdSaving saving = tmdSavingRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy khoản tiết kiệm!"));

        if (saving.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền xóa khoản tiết kiệm này!");
        }

        tmdSavingRepository.delete(saving);
    }
}
