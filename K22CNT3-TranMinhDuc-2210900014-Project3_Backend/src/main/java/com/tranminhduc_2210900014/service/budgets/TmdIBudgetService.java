package com.tranminhduc_2210900014.service.budgets;

import com.tranminhduc_2210900014.model.TmdBudget;

import java.util.List;

public interface TmdIBudgetService {
    TmdBudget tmdAddBudget(TmdBudget tmdBudget, String token);
    List<TmdBudget> tmdGetBudgetsByUserId(int tmdUserId, String token);
    TmdBudget tmdUpdateBudget(TmdBudget tmdBudget,int tmdId, String token);
    void tmdDeleteBudget(int tmdId, String token);
}
