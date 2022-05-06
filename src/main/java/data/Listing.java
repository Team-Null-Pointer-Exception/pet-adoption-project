package data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "listings")
public class Listing {

    public enum Status {ACTIVE, EXPIRED, CLOSED, PENDING, REJECTED}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String summary;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties({"listings"})
    private User user;

    @OneToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;


}
