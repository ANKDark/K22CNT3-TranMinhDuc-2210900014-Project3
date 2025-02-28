package com.tranminhduc_2210900014.controller;

import com.tranminhduc_2210900014.model.Users;
import com.tranminhduc_2210900014.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping
    public ResponseEntity<List<Users>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Users> updateUser(@RequestBody Users user, @PathVariable int id) {
        return ResponseEntity.ok(userService.updateUser(user, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
