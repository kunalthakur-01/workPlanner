package com.assignment.fsad.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    String resourceName;
    String filedName;
    String filedValue;

    public ResourceNotFoundException(String message){
        super(message);
    }
}
