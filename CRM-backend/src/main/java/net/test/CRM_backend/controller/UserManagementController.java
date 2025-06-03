package net.test.CRM_backend.controller;

import net.test.CRM_backend.dto.UserDto;
import net.test.CRM_backend.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;



    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto registrationRequest) {
        return ResponseEntity.ok(userManagementService.register(registrationRequest));
    }
    // Public auth endpoints
   /* @PostMapping("/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto registrationRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // ALLOW first admin registration if not authenticated
        if (auth == null || !auth.isAuthenticated() || auth.getAuthorities().isEmpty()) {
            if (!registrationRequest.getUserType().equals("ADMIN")) {
                throw new AccessDeniedException("Only admins can register non-admin users");
            }
        } else {
            // Already authenticated – do normal role checks
            if (auth.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ADMIN"))) {
                if (registrationRequest.getUserType().equals("ADMIN") ||
                        registrationRequest.getUserType().equals("SALES_REP")) {
                    throw new AccessDeniedException("Only admins can register admins and sales reps");
                }
            }
        }

        return ResponseEntity.ok(userManagementService.register(registrationRequest));
    }
*/
    @PostMapping("/auth/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto loginRequest) {
        return ResponseEntity.ok(userManagementService.login(loginRequest));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<UserDto> refreshToken(@RequestBody UserDto refreshRequest) {
        return ResponseEntity.ok(userManagementService.refreshToken(refreshRequest));
    }

    // Admin-only endpoints
    @GetMapping("/admin/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDto> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @GetMapping("/admin/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.getUserById(userId));
    }

    @PutMapping("/admin/update/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto updateRequest) {
        return ResponseEntity.ok(userManagementService.updateUser(userId, updateRequest));
    }

    @DeleteMapping("/admin/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.deleteUser(userId));
    }

    // Sales rep endpoints
    @PostMapping("/sales/register")
    @PreAuthorize("hasAuthority('SALES_REP')")
    public ResponseEntity<UserDto> registerCustomerOrLead(@RequestBody UserDto registrationRequest) {
        if (!registrationRequest.getUserType().equals("CUSTOMER") &&
                !registrationRequest.getUserType().equals("LEAD")) {
            throw new AccessDeniedException("Sales reps can only register customers and leads");
        }
        return ResponseEntity.ok(userManagementService.register(registrationRequest));
    }

    @PutMapping("/sales/update/{userId}")
    @PreAuthorize("hasAuthority('SALES_REP')")
    public ResponseEntity<UserDto> updateCustomerOrLead(@PathVariable Long userId, @RequestBody UserDto updateRequest) {
        // Add logic to verify the user being updated is a customer/lead
        UserDto existingUser = userManagementService.getUserById(userId);
        if (!existingUser.getUserType().equals("CUSTOMER") &&
                !existingUser.getUserType().equals("LEAD")) {
            throw new AccessDeniedException("Sales reps can only update customers and leads");
        }
        return ResponseEntity.ok(userManagementService.updateUser(userId, updateRequest));
    }

    // Common endpoints
    @GetMapping("/profile")
    public ResponseEntity<UserDto> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userManagementService.getMyInfo(email));
    }
}