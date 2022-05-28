package com.example.petadoptionproject.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Array;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "listings")
public class Listing {

    public enum Sex {Male, Female, Unknown}

    public enum Status {ACTIVE, EXPIRED, CLOSED, PENDING, REJECTED}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String summary;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    private String name;

    @Column(nullable = false)
    private String animal;

    @Column
    private String breed;

    @Enumerated(EnumType.STRING)
    private Listing.Sex sex;

    @Column
    private String age;

    @Column
    private String color;

    @Column
    private String description;

    @Column
    private boolean fixed;

    @Column
    private String health;

    @ManyToOne
    @JsonIgnoreProperties({"listings"})
    private User user;

    @Column
    private String images;


}
