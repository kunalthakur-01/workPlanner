package com.assignment.fsad.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    String resourceName;
    String filedName;
    String filedValue;

    public ResourceNotFoundException(String resourceName, String filedName, String filedValue) {
        super(String.format("%s not found with %s : %s", resourceName, filedName, filedValue));
        this.resourceName = resourceName;
        this.filedName = filedName;
        this.filedValue = filedValue;
    }
}
