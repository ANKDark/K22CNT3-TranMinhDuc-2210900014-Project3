package com.tranminhduc_2210900014.service.transaction;

import com.tranminhduc_2210900014.model.TmdTransaction;

import java.util.List;

public interface TmdITransactionService {
    TmdTransaction tmdAddTransaction(TmdTransaction tmdTransaction, String token);
    List<TmdTransaction> tmdGetTransactionByUserId(int tmdUserId, String token);
    TmdTransaction tmdUpdateTransaction(TmdTransaction tmdTransaction, int tmdId, String token);
    void tmdDeleteTransaction(int tmdId, String token);
}
