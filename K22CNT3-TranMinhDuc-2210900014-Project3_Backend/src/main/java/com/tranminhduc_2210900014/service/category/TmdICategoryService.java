package com.tranminhduc_2210900014.service.category;

import com.tranminhduc_2210900014.model.TmdCategory;
import java.util.List;

public interface TmdICategoryService {
    TmdCategory tmdAddCategory(TmdCategory tmdCategory, String token);
    List<TmdCategory> tmdGetCategoryByUserId(int tmdUserId, String token);
    TmdCategory tmdUpdateCategory(TmdCategory tmdCategory, int tmdId, String token);
    TmdCategory tmdGetCategoryByName(String tmdName, String token);
    void tmdDeleteCategory(int tmdId, String token);
    TmdCategory tmdGetCategoryById(int tmdId, String token);
}
