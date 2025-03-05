package com.tranminhduc_2210900014.exception;

public class InvalidPasswordException extends  RuntimeException{
    public InvalidPasswordException(String message) {
        super(message);
    }
}
