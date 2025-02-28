package com.tranminhduc_2210900014.exception;

public class UserAlreadyExistsException extends  RuntimeException{
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
