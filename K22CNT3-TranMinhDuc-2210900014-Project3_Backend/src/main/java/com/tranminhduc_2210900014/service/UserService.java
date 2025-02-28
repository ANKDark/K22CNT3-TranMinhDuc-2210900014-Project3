package com.tranminhduc_2210900014.service;

import com.tranminhduc_2210900014.exception.UserAlreadyExistsException;
import com.tranminhduc_2210900014.exception.UserNotFoundException;
import com.tranminhduc_2210900014.model.Users;
import com.tranminhduc_2210900014.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UsersRepository usersRepository;

    @Override
    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users addUser(Users user) {
        if (userAlreadyExists(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " đã tồn tại!");
        }
        return usersRepository.save(user);
    }

    @Override
    public Users updateUser(Users user, int id) {
        return usersRepository.findById(id).map(users -> {
            if (!users.getEmail().equals(user.getEmail()) && userAlreadyExists(user.getEmail())) {
                throw new UserAlreadyExistsException("Email " + user.getEmail() + " đã tồn tại!");
            }
            users.setName(user.getName());
            users.setEmail(user.getEmail());
            users.setPasswordHash(user.getPasswordHash());
            return usersRepository.save(users);
        }).orElseThrow(() -> new UserNotFoundException("Xin lỗi, không thể tìm thấy user này"));
    }

    @Override
    public Users getUserById(int id) {
        return usersRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Xin lỗi, không tìm thấy user có id: " + id));
    }

    @Override
    public void deleteUser(int id) {
        if (!usersRepository.existsById(id)) {
            throw new UserNotFoundException("Xin lỗi, không tìm thấy user");
        }
        usersRepository.deleteById(id);
    }

    private boolean userAlreadyExists(String email) {
        return usersRepository.findByEmail(email).isPresent();
    }
}
