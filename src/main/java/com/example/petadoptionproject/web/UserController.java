package com.example.petadoptionproject.web;


import com.example.petadoptionproject.data.*;
import com.example.petadoptionproject.services.EmailService;
import com.example.petadoptionproject.services.S3Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import static com.example.petadoptionproject.data.User.Role.USER;
@Slf4j
@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {

    private UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender mailSender;
    private EmailService emailService;
    private S3Service service;

    @GetMapping
    public Collection<User> getUsers() {
        System.out.println(usersRepository);
        return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id){
        return usersRepository.findById(id);
    }

    @GetMapping("/email")
    public User getByEmail(@RequestParam String email){
        return usersRepository.findByEmail(email);
    }
    @GetMapping("/username")
    public User getByUsername(@RequestParam String username) {
        return usersRepository.findByUsername(username);
    }

    @GetMapping("/me")
    public User getCurrentUser(OAuth2Authentication auth) {
        String email = auth.getName();
        return usersRepository.findByEmail(email);
    }

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        user.setCreatedAt(LocalDate.now());
        user.setRole(User.Role.USER);
        user.setStatus(User.Status.ACTIVE);
        String unencryptedPassword = user.getPassword();
        String encryptedPassword = passwordEncoder.encode(unencryptedPassword);
        user.setPassword(encryptedPassword);
        ArrayList<Story> stories = new ArrayList<>();
        user.setStories(stories);
        usersRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        usersRepository.deleteById(id);
    }

    @PutMapping("/me/updateUser")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updateUser(@RequestBody User user, OAuth2Authentication auth){
        String userToUpdate = auth.getName();
        User updatedUser = usersRepository.findByEmail(userToUpdate);
        updatedUser.setUsername(user.getUsername());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setOrganization(user.getOrganization());
        updatedUser.setStreet(user.getStreet());
        updatedUser.setCity(user.getCity());
        updatedUser.setState(user.getState());
        updatedUser.setZip(user.getZip());
        updatedUser.setPhone(user.getPhone());
        updatedUser.setProfileImg(user.getProfileImg());
        usersRepository.save(updatedUser);
        System.out.println("Updating user information");
    }

    @PutMapping("/me/updatePassword")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePassword(@RequestParam String newPassword, OAuth2Authentication auth){
        String user = auth.getName();
        User updatedUser = usersRepository.findByEmail(user);
        String encryptedPassword = passwordEncoder.encode(newPassword);
        updatedUser.setPassword(encryptedPassword);
        usersRepository.save(updatedUser);
        System.out.println("Updating password");
    }

    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("petadoptions.com", "Pet Adoptions Support");
        helper.setTo(recipientEmail);
        String subject = "Here's the link to reset your password";
        String content = "<html><p>Hello,</p><p>You have requested to reset your password.</p><p>Click the link below to change your password:</p><br><a href=\"" + link + "\">Change my password</a><br><p>Ignore this email if you do remember your password, or you have not made the request.</p></html>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    @PutMapping("/send")
    public void processForgotPassword(@RequestParam String email) throws MessagingException, UnsupportedEncodingException {
        String token = RandomString.make(30);
        emailService.updateResetPasswordToken(token, email);
        String resetPasswordLink = "localhost:8080/reset?token=" + token;
        sendEmail(email, resetPasswordLink);
    }


    @PutMapping("/reset")
    public void resetPasswordFromToken(@RequestParam String password, @RequestParam String token) {
        User user = emailService.getByResetPasswordToken(token);
        System.out.println(user.getUsername());
        String encryptedPassword = passwordEncoder.encode(password);
        user.setPassword(encryptedPassword);
        user.setResetPasswordToken(null);
        usersRepository.save(user);
    }

    @PutMapping("/{id}/updateRole")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateRole(@RequestParam String newRole, @PathVariable long id) {
        User updatedUser = usersRepository.findById(id);
        updatedUser.setRole(User.Role.valueOf(newRole));
        usersRepository.save(updatedUser);
        System.out.println("Updating user role");
    }

    @PutMapping("/{id}/updateStatus")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateStatus(@RequestParam String newStatus, @PathVariable long id) {
        User updatedUser = usersRepository.findById(id);
        updatedUser.setStatus(User.Status.valueOf(newStatus));
        usersRepository.save(updatedUser);
        System.out.println("Updating user status");
    }

    @PostMapping("/upload")
    public String saveNewFile(@RequestParam(value="file") MultipartFile file) {
        String fileName = service.uploadFile(file);
        return fileName;
    }



}


