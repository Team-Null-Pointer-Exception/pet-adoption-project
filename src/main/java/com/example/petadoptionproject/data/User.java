package com.example.petadoptionproject.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    public enum Role {USER, ADMIN}

    public enum Status {ACTIVE, SUSPENDED}

    public enum State {AL, AK, AS, AZ, AR, CA, CO, CT, DE, DC, FL, GA, GU, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, MP, OH, OK, OR, PA, PR, RI, SC, SD, TN, TX, UT, VT, VA, VI, WA, WV, WI, WY}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Column
    private String organization;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false, length = 100)
    private String city;

    @NotNull
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(nullable = false, length = 20)
    private String zip;

    @Column(length = 20)
    private String phone;

    @Email
    @NotEmpty
    private String email;

    @ToString.Exclude
    private String password;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    @ToString.Exclude
    Collection<Listing> listings;

    @Column
    private String profileImg;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    @ToString.Exclude
    Collection<Story> stories;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;
}
