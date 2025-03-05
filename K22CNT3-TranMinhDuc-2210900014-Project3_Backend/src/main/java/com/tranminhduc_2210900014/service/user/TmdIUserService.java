package com.tranminhduc_2210900014.service.user;

import com.tranminhduc_2210900014.model.TmdUser;

import java.util.List;

public interface TmdIUserService {
    TmdUser tmdAddUser(TmdUser tmdUser);
    List<TmdUser> tmdGetUsers();
    TmdUser tmdUpdateUser(TmdUser tmdUser, int tmdId);
    TmdUser tmdGetUserById(int tmdId);
    void tmdDeleteUser(int tmdId);
}
