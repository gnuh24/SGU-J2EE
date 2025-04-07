package com.sgu.backend.exceptions.JwtException;

public class MismatchedTokenAccountException extends RuntimeException {
    public MismatchedTokenAccountException(String message) {
	super(message);
    }
}
