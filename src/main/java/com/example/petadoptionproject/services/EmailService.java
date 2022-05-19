package com.example.petadoptionproject.services;
import com.example.petadoptionproject.data.User;
import com.example.petadoptionproject.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service("mailService")
public class EmailService {


    private final UsersRepository usersRepository;

    @Autowired
    public JavaMailSender emailSender;


    public void updateResetPasswordToken(String token, String email) {
        User user = usersRepository.findByEmail(email);
        System.out.println(user.getUsername());
        user.setResetPasswordToken(token);
        usersRepository.save(user);
    }

    public User getByResetPasswordToken(String token) {
        return usersRepository.findByResetPasswordToken(token);
    }


}

