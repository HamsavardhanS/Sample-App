package com.examly.springapp.config;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.MacAlgorithm;
import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    private static final MacAlgorithm ALGORITHM = Jwts.SIG.HS256;
    private static final SecretKey key = ALGORITHM.key().build();
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    public static String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, ALGORITHM)
                .compact();
    }

     public static String extractUsername(String token) {
        JwtParser parser = Jwts.parser()
                .verifyWith(key)
                .build();

        return parser
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
