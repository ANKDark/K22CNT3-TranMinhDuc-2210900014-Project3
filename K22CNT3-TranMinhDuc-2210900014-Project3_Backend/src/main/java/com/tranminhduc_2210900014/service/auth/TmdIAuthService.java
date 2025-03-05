package com.tranminhduc_2210900014.service.auth;

import com.tranminhduc_2210900014.model.TmdUser;

public interface TmdIAuthService {
    TmdUser tmdRegister(TmdUser tmdUser);
    TmdUser tmdLogin(String tmdEmail, String tmdPassword);
    String tmdLogout(String tmdEmail);
}
