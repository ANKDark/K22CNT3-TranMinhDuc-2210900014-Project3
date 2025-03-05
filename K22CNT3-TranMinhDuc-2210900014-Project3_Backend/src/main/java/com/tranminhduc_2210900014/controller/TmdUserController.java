package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.TmdUser;
import com.tranminhduc_2210900014.service.user.TmdIUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tmdUsers")
@RequiredArgsConstructor
@CrossOrigin
public class TmdUserController {
    private final TmdIUserService tmdUserService;

    @GetMapping
    public ResponseEntity<List<TmdUser>> getTmdUsers() {
        return ResponseEntity.ok(tmdUserService.tmdGetUsers());
    }

    @PostMapping
    public ResponseEntity<TmdUser> addTmdUser(@RequestBody TmdUser tmduser) {
        return new ResponseEntity<>(tmdUserService.tmdAddUser(tmduser), HttpStatus.CREATED);
    }

    @PutMapping("/tmdUpdate/{tmdId}")
    public ResponseEntity<TmdUser> updateTmdUser(@RequestBody TmdUser tmduser, @PathVariable int tmdId) {
        return ResponseEntity.ok(tmdUserService.tmdUpdateUser(tmduser, tmdId));
    }

    @DeleteMapping("/tmdDelete/{tmdId}")
    public ResponseEntity<Void> deleteTmdUser(@PathVariable int tmdId) {
        tmdUserService.tmdDeleteUser(tmdId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{tmdId}")
    public ResponseEntity<TmdUser> getTmdUserById(@PathVariable int tmdId) {
        return ResponseEntity.ok(tmdUserService.tmdGetUserById(tmdId));
    }
}
