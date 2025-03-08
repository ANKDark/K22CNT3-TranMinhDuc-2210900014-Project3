package com.tranminhduc_2210900014.service.transaction;

import com.tranminhduc_2210900014.exception.*;
import com.tranminhduc_2210900014.model.TmdTransaction;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdTransactionRepository;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TmdTransactionService implements TmdITransactionService {
    private final TmdTransactionRepository tmdTransactionRepository;
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
    public TmdTransaction tmdAddTransaction(TmdTransaction tmdTransaction, String token) {
        TmdUser tmdUser = tmdValidateToken(token);
        tmdTransaction.setTmdUser(tmdUser);
        return tmdTransactionRepository.save(tmdTransaction);
    }

    @Override
    public List<TmdTransaction> tmdGetTransactionByUserId(int tmdUserId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        if (tmdUser.getId() != tmdUserId) {
            throw new TmdAccessDeniedException("Không có quyền truy cập!");
        }

        List<TmdTransaction> transactions = tmdTransactionRepository.findByTmdUserId(tmdUser.getId());

        if (transactions.isEmpty()) {
            throw new TmdNotFoundException("Không có giao dịch nào!");
        }

        return transactions;
    }

    @Override
    public TmdTransaction tmdUpdateTransaction(TmdTransaction tmdTransaction, int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdTransaction existingTransaction = tmdTransactionRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy giao dịch!"));

        if (existingTransaction.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền cập nhật giao dịch này!");
        }

        existingTransaction.setTmdAmount(tmdTransaction.getTmdAmount());
        existingTransaction.setTmdTransactionDate(tmdTransaction.getTmdTransactionDate());
        existingTransaction.setTmdNote(tmdTransaction.getTmdNote());
        existingTransaction.setTmdCategory(tmdTransaction.getTmdCategory());

        return tmdTransactionRepository.save(existingTransaction);
    }

    @Override
    public void tmdDeleteTransaction(int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdTransaction transaction = tmdTransactionRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy giao dịch!"));

        if (transaction.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền xóa giao dịch này!");
        }

        tmdTransactionRepository.delete(transaction);
    }
}
