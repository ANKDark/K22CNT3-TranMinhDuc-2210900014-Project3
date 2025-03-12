package com.tranminhduc_2210900014.service.saving;

import com.tranminhduc_2210900014.model.TmdSaving;
import java.util.List;

public interface TmdISavingService {
    TmdSaving tmdAddSaving(TmdSaving tmdSaving, String token);
    List<TmdSaving> tmdGetSavingByUserId(int tmdUserId, String token);
    TmdSaving tmdUpdateSaving(TmdSaving tmdSaving, int tmdId, String token);
    void tmdDeleteSaving(int tmdId, String token);
}
