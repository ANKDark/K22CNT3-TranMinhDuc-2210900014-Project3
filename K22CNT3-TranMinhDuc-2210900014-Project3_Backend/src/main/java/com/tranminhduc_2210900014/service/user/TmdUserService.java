package com.tranminhduc_2210900014.service.user;

import com.tranminhduc_2210900014.exception.TmdUserAlreadyExistsException;
import com.tranminhduc_2210900014.exception.TmdUserNotFoundException;
import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.repository.TmdUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TmdUserService implements TmdIUserService {

    private final TmdUserRepository tmdUserRepository;

    @Override
    public List<TmdUser> tmdGetUsers() {
        return tmdUserRepository.findAll();
    }

    @Override
    public TmdUser tmdAddUser(TmdUser tmdUser) {
        if (tmdUserAlreadyExists(tmdUser.getTmdEmail())) {
            throw new TmdUserAlreadyExistsException(tmdUser.getTmdEmail() + " đã tồn tại!");
        }
        return tmdUserRepository.save(tmdUser);
    }

    @Override
    public TmdUser tmdUpdateUser(TmdUser tmdUser, int id) {
        return tmdUserRepository.findById(id).map(existingUser -> {
            if (!existingUser.getTmdEmail().equals(tmdUser.getTmdEmail()) && tmdUserAlreadyExists(tmdUser.getTmdEmail())) {
                throw new TmdUserAlreadyExistsException("Email " + tmdUser.getTmdEmail() + " đã tồn tại!");
            }
            existingUser.setTmdName(tmdUser.getTmdName());
            existingUser.setTmdEmail(tmdUser.getTmdEmail());
            existingUser.setTmdPasswordHash(tmdUser.getTmdPasswordHash());
            return tmdUserRepository.save(existingUser);
        }).orElseThrow(() -> new TmdUserNotFoundException("Không tìm thấy tmdUser có id: " + id));
    }

    @Override
    public TmdUser tmdGetUserById(int id) {
        return tmdUserRepository.findById(id)
                .orElseThrow(() -> new TmdUserNotFoundException("Không tìm thấy tmdUser có id: " + id));
    }

    @Override
    public void tmdDeleteUser(int id) {
        if (!tmdUserRepository.existsById(id)) {
            throw new TmdUserNotFoundException("Không tìm thấy tmdUser có id: " + id);
        }
        tmdUserRepository.deleteById(id);
    }

    private boolean tmdUserAlreadyExists(String email) {
        return tmdUserRepository.findByTmdEmail(email).isPresent();
    }
}
