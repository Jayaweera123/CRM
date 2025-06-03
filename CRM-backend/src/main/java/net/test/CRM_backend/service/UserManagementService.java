package net.test.CRM_backend.service;

import net.test.CRM_backend.dto.UserDto;
import net.test.CRM_backend.entity.User;
import net.test.CRM_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto register(UserDto registrationRequest) {
        UserDto response = new UserDto();

        try {
            User newUser = new User();
            newUser.setEmail(registrationRequest.getEmail());
            newUser.setName(registrationRequest.getName());
            newUser.setPhone(registrationRequest.getPhone());
            newUser.setUserType(registrationRequest.getUserType());
            newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            User savedUser = userRepository.save(newUser);

            if (savedUser.getUserId() != null) {
                response.setUser(savedUser);
                response.setMessage("User registered successfully");
                response.setStatusCode(200);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public UserDto login(UserDto loginRequest) {
        UserDto response = new UserDto();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String jwtToken = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            response.setStatusCode(200);
            response.setToken(jwtToken);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setUser(user);
            response.setMessage("Successfully logged in");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public UserDto refreshToken(UserDto refreshTokenRequest) {
        UserDto response = new UserDto();

        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
                String newToken = jwtUtils.generateToken(user);

                response.setStatusCode(200);
                response.setToken(newToken);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Token refreshed successfully");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public UserDto getAllUsers() {
        UserDto response = new UserDto();

        try {
            List<User> users = userRepository.findAll();

            if (!users.isEmpty()) {
                response.setUserList(users);
                response.setStatusCode(200);
                response.setMessage("Users retrieved successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("No users found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving users: " + e.getMessage());
        }
        return response;
    }

    public UserDto getUserById(Long userId) {
        UserDto response = new UserDto();

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            response.setUser(user);
            response.setStatusCode(200);
            response.setMessage("User retrieved successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving user: " + e.getMessage());
        }
        return response;
    }

    public UserDto deleteUser(Long userId) {
        UserDto response = new UserDto();

        try {
            if (userRepository.existsById(userId)) {
                userRepository.deleteById(userId);
                response.setStatusCode(200);
                response.setMessage("User deleted successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("User not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user: " + e.getMessage());
        }
        return response;
    }

    public UserDto updateUser(Long userId, UserDto updateRequest) {
        UserDto response = new UserDto();

        try {
            User existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update fields if they're provided in the request
            if (updateRequest.getName() != null) {
                existingUser.setName(updateRequest.getName());
            }
            if (updateRequest.getEmail() != null) {
                existingUser.setEmail(updateRequest.getEmail());
            }
            if (updateRequest.getPhone() != null) {
                existingUser.setPhone(updateRequest.getPhone());
            }
            if (updateRequest.getUserType() != null) {
                existingUser.setUserType(updateRequest.getUserType());
            }
            if (updateRequest.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(updateRequest.getPassword()));
            }

            User updatedUser = userRepository.save(existingUser);

            response.setUser(updatedUser);
            response.setStatusCode(200);
            response.setMessage("User updated successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating user: " + e.getMessage());
        }
        return response;
    }

    public UserDto getMyInfo(String email) {
        UserDto response = new UserDto();

        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            response.setUser(user);
            response.setStatusCode(200);
            response.setMessage("User info retrieved successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving user info: " + e.getMessage());
        }
        return response;
    }
}