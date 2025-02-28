package com.tranminhduc_2210900014.service;

import com.tranminhduc_2210900014.model.Users;

import java.util.List;

public interface IUserService {
    Users addUser(Users user);
    List<Users> getUsers();
    Users updateUser(Users user, int id);
    Users getUserById(int id);
    void deleteUser(int id);

}
