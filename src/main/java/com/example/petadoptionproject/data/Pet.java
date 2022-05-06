package com.example.petadoptionproject.data;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pets")
public class Pet {

    public enum Sex {MALE, FEMALE}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String animal;

    @Column
    private String breed;

    @Enumerated(EnumType.STRING)
    private Pet.Sex sex;

    @Column
    private Integer age;

    @Column
    private String color;

    @Column
    private String description;

    @Column
    private boolean fixed;

    @Column
    private String health;

}
