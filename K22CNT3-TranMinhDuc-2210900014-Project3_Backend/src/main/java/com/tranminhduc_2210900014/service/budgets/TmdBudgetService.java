package com.tranminhduc_2210900014.service.budgets;

import com.tranminhduc_2210900014.exception.*;
import com.tranminhduc_2210900014.model.TmdBudget;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdBudgetRepository;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TmdBudgetService implements TmdIBudgetService {
    private final TmdBudgetRepository tmdBudgetRepository;
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
    public TmdBudget tmdAddBudget(TmdBudget tmdBudget, String token) {
        TmdUser tmdUser = tmdValidateToken(token);
        tmdBudget.setTmdUser(tmdUser);
        return tmdBudgetRepository.save(tmdBudget);
    }

    @Override
    public List<TmdBudget> tmdGetBudgetsByUserId(int tmdUserId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        if (tmdUser.getId() != tmdUserId) {
            throw new TmdAccessDeniedException("Không có quyền truy cập!");
        }

        List<TmdBudget> budgets = tmdBudgetRepository.findByTmdUserId(tmdUser.getId());

        if (budgets.isEmpty()) {
            throw new TmdNotFoundException("Không có ngân sách nào!");
        }

        return budgets;
    }

    @Override
    public TmdBudget tmdUpdateBudget(TmdBudget tmdBudget, int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdBudget existingBudget = tmdBudgetRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy ngân sách!"));

        if (existingBudget.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền cập nhật ngân sách này!");
        }

        existingBudget.setTmdAmountLimit(tmdBudget.getTmdAmountLimit());
        existingBudget.setTmdStartDate(tmdBudget.getTmdStartDate());
        existingBudget.setTmdEndDate(tmdBudget.getTmdEndDate());
        existingBudget.setTmdCategory(tmdBudget.getTmdCategory());

        return tmdBudgetRepository.save(existingBudget);
    }

    @Override
    public void tmdDeleteBudget(int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdBudget budget = tmdBudgetRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy ngân sách!"));

        if (budget.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền xóa ngân sách này!");
        }

        tmdBudgetRepository.delete(budget);
    }
}
