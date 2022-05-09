package com.example.petadoptionproject.data;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stories")
public class Story {

    public enum Status {ACTIVE, PENDING, REJECTED}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private LocalDate createdAt;

    @OneToOne
    @JoinColumn(name = "listings_id")
    private Listing listing;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;
}
