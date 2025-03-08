package com.tranminhduc_2210900014.service.category;

import com.tranminhduc_2210900014.exception.*;
import com.tranminhduc_2210900014.model.TmdCategory;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdCategoryRepository;
import com.tranminhduc_2210900014.service.auth.TmdAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TmdCategoryService implements TmdICategoryService {
    private final TmdCategoryRepository tmdCategoryRepository;
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
    public TmdCategory tmdAddCategory(TmdCategory category, String token) {
        TmdUser tmdUser = tmdValidateToken(token);
        category.setTmdUser(tmdUser);
        return tmdCategoryRepository.save(category);
    }

    @Override
    public List<TmdCategory> tmdGetCategoryByUserId(int tmdUserId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        if (tmdUser.getId() != tmdUserId) {
            throw new TmdAccessDeniedException("Không có quyền truy cập!");
        }

        List<TmdCategory> categories = tmdCategoryRepository.findByTmdUserId(tmdUser.getId());

        if (categories.isEmpty()) {
            throw new TmdNotFoundException("Không có danh mục nào!");
        }

        return categories;
    }

    @Override
    public TmdCategory tmdUpdateCategory(TmdCategory tmdCategory, int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdCategory existingCategory = tmdCategoryRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy danh mục!"));

        if (existingCategory.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền cập nhật danh mục này!");
        }

        existingCategory.setTmdName(tmdCategory.getTmdName());
        existingCategory.setTmdType(tmdCategory.getTmdType());

        return tmdCategoryRepository.save(existingCategory);
    }

    @Override
    public TmdCategory tmdGetCategoryByName(String tmdName, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdCategory category = tmdCategoryRepository.findByTmdName(tmdName)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy danh mục với tên: " + tmdName));

        if (category.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền truy cập danh mục này!");
        }

        return category;
    }

    @Override
    public void tmdDeleteCategory(int tmdId, String token) {
        TmdUser tmdUser = tmdValidateToken(token);

        TmdCategory category = tmdCategoryRepository.findById(tmdId)
                .orElseThrow(() -> new TmdNotFoundException("Không tìm thấy danh mục!"));

        if (category.getTmdUser().getId() != tmdUser.getId()) {
            throw new TmdAccessDeniedException("Không có quyền xóa danh mục này!");
        }

        tmdCategoryRepository.delete(category);
    }
}
